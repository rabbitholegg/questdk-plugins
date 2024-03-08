import {
  Chains,
  type MintActionParams,
  type MintIntentParams,
  ActionType,
} from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk/filter'
import { type Address, parseEther } from 'viem'
import { describe, expect, test, vi } from 'vitest'
import { getMintIntent, mint, getDynamicNameParams, simulateMint } from './Zora'
import {
  UNIVERSAL_MINTER_ABI,
  ZORA_MINTER_ABI_721,
  ZORA_MINTER_ABI_1155,
} from './abi'
import { failingTestCases, passingTestCases } from './test-setup'
import {
  BASIC_PURCHASE,
  EXPECTED_ENCODED_DATA_721,
  EXPECTED_ENCODED_DATA_1155,
} from './test-transactions'

describe('Given the zora plugin', () => {
  describe('When handling the mint', () => {
    test('should return a valid action filter', async () => {
      const { params } = BASIC_PURCHASE
      const filter = await mint(params)
      expect(filter).to.deep.equal({
        chainId: 10,
        to: {
          $or: [
            '0xfff631ef40557f8705e89053af794a1dcfa0a90b',
            '0x97eb05b8db496b12244bccf17cf377d00a99b67a',
          ],
        },
        input: {
          $or: [
            {
              $abiAbstract: UNIVERSAL_MINTER_ABI,
              _targets: {
                $some: '0xfFF631EF40557f8705e89053aF794a1DCFA0A90b',
              },
              _calldatas: {
                $some: {
                  $or: [
                    {
                      $abi: ZORA_MINTER_ABI_721,
                      $and: [
                        {
                          $or: [
                            {
                              recipient:
                                '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                            },
                            {
                              tokenRecipient:
                                '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                            },
                            {
                              to: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $abi: ZORA_MINTER_ABI_1155,
                      $and: [
                        {
                          $or: [
                            {
                              recipient:
                                '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                            },
                            {
                              tokenRecipient:
                                '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                            },
                            {
                              to: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              $abi: ZORA_MINTER_ABI_721,
              $and: [
                {
                  $or: [
                    {
                      recipient: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                    },
                    {
                      tokenRecipient:
                        '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                    },
                    {
                      to: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                    },
                  ],
                },
              ],
            },
            {
              $abi: ZORA_MINTER_ABI_1155,
              $and: [
                {
                  $or: [
                    {
                      recipient: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                    },
                    {
                      tokenRecipient:
                        '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                    },
                    {
                      to: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                    },
                  ],
                },
              ],
            },
          ],
        },
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
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

describe('simulateMint function', () => {
  test('should simulate a 1155 mint when tokenId is not 0', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.ZORA,
      contractAddress: '0xc53c050131a3507d51d014445f666f4c3a1a2c24',
      tokenId: 1, // not 0
      amount: BigInt(1),
      recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    }
    const value = parseEther('0.000777')
    const account = '0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8'

    const result = await simulateMint(mint, value, account)
    const request = result.request
    expect(request.address).toBe(mint.contractAddress)
    expect(request.value).toBe(value)
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

    const result = await getDynamicNameParams(params, metadata)

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

    await expect(getDynamicNameParams(params, metadata)).rejects.toThrow(
      `Invalid action type "${params.type}"`,
    )
  })
})
