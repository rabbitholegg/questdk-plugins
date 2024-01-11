import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { options } from './Mux'
import { passingTestCases } from './test-transactions'

describe('Given the mux plugin', () => {
  describe('When handling the options action', () => {
    describe('should return a valid action filter', () => {})

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { description, transaction, params } = testCase
        test(description, async () => {
          const filter = await options(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })

      describe('should not pass filter with invalid transactions', () => {})
    })
  })
})
