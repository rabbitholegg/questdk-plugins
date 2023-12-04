import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { failingTestCases, passingTestCases } from './test-setup'
import { BASIC_PURCHASE } from './test-transactions'
import { mint } from './Zora'
import { ZORA_MINTER_ABI } from './abi'

describe('Given the zora plugin', () => {
  describe('When handling the mint', () => {

    test('should return a valid action filter', async () => {
      const { params } = BASIC_PURCHASE
      const filter = await mint(params)
      expect(filter).to.deep.equal({
        chainId: 10,
        to: '0xfff631ef40557f8705e89053af794a1dcfa0a90b',
        input: {
          $abi: ZORA_MINTER_ABI,
          $and: [
            {
              $or: [
                {
                  recipient: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                },
                {
                  tokenRecipient: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
                },
              ],
            }
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
