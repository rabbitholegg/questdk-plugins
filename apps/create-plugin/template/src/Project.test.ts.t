import { apply } from '@rabbitholegg/questdk'
import { describe, expect, test } from 'vitest'
import { passingTestCases, failingTestCases } from './test-transactions'
import { {{actionType}} } from './{{capitalize projectName}}'

describe('Given the {{lowercase projectName}} plugin', () => {
  describe('When handling the {{actionType}} action', () => {
    describe('should return a valid action filter', () => {
      // test that a valid filter is returned, check the link for a specific example from the sound.xyz package
      // https://github.com/rabbitholegg/questdk-plugins/blob/6c7c91c6f6393e15f0bb58558ad0edb2c79a77ff/packages/soundxyz/src/Soundxyz.test.ts#L14-L34
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await {{actionType}}(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await {{actionType}}(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
