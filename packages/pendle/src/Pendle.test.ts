import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { swap } from './Pendle.js'
import {
  SWAP_EXACT_PT_FOR_YT,
  SWAP_EXACT_SY_FOR_YT,
  SWAP_EXACT_TOKEN_FOR_YT,
  SWAP_EXACT_YT_FOR_PT,
  SWAP_EXACT_YT_FOR_SY,
  SWAP_EXACT_YT_FOR_TOKEN,
} from './test-transactions'

describe('Given the Pendle plugin', () => {
  describe('When handling the swap', () => {
    const validTransactions = [SWAP_EXACT_TOKEN_FOR_YT, SWAP_EXACT_YT_FOR_SY]
    const invalidTransactions = [
      SWAP_EXACT_YT_FOR_TOKEN,
      SWAP_EXACT_YT_FOR_PT,
      SWAP_EXACT_SY_FOR_YT,
      SWAP_EXACT_PT_FOR_YT,
    ]

    test('should return a valid action filter', async () => {})

    test.each(validTransactions)(
      'should pass filter with valid transactions',
      async (tx) => {
        const filter = await swap({ chainId: tx.chainId })
        expect(apply(tx, filter)).to.be.true
      },
    )

    test.each(invalidTransactions)(
      'should not pass filter with invalid transactions',
      async (tx) => {
        const filter = await swap({ chainId: tx.chainId })
        expect(apply(tx, filter)).to.be.false
      },
    )
  })
})
