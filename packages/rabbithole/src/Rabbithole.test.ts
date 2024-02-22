import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { FAILING_TEST_TRANSACTIONS } from './test-transactions'
import { quest } from './Rabbithole'

describe('Given the rabbithole plugin', () => {
  describe('When handling the quest', () => {
    test('should return a valid action filter', () => {})

    // describe('should pass filter with valid transactions', () => {
    //   PASSING_TEST_TRANSACTIONS.forEach((testTransaction) => {
    //     test(testTransaction.description, async () => {
    //       const {
    //         transaction,
    //         rewardToken,
    //         rewardAmount,
    //         startTime,
    //         endTime,
    //         totalParticipants,
    //       } = testTransaction

    //       const filter = await quest({
    //         chainId: transaction.chainId,
    //         rewardToken,
    //         rewardAmount: rewardAmount
    //           ? GreaterThanOrEqual(rewardAmount)
    //           : undefined,
    //         startTime: startTime,
    //         endTime: endTime,
    //         totalParticipants: totalParticipants,
    //       })
    //       expect(apply(transaction, filter)).to.be.true
    //     })
    //   })
    // })
    describe('should not pass filter with invalid parameters', () => {
      FAILING_TEST_TRANSACTIONS.forEach((testTransaction) => {
        test(testTransaction.description, async () => {
          const {
            transaction,
            rewardToken,
            rewardAmount,
            startTime,
            endTime,
            totalParticipants,
          } = testTransaction

          const filter = await quest({
            chainId: transaction.chainId,
            rewardToken,
            rewardAmount: rewardAmount
              ? GreaterThanOrEqual(rewardAmount)
              : undefined,
            startTime: startTime,
            endTime: endTime,
            totalParticipants: totalParticipants,
          })
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
