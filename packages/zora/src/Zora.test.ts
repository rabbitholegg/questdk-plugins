import { create, getDynamicNameParams, getMintIntent, mint, simulateMint } from './Zora'
import { failingTestCasesCreate, failingTestCasesMint, passingTestCasesCreate, passingTestCasesMint } from './test-setup'
import {
  EXPECTED_ENCODED_DATA_721,
  EXPECTED_ENCODED_DATA_1155,
} from './test-transactions'
import {
  ActionType,
  Chains,
  type DisctriminatedActionParams,
  type MintActionParams,
  type MintIntentParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk/filter'
import { type Address, parseEther } from 'viem'
import { describe, expect, test, vi } from 'vitest'

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
  test('should simulate a 1155 mint when tokenId is not 0', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: '0x5F69dA5Da41E5472AfB88fc291e7a92b7F15FbC5',
      tokenId: 10,
      amount: BigInt(1),
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
    }
    const value = parseEther('0.000777')
    const account = '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF'

    const result = await simulateMint(mint, value, account)
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
