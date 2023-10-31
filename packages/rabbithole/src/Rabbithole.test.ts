import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'

describe('Given the rabbithole plugin', () => {
  describe('When handling the quest', () => {

    test('should return a valid action filter', () => {
      
    })

    test('should pass filter with valid transactions',  () => {
      const transaction = CREATE_AND_QUEUE_QUEST
      const filter = await quest({
        chainId: optimism,
      })
      expect(apply(transaction, filter)).to.be.true
    })
    
    test('should not pass filter with invalid transactions',  () => {
      
    })

  })
})
