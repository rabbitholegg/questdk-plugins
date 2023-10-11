import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { mint } from './Basepaint'
import { CONTRACT_ADDRESS, MINT_ABI, TEST_TRANSACTION } from './constants'

describe('Given the basepaint plugin', () => {
  describe('When handling the mint filter', () => {
    test('should return a valid action filter', async () => {
      const filter = await mint({
        address: '0xba5e05cb26b78eda3a2f8e3b3814726305dcac83',
        tokenId: 69,
        quantity: GreaterThanOrEqual(1),
      })
      expect(filter).to.deep.equal({
        to: CONTRACT_ADDRESS,
        chainId: 8453,
        input: {
          $abi: MINT_ABI,
          day: 69,
          count: {
            $gte: '1',
          },
        },
      })
    })

    test('should pass filter with valid transactions', async () => {
      const filter = await mint({
        address: '0xba5e05cb26b78eda3a2f8e3b3814726305dcac83',
        tokenId: 52,
        quantity: GreaterThanOrEqual(1),
      })
      expect(apply(TEST_TRANSACTION, filter)).to.be.true
    })
  })
})
