import {
  getExternalUrl,
  getFees,
  getMintIntent,
  mint,
  simulateMint,
} from './Manifold'
import { ERC721_CONTRACT, ERC1155_CONTRACT } from './constants'
import { failingTestCases, passingTestCases } from './test-transactions'
import { apply } from '@rabbitholegg/questdk'
import {
  Chains,
  DEFAULT_ACCOUNT,
  type MintIntentParams,
} from '@rabbitholegg/questdk-plugin-utils'
import axios from 'axios'
import { type Address, parseEther, getAddress } from 'viem'
import { MockedFunction, beforeEach, describe, expect, test, vi } from 'vitest'

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

describe('Given the manifold plugin', () => {
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
        // Check the input property is the correct type and has a valid filter operator
        expect(filter.input).toBeTypeOf('object')
        expect(
          ['$abi', '$abiParams', '$abiAbstract', '$or', '$and'].some((prop) =>
            Object.hasOwnProperty.call(filter.input, prop),
          ),
        ).to.be.true
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})

describe('Given the getMintIntent function', () => {
  // Define the constant for the contract address
  const CONTRACT_ADDRESS = '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb'
  const RECIPIENT_ADDRESS = '0x1234567890123456789012345678901234567890'

  test('returns a TransactionRequest with correct properties when amount is set greater than 1', async () => {
    const mint: MintIntentParams = {
      chainId: 1,
      tokenId: 1,
      contractAddress: CONTRACT_ADDRESS,
      amount: BigInt('2'),
      recipient: RECIPIENT_ADDRESS,
    }
    const result = await getMintIntent(mint)
    expect(result).toEqual({
      from: mint.recipient,
      to: mint.contractAddress,
      data: '0x26c858a40000000000000000000000006ecbe1db9ef729cbe972c83fb886247691fb6beb0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000123456789012345678901234567890123456789000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    })
  })

  test('returns a TransactionRequest when amount is 1 or undefined', async () => {
    const mint: MintIntentParams = {
      chainId: 1,
      tokenId: 1,
      amount: BigInt('1'),
      contractAddress: CONTRACT_ADDRESS,
      recipient: RECIPIENT_ADDRESS,
    }
    const result = await getMintIntent(mint)
    expect(result).toEqual({
      from: mint.recipient,
      to: mint.contractAddress,
      data: '0xfa2b068f0000000000000000000000006ecbe1db9ef729cbe972c83fb886247691fb6beb0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000000000000000000',
    })
  })
})

describe('Given the getFee function', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('should return the correct project + action fee for a 721 mint', async () => {
    const contractAddress: Address =
      '0x6935cd348193bab133f3081f53eb99ee6f0d685b'
    const mintParams = { contractAddress, chainId: Chains.OPTIMISM }
    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: {
        publicData: {
          merkleTreeId: undefined,
          mintPrice: {
            value: '0',
          },
        },
      },
    })

    const fee = await getFees(mintParams)
    expect(fee.projectFee).toEqual(parseEther('0.0005'))
    expect(fee.actionFee).toEqual(0n)
  })

  test('should return the correct project + action fee for an 1155 mint', async () => {
    const contractAddress: Address =
      '0xe096f28c87f331758af3da402add89b33a2853d8'
    const tokenId = 1
    const mintParams = {
      contractAddress,
      tokenId,
      chainId: Chains.BASE,
      amount: 1,
    }
    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: {
        publicData: {
          merkleTreeId: undefined,
          mintPrice: {
            value: '520000000000000',
            decimals: 18,
            currency: 'ETH',
            erc20: '0x0000000000000000000000000000000000000000',
          },
        },
      },
    })

    const fee = await getFees(mintParams)
    expect(fee.projectFee).toEqual(parseEther('0.0005'))
    expect(fee.actionFee).toEqual(parseEther('0.00052'))
  })
})

describe('simulateMint function', () => {
  test('should simulate a 1155 mint', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: '0xd5428e8181be784f12e492ff04ccda44be6f43fb',
      tokenId: 1,
      amount: BigInt('1'),
      recipient: DEFAULT_ACCOUNT,
    }
    const value = parseEther('0.00119')
    const result = await simulateMint(mint, value, mint.recipient)
    const request = result.request
    expect(request.address).toBe(ERC1155_CONTRACT)
    expect(request.value).toBe(value)
  })

  test('should simulate a 721 mint', async () => {
    const mint = {
      chainId: Chains.OPTIMISM,
      contractAddress: '0x6935cd348193bab133f3081f53eb99ee6f0d685b',
      recipient: DEFAULT_ACCOUNT,
    }
    const value = parseEther('0.0005')
    const result = await simulateMint(
      mint as MintIntentParams,
      value,
      mint.recipient as Address,
    )
    const request = result.request
    expect(request.address).toBe(ERC721_CONTRACT)
    expect(request.value).toBe(value)
  })
})

describe('getExternalUrl function', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  test('should return the correct url for a 721 mint', async () => {
    const mint = {
      chainId: Chains.OPTIMISM,
      contractAddress: getAddress('0x6935cd348193bab133f3081f53eb99ee6f0d685b'),
    }
    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: {
        slug: 'girls-man',
      },
    })

    const result = await getExternalUrl(mint)
    expect(result).toBe('https://app.manifold.xyz/c/girls-man')
  })

  test('should return the fallback url for an unknown contract', async () => {
    const mint = {
      chainId: Chains.OPTIMISM,
      contractAddress: getAddress('0x7935cd348193bab133f3081f53eb99ee6f0d685b'),
    }
    const result = await getExternalUrl(mint)
    expect(result).toBe('https://app.manifold.xyz/')
  })
})
