import {
  create,
  getDynamicNameParams,
  getExternalUrl,
  getMintIntent,
  mint,
  simulateMint,
} from './Zora'
import {
  failingTestCasesCreate,
  failingTestCasesMint,
  passingTestCasesCreate,
  passingTestCasesMint,
} from './test-setup'
import {
  EXPECTED_ENCODED_DATA_721,
  EXPECTED_ENCODED_DATA_1155,
} from './test-transactions'
import {
  ActionType,
  Chains,
  DEFAULT_REFERRAL as ZORA_DEPLOYER_ADDRESS,
  type DisctriminatedActionParams,
  type MintActionParams,
  type MintIntentParams,
  type PremintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk'
import { type Address, getAddress, parseEther } from 'viem'
import { describe, expect, test, vi, beforeEach, MockedFunction } from 'vitest'
import { PremintResponse } from './types'
import axios from 'axios'
import { validatePremint } from './validate'

const MockedPremintResponse: PremintResponse = [
  {
    zoraV2: {
      collection: {
        contractAdmin: '0xd272a3cb66bea1fa7547dad5b420d5ebe14222e5',
        contractURI:
          'ipfs://bafkreicuxlqqgoo6fxlmijqvilckvwj6ey26yvzpwg73ybcltvvek2og6i',
        contractName: 'Fancy title',
      },
      premint: {
        tokenConfig: {
          tokenURI:
            'ipfs://bafkreia474gkk2ak5eeqstp43nqeiunqkkfeblctna3y54av7bt6uwehmq',
          maxSupply: '0xffffffffffffffff',
          maxTokensPerAddress: 0,
          pricePerToken: 0,
          mintStart: 1708100240,
          mintDuration: 2592000,
          royaltyBPS: 500,
          payoutRecipient: '0xd272a3cb66bea1fa7547dad5b420d5ebe14222e5',
          fixedPriceMinter: '0x04e2516a2c207e84a1839755675dfd8ef6302f0a',
          createReferral: '0x0000000000000000000000000000000000000000',
        },
        uid: 1,
        version: 1,
        deleted: false,
      },
      collectionAddress: '0x0cfbce0e2ea475d6413e2f038b2b62e64106ad1f',
      chainId: 7777777,
      signature:
        '0x2eb4d27a5b04fd41bdd33f66a18a4993c0116724c5fe5b8dc20bf22f45455c621139eabdbd27434e240938a60b1952979c9dc9c8a141cc71764786fe4d3f909f1c',
    },
  },
]

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  }
})

describe('Given the zora plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid mint action', async () => {
        const filter = await mint({
          chainId: 1,
          contractAddress: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
        })
        expect(filter).toBeTypeOf('object')
        expect(Number(filter.chainId)).toBe(1)
        if (typeof filter.to === 'string') {
          expect(filter.to).toMatch(/^0x[a-fA-F0-9]{40}$/)
        } else {
          // if to is an object, it should have a logical operator as the only key
          expect(filter.to).toBeTypeOf('object')
          expect(Object.keys(filter.to)).toHaveLength(1)
          expect(
            ['$or', '$and'].some((prop) =>
              Object.hasOwnProperty.call(filter.to, prop),
            ),
          ).to.be.true
          expect(Object.values(filter.to)[0]).to.satisfy((arr: string[]) =>
            arr.every((val) => val.match(/^0x[a-fA-F0-9]{40}$/)),
          )
        }
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCasesMint.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCasesMint.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })

  describe('When handling the create action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid create action', async () => {
        const filter = await create({
          chainId: 1,
        })
        expect(filter).toBeTypeOf('object')
        expect(Number(filter.chainId)).toBe(1)
        if (typeof filter.to === 'string') {
          expect(filter.to).toMatch(/^0x[a-fA-F0-9]{40}$/)
        } else {
          // if to is an object, it should have a logical operator as the only key
          expect(filter.to).toBeTypeOf('object')
          expect(Object.keys(filter.to)).toHaveLength(1)
          expect(
            ['$or', '$and'].some((prop) =>
              Object.hasOwnProperty.call(filter.to, prop),
            ),
          ).to.be.true
          expect(Object.values(filter.to)[0]).to.satisfy((arr: string[]) =>
            arr.every((val) => val.match(/^0x[a-fA-F0-9]{40}$/)),
          )
        }
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCasesCreate.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await create(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCasesCreate.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await create(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })

  describe('when handling the premint action', () => {
    beforeEach(() => {
      vi.resetAllMocks()
    })

    describe('validatePremint function', () => {
      test('should return true if actor has preminted after the specified time', async () => {
        const createdAfter = new Date('2024-06-10T12:00:00.000Z')
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: MockedPremintResponse,
        })
        const actor = '0xd272a3cb66bea1fa7547dad5b420d5ebe14222e5'
        const actionParams: PremintActionParams = {
          chainId: 7777777,
          createdAfter: createdAfter.toISOString(),
        }
        const result = await validatePremint(actionParams, { actor })

        expect(result).to.be.true
      })

      test('should return true if actor has preminted with a specified chain id', async () => {
        const createdAfter = new Date('2024-06-10T12:00:00.000Z').toISOString()
        const chainId = 7777777
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: MockedPremintResponse,
        })
        const actor = '0xd272a3cb66bea1fa7547dad5b420d5ebe14222e5'
        const actionParams: PremintActionParams = { chainId, createdAfter }
        const result = await validatePremint(actionParams, { actor })

        expect(result).to.be.true
      })

      test('should return false if actor has not preminted', async () => {
        const createdAfter = new Date('2024-06-10T12:00:00.000Z').toISOString()
        const chainId = 7777777
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: [],
        })
        const actor = '0x000000000000000000000000000000000000dead'
        const actionParams: PremintActionParams = { createdAfter, chainId }
        const result = await validatePremint(actionParams, { actor })

        expect(result).to.be.false
      })

      test('should return false if actor has not preminted after the specified time', async () => {
        const createdAfter = new Date('2024-06-10T12:00:00.000Z').toISOString()
        const chainId = 7777777
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: [],
        })
        const actor = '0xd272a3cb66bea1fa7547dad5b420d5ebe14222e5'
        const actionParams: PremintActionParams = { createdAfter, chainId }
        const result = await validatePremint(actionParams, { actor })

        expect(result).to.be.false
      })
    })
  })
})

describe('Given the getMintIntent function', () => {
  // Define the constant for the contract address
  const CONTRACT_ADDRESS = '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb'
  const RECIPIENT_ADDRESS = '0x1234567890123456789012345678901234567890'

  test('returns a TransactionRequest with correct properties when tokenId is set', async () => {
    const mint: MintIntentParams = {
      chainId: 1,
      tokenId: 1, // not 0
      contractAddress: CONTRACT_ADDRESS,
      amount: BigInt('10'),
      recipient: RECIPIENT_ADDRESS,
      referral: ZORA_DEPLOYER_ADDRESS,
    }

    const result = await getMintIntent(mint)

    expect(result).toEqual({
      from: mint.recipient,
      to: mint.contractAddress,
      data: EXPECTED_ENCODED_DATA_1155,
    })
  })

  test('returns a TransactionRequest with correct properties when tokenId is null', async () => {
    const mint: MintIntentParams = {
      chainId: 1,
      contractAddress: CONTRACT_ADDRESS,
      amount: BigInt('10'),
      recipient: RECIPIENT_ADDRESS,
      referral: ZORA_DEPLOYER_ADDRESS,
    }

    const result = await getMintIntent(mint)

    expect(result).toEqual({
      from: mint.recipient,
      to: mint.contractAddress,
      data: EXPECTED_ENCODED_DATA_721,
    })
  })
})

describe('Given the getProjectFee function', () => {
  test('should return the correct fee for a 721 mint', async () => {
    const contractAddress: Address =
      '0x4f86113fc3e9783cf3ec9a552cbb566716a57628'
    const mintParams = { contractAddress, chainId: Chains.ZORA }

    const mockFns = {
      getProjectFees: async (_mint: MintActionParams) =>
        BigInt('777000000000000'),
    }

    const getProjectsFeeSpy = vi.spyOn(mockFns, 'getProjectFees')
    const fee = await mockFns.getProjectFees(mintParams)
    expect(getProjectsFeeSpy.mock.calls.length).toBe(1)
    expect(fee).equals(BigInt('777000000000000'))
  })

  test('should return the correct fee for an 1155 mint', async () => {
    const contractAddress: Address =
      '0x393c46fe7887697124a73f6028f39751aa1961a3'
    const tokenId = 1
    const mintParams = {
      contractAddress,
      tokenId,
      chainId: Chains.ZORA,
      amount: 2,
    }

    const mockFns = {
      getProjectFees: async (_mint: MintActionParams) =>
        BigInt('1554000000000000'),
    }

    const getProjectsFeeSpy = vi.spyOn(mockFns, 'getProjectFees')
    const fee = await mockFns.getProjectFees(mintParams)
    expect(getProjectsFeeSpy.mock.calls.length).toBe(1)
    expect(fee).equals(BigInt('1554000000000000'))
  })
})

describe('Given the getFee function', () => {
  test('should return the correct project + action fee for a 721 mint', async () => {
    const contractAddress: Address =
      '0x4f86113fc3e9783cf3ec9a552cbb566716a57628'
    const mintParams = { contractAddress, chainId: Chains.ZORA }

    const mockFns = {
      getFees: async (_mint: MintActionParams) => ({
        projectFee: BigInt('777000000000000'),
        actionFee: BigInt('0'),
      }),
    }

    const getProjectsFeeSpy = vi.spyOn(mockFns, 'getFees')
    const fee = await mockFns.getFees(mintParams)
    expect(getProjectsFeeSpy.mock.calls.length).toBe(1)
    expect(fee.projectFee).equals(BigInt('777000000000000'))
    expect(fee.actionFee).equals(BigInt('0'))
  })

  test('should return the correct project + action fee for an 1155 mint', async () => {
    const contractAddress: Address =
      '0x393c46fe7887697124a73f6028f39751aa1961a3'
    const tokenId = 1
    const mintParams = {
      contractAddress,
      tokenId,
      chainId: Chains.ZORA,
      amount: 2,
    }

    const mockFns = {
      getFees: async (_mint: MintActionParams) => ({
        projectFee: BigInt('1554000000000000'),
        actionFee: BigInt('0'),
      }),
    }

    const getProjectsFeeSpy = vi.spyOn(mockFns, 'getFees')
    const fee = await mockFns.getFees(mintParams)
    expect(getProjectsFeeSpy.mock.calls.length).toBe(1)
    expect(fee.projectFee).equals(BigInt('1554000000000000'))
    expect(fee.actionFee).equals(BigInt('0'))
  })
})

describe('simulateMint function', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('should simulate a 1155 mint when tokenId is not 0', async () => {
    const mockFn = {
      simulateMint: async (
        _mint: MintIntentParams,
        _value: bigint,
        _account: Address,
      ) => ({
        request: {
          address: '0x5F69dA5Da41E5472AfB88fc291e7a92b7F15FbC5',
          value: parseEther('0.000777'),
        },
      }),
    }
    vi.spyOn(mockFn, 'simulateMint')

    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: '0x5F69dA5Da41E5472AfB88fc291e7a92b7F15FbC5',
      tokenId: 10,
      amount: BigInt(1),
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      referral: ZORA_DEPLOYER_ADDRESS,
    }
    const value = parseEther('0.000777')
    const account = '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF'

    const result = await mockFn.simulateMint(mint, value, account)
    const request = result.request
    expect(request.address).toBe(mint.contractAddress)
    expect(request.value).toBe(value)
  })

  test('should simulate a 1155 mint on blast', async () => {
    const mockFn = {
      simulateMint: async (
        _mint: MintIntentParams,
        _value: bigint,
        _account: Address,
      ) => ({
        request: {
          address: '0x553f0a63858a9000212cdbd0c40cf7861b692dc0',
          value: parseEther('0.000777'),
        },
      }),
    }
    vi.spyOn(mockFn, 'simulateMint')

    const mint: MintIntentParams = {
      chainId: Chains.BLAST,
      contractAddress: '0x553f0a63858a9000212cdbd0c40cf7861b692dc0',
      tokenId: 1,
      amount: BigInt(1),
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      referral: ZORA_DEPLOYER_ADDRESS,
    }
    const value = parseEther('0.000777')
    const account = '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF'

    const result = await mockFn.simulateMint(mint, value, account)
    const request = result.request
    expect(request.address).toBe(mint.contractAddress)
    expect(request.value).toBe(value)
  })

  test('should return an error object if address is not a contract', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.ARBITRUM_ONE,
      contractAddress: '0x0fc434acc936c79ac1f8f44ed07c7da92ade8f94',
      tokenId: 1,
      amount: BigInt(1),
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      referral: ZORA_DEPLOYER_ADDRESS,
    }
    const value = parseEther('0.000777')
    const account = '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF'
    await expect(simulateMint(mint, value, account)).rejects.toThrow(
      'None of the specified function selectors are present in the contract bytecode.',
    )
  })
})

describe('getDynamicNameParams function', () => {
  test('should return correct values for valid input', async () => {
    const params = {
      type: ActionType.Mint,
      data: {
        amount: 1,
        chainId: 10,
      },
    }
    const metadata = {
      tokenImage: 'image.png',
      tokenName: 'Token Name',
      collection: 'Collection Name',
    }

    const result = await getDynamicNameParams(
      params as DisctriminatedActionParams,
      metadata,
    )

    expect(result).toEqual({
      actionType: 'Mint',
      originQuantity: 1,
      originTargetImage: 'image.png',
      originTarget: 'Token Name',
      originCollection: 'from Collection Name',
      originNetwork: 10,
      projectImage:
        'https://rabbithole-assets.s3.amazonaws.com/projects/zora.png&w=3840&q=75',
      project: 'Zora',
    })
  })

  test('should throw error for invalid action type', async () => {
    const params = {
      type: ActionType.Swap,
      data: {
        amount: 1,
        chainId: 10,
      },
    }
    const metadata = {
      tokenImage: 'image.png',
      tokenName: 'Token Name',
      collection: 'Collection Name',
    }

    await expect(
      getDynamicNameParams(params as DisctriminatedActionParams, metadata),
    ).rejects.toThrow(`Invalid action type "${params.type}"`)
  })
})

describe('getExternalUrl function', () => {
  test('should return correct url for 1155 mint with token id w/referral', async () => {
    const params = {
      chainId: Chains.ZORA,
      contractAddress: getAddress('0x393c46fe7887697124a73f6028f39751aa1961a3'),
      tokenId: 1,
      referral: getAddress('0x1234567890123456789012345678901234567890'),
    }
    const result = await getExternalUrl(params, ActionType.Mint)
    expect(result).toBe(
      'https://zora.co/collect/zora:0x393c46fe7887697124A73f6028f39751aA1961a3/1?referrer=0x1234567890123456789012345678901234567890',
    )
  })

  test('should return correct url for 1155 mint with token id w/o referral', async () => {
    const params = {
      chainId: Chains.ZORA,
      contractAddress: getAddress('0x393c46fe7887697124a73f6028f39751aa1961a3'),
      tokenId: 1,
    }
    const result = await getExternalUrl(params, ActionType.Mint)
    expect(result).toBe(
      `https://zora.co/collect/zora:0x393c46fe7887697124A73f6028f39751aA1961a3/1?referrer=${ZORA_DEPLOYER_ADDRESS}`,
    )
  })

  test('should return correct url for 1155 mint without token id', async () => {
    const params = {
      chainId: Chains.ZORA,
      contractAddress: getAddress('0x393c46fe7887697124a73f6028f39751aa1961a3'),
      referral: getAddress('0x1234567890123456789012345678901234567890'),
    }
    const result = await getExternalUrl(params, ActionType.Mint)
    expect(result).toBe(
      'https://zora.co/collect/zora:0x393c46fe7887697124A73f6028f39751aA1961a3?referrer=0x1234567890123456789012345678901234567890',
    )
  })

  test('should return correct url for testnet mint', async () => {
    const params = {
      chainId: Chains.BASE_SEPOLIA,
      contractAddress: getAddress('0x627a509d76498ddd7d80a28ef4cd887b5b6df2cd'),
      tokenId: 39,
      referral: getAddress('0xe3bBA2A4F8E0F5C32EF5097F988a4d88075C8B48'),
    }
    const result = await getExternalUrl(params, ActionType.Mint)
    expect(result).toBe(
      'https://testnet.zora.co/collect/bsep:0x627a509D76498DDD7D80a28eF4cD887B5b6df2Cd/39?referrer=0xe3bBA2A4F8E0F5C32EF5097F988a4d88075C8B48',
    )
  })
})
