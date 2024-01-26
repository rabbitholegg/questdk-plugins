import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { passingTestCases, failingTestCases } from './test-transactions'
import { mint } from './Boost'

describe('Given the boost plugin', () => {
  describe('When handling the mint action', () => {

    describe('should return a valid action filter', () => {
      // test that a valid filter is returned, check other packages for examples
    })

    describe('should pass filter with valid transactions',  () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })
    
    describe('should not pass filter with invalid transactions',  () => {
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