import {
  Chains,
  type MintActionParams,
  type MintIntentParams,
  ActionType,
} from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk/filter'
import { type Address } from 'viem'
import { describe, expect, test, vi } from 'vitest'
import { getDynamicNameParams, getMintIntent, mint } from './Mirror'
import { COLLECT_ENTRY_ABI } from './abi'
import {
  EXPECTED_ENCODED_DATA,
  OP_COLLECT_ENTRY,
  failingTestCases,
  passingTestCases,
} from './test-transactions'

describe('Given the mirror plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when collecting a mirror entry', async () => {
        const { params } = OP_COLLECT_ENTRY
        const filter = await mint(params)
        expect(filter).to.deep.equal({
          chainId: 10,
          from: '0x6e40dc97a419b42490923677bbc803e55338c26e',
          to: '0x05b52003e4b3ce431f467de89a1d0b82b663fc6b',
          input: {
            $abi: COLLECT_ENTRY_ABI,
            tokenRecipient: '0x6e40dc97a419b42490923677bbc803e55338c26e',
          },
        })
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

describe('getMintIntent', () => {
  const test_address = '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb'
  test('returns a TransactionRequest with correct properties', async () => {
    const mint: MintIntentParams = {
      chainId: 1,
      tokenId: 0,
      contractAddress: '0x05b52003e4b3ce431f467de89a1d0b82b663fc6b',
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
      collectionName: 'Collection Name',
    }

    const result = await getDynamicNameParams(params, metadata)

    expect(result).toEqual({
      actionType: 'Mint',
      originQuantity: 1,
      originTargetImage: 'image.png',
      originAuthor: 'by Author Name',
      originCollection: 'Collection Name',
      originNetwork: 10,
      projectImage:
        'https://rabbithole-assets.s3.amazonaws.com/projects/mirror.png&w=3840&q=75',
      project: 'Mirror',
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
      collectionName: 'Collection Name',
    }

    await expect(getDynamicNameParams(params, metadata)).rejects.toThrow(
      `Invalid action type "${params.type}"`,
    )
  })
})
describe('getProjectFees', () => {
  test('should return the correct fee', async () => {
    const contractAddress: Address =
      '0x8F3227b2ff643BAE66e99981904A899361ffB83E'
    const mintParams = { contractAddress, chainId: Chains.OPTIMISM }

    const mockFns = {
      getProjectFees: async (_mint: MintActionParams) =>
        BigInt('690000000000000'),
    }

    const getProjectsFeeSpy = vi.spyOn(mockFns, 'getProjectFees')
    const fee = await mockFns.getProjectFees(mintParams)
    expect(getProjectsFeeSpy).toHaveBeenCalledWith(mintParams)
    expect(fee).toEqual(BigInt('690000000000000'))
  })
})
