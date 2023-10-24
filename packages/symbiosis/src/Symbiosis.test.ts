import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Symbiosis'

import { TEST_TRANSACTIONS } from './test-transactions'

describe('Given the symbiosis plugin', () => {
  describe('When handling the bridge', () => {
    test('should return a valid action filter', () => {})
      return true
    
    })
  })

  describe('should pass filter with valid transactions', () => {
    TEST_TRANSACTIONS.forEach((testTransaction) => {
      test(testTransaction.description, async () => {
        const {
          transaction,
          destinationChainId,
          tokenAddress,
          amount,
          recipient,
        } = testTransaction

        const filter = await bridge({
          sourceChainId: transaction.chainId,
          destinationChainId,
          tokenAddress,
          amount: GreaterThanOrEqual(amount),
          recipient,
        })
        expect(apply(transaction, filter)).to.be.true
      })
  })
})
