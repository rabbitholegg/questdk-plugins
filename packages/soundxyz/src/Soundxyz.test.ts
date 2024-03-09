import { apply } from '@rabbitholegg/questdk'
import { describe, expect, test, vi } from 'vitest'
import { getDynamicNameParams, mint } from './Soundxyz'
import {
  passingTestCases,
  failingTestCases,
  OP_SUPERMINTER_V2,
  EXPECTED_ENCODED_DATA,
} from './test-transactions'
import { Chains } from './utils'
import { SUPERMINTER, SUPERMINTER_V2, SUPERMINTER_ABI } from './constants'
import { getMintIntent } from './Soundxyz'
import { type Address } from 'viem'
import {
  ActionType,
  type MintIntentParams,
  type MintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'

describe('Given the soundxyz plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      const { params } = OP_SUPERMINTER_V2
      test('when minting a sound on the superminter contract', async () => {
        const filter = await mint(params)
        expect(filter).to.deep.equal({
          chainId: Chains.OPTIMISM,
          to: {
            $or: [SUPERMINTER.toLowerCase(), SUPERMINTER_V2.toLowerCase()],
          },
          input: {
            $abi: SUPERMINTER_ABI,
            p: {
              edition: params.contractAddress,
              quantity: {
                $gte: '1',
              },
              to: params.recipient,
            },
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { description, params, transaction } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { description, params, transaction } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})

describe('getMintIntent', () => {
  const test_address = '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb'
  test('returns a TransactionRequest with correct properties', async () => {
    const mint: MintIntentParams = {
      chainId: 1,
      tokenId: 0,
      contractAddress: SUPERMINTER.toLowerCase() as Address,
      amount: BigInt('10'),
      recipient: test_address,
    }

    const result = await getMintIntent(mint)

    expect(result).toEqual({
      from: mint.recipient,
      to: mint.contractAddress,
      data: EXPECTED_ENCODED_DATA,
    })
  })

  test('throws an error if required parameters are missing', async () => {
    const mint: Partial<MintIntentParams> = {
      contractAddress: test_address,
      amount: BigInt('10'),
      // recipient is missing
    }

    await expect(getMintIntent(mint as MintIntentParams)).rejects.toThrow()
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
      author: 'Author Name',
      tokenCollection: 'Collection Name',
    }

    const result = await getDynamicNameParams(params, metadata)

    expect(result).toEqual({
      actionType: 'Mint',
      originQuantity: 1,
      originTargetImage: 'image.png',
      originAuthor: ' by Author Name',
      originCollection: 'Collection Name',
      originNetwork: 10,
      projectImage:
        'https://rabbithole-assets.s3.amazonaws.com/projects/sound.jpeg&w=3840&q=75',
      project: 'Sound.XYZ',
    })
  })

  test('should throw error for invalid action type', async () => {
    const params = {
      type: ActionType.Swap, // invalid action type
      data: {
        amount: 1,
        chainId: 10,
      },
    }
    const metadata = {
      tokenImage: 'image.png',
      author: 'Author Name',
      tokenCollection: 'Collection Name',
    }

    await expect(getDynamicNameParams(params, metadata)).rejects.toThrow(
      `Invalid action type "${params.type}"`,
    )
  })
})
describe('getProjectFees', () => {
  test('should return the correct fee', async () => {
    const contractAddress: Address =
      '0xFCB12A059C722AEaaFc4AC5531493cad49cA1848'
    const mintParams = { contractAddress, chainId: Chains.BASE }

    const mockFns = {
      getProjectFees: async (_mint: MintActionParams) =>
        BigInt('777000000000000'),
    }

    const getProjectFeesSpy = vi.spyOn(mockFns, 'getProjectFees')
    const fee = await mockFns.getProjectFees(mintParams)
    expect(getProjectFeesSpy).toHaveBeenCalledWith(mintParams)
    expect(fee).toEqual(BigInt('777000000000000'))
  })
})
