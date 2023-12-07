import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { swap, getSupportedTokenAddresses } from './WooFi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { passingTestCases, failingTestCases } from './test-transactions'

// Replace *project* with the name of the project
describe('Given the WooFi plugin', () => {
  describe('When handling the swap action', () => {
    describe('should return a valid action filter', () => {})

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { description, transaction, params } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { description, transaction, params } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    describe('should return a valid token list', () => {
      CHAIN_ID_ARRAY.forEach((chainId) => {
        test(`for chainId ${chainId}`, async () => {
          const tokenList = await getSupportedTokenAddresses(chainId)
          expect(tokenList).to.not.be.empty
        })
      })
    })
  })
})
