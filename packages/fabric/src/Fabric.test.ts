import { getFees, getMintIntent, mint, simulateMint } from './Fabric'
import { failingTestCases, passingTestCases } from './test-transactions'
import {
  Chains,
  type MintIntentParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import * as utils from './utils'

vi.mock('viem', () => {
  const mockClient = {
    simulateContract: vi.fn().mockResolvedValue({
      request: {
        address: '0xD77269c83AAB591Ca834B3687E1f4164B2fF25f5',
        value: 999999999995328000n,
        functionName: 'mint',
        args: [2000n],
        account: '0x000000000000000000000000000000000000dEaD',
      },
      result: undefined,
    }),
    multicall: vi
      .fn()
      .mockResolvedValue([
        { result: '0x0000000000000000000000000000000000000000' },
        { result: 100n },
        { result: 69n },
      ]),
  }

  return {
    createPublicClient: () => mockClient,
    zeroAddress: '0x0000000000000000000000000000000000000000',
    http: vi.fn(),
    encodeFunctionData: vi
      .fn()
      .mockReturnValue(
        '0xa0712d6800000000000000000000000000000000000000000000000000028fbee4d84c00',
      ),
    chainId: vi.fn().mockReturnValue(1),
  }
})

vi.mock('./utils', () => {
  return {
    getContractData: vi.fn().mockResolvedValue({
      erc20Address: '0x0000000000000000000000000000000000000000' as Address,
      minPurchaseSeconds: 100n,
      tps: 69n,
    }),
  }
})

describe('Given the fabric plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid mint action', async () => {
        const filter = await mint({
          chainId: 8453,
          contractAddress: '0x2efc6064239121d1d7efb503355daa82b87ee89c',
        })
        expect(filter).toBeTypeOf('object')
        expect(Number(filter.chainId)).toBe(8453)
        if (typeof filter.to === 'string') {
          expect(filter.to).toMatch(/^0x[a-fA-F0-9]{40}$/)
        } else {
          // if to is an object, it should have a logical operator as the only key
          expect(filter.to).toBeTypeOf('object')
          // @ts-ignore to is on the filter object
          expect(Object.keys(filter.to)).toHaveLength(1)
          expect(
            ['$or', '$and'].some((prop) =>
              Object.hasOwnProperty.call(filter.to, prop),
            ),
          ).to.be.true
          // @ts-ignore to is on the filter object
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
          // @ts-ignore transaction is on the test case
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          try {
            const filter = await mint(params)
            // @ts-ignore transaction is on the test case
            const result = apply(transaction, filter)
            expect(result).toBe(false)
          } catch (error) {
            expect(error).toBeInstanceOf(Error)
          }
        })
      })
    })
  })
})

describe('Given the getFee function', () => {
  test('should return the correct project + action fee for a 721 mint', async () => {
    const contractAddress: Address =
      '0x3db5bc85fb89c59d7d03e1dda7ee4563f9c54270'
    const mintParams = { chainId: Chains.BASE, contractAddress, amount: 1n }
    const fee = await getFees(mintParams)
    expect(fee.projectFee).equals(0n)
    expect(fee.actionFee).equals(6900n)
  })
})

describe('Given the getMintIntent function', () => {
  // Define the constant for the contract address
  const CONTRACT_ADDRESS = '0x2efc6064239121d1d7efb503355daa82b87ee89c'
  const RECIPIENT_ADDRESS = '0x1234567890123456789012345678901234567890'

  test('returns a TransactionRequest with correct properties', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: CONTRACT_ADDRESS,
      amount: BigInt('1'),
      recipient: RECIPIENT_ADDRESS,
    }

    const result = await getMintIntent(mint)

    expect(result).toEqual({
      from: mint.recipient,
      to: mint.contractAddress,
      data: '0xa0712d6800000000000000000000000000000000000000000000000000028fbee4d84c00',
    })
  })
})

describe('simulateMint function', () => {
  beforeEach(() => {
    vi.spyOn(utils, 'getContractData').mockImplementation(async (chainId) => {
      if (chainId === Chains.SEPOLIA) {
        return {
          erc20Address: '0x0000000000000000000000000000000000000000' as Address,
          minPurchaseSeconds: 100n,
          tps: 10n,
        }
      }
      return {
        erc20Address: '0x0000000000000000000000000000000000000000' as Address,
        minPurchaseSeconds: 100n,
        tps: 10n,
      }
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should simulate a mint', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.SEPOLIA,
      contractAddress: '0xD77269c83AAB591Ca834B3687E1f4164B2fF25f5',
      amount: BigInt(2),
      recipient: '0x000000000000000000000000000000000000dEaD',
    }
    const value = 999999999995328000n
    const account = '0x000000000000000000000000000000000000dEaD'

    const result = await simulateMint(mint, value, account)
    const request = result.request
    expect(request.address).toBe(mint.contractAddress)
    expect(request.value).toBe(value)

    expect(utils.getContractData).toHaveBeenCalledWith(
      Chains.SEPOLIA,
      mint.contractAddress,
      undefined,
    )
  })
})
