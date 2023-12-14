import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { swap } from './Vela'
import { passingTestCases, failingTestCases } from './test-transactions'
import { VAULT_ABI } from './abi'

describe('Given the vela plugin', () => {
  describe('When handling the swap action', () => {
    describe('should return a valid action filter', () => {
      test('when making a swap action', async () => {
        const [testCase] = passingTestCases
        const filter = await swap(testCase.params)
        expect(filter).to.deep.equal({
          chainId: 42161,
          to: '0xc4abade3a15064f9e3596943c699032748b13352',
          from: '0xa99f898530df1514a566f1a6562d62809e99557d',
          input: {
            $abi: VAULT_ABI,
            a: {
              $and: [
                {
                  $gte: '12367929453448690307083082505200429610792387278129332706851243409048338432',
                },
                {
                  $lt: '14134776518227074636666380005943348126619871175004951664972849610340958208',
                },
              ],
            },
            c: {
              $gte: '7445378188230133580578636410607088466657280000000000000000000000000000',
            },
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
