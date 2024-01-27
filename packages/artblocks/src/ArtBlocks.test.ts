import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { mint } from './ArtBlocks'
import { Chains, Contracts, SHARED_MINTER_ABI } from './const'
import {
  invalidPurchaseTxnWrongProjectId,
  validPurchaseTxn,
} from './test-transactions'

describe('Given the ArtBlocks plugin', () => {
  describe('When handling mint via "purchase"', () => {
    test('should return a valid action filter', async () => {
      const { params } = validPurchaseTxn
      const filter = await mint(params)

      expect(filter.chainId).to.equal(Chains.ETHEREUM)
      expect(filter).to.deep.equal({
        chainId: Chains.ETHEREUM,
        to: {
          $and: [
            { $eq: params.contractAddress },
            { $or: Object.values(Contracts) },
          ],
        },
        input: Object.assign(
          {
            $abi: SHARED_MINTER_ABI,
          },
          params.tokenId ? { projectId: params.tokenId } : {},
        ),
      })
    })

    describe('should pass filter with valid transactions', () => {
      const { transaction, params, description } = validPurchaseTxn

      test(description, async () => {
        const filter = await mint(params)

        expect(apply(transaction, filter)).to.be.true
      })
    })

    describe('should not pass filter with mismatching tokenId', () => {
      const { transaction, params, description } =
        invalidPurchaseTxnWrongProjectId

      test(description, async () => {
        const filter = await mint(params)

        expect(apply(transaction, filter)).to.be.false
      })
    })
  })
})
