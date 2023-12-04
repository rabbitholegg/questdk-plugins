import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { failingTestCases, passingTestCases } from './test-setup'
import { mint } from './Zora'

describe('Given the zora plugin', () => {
  describe('When handling the mint', () => {

    test('should return a valid action filter', () => {
      
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
