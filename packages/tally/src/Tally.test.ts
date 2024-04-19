import { delegate } from './Tally'
import { TALLY_ABI } from './abi'
import { failingTestCases, passingTestCases } from './test-transactions'
import { TALLY_TOKENS } from './token-addresses'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
const TEST_ADDRESS = '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5'
const TEST_PROJECT = TALLY_TOKENS[Chains.ARBITRUM_ONE][0]

describe('Given the tally plugin', () => {
  describe('When handling the delegate on Arbitrum', () => {
    test('should return a valid action filter', async () => {
      const filter = await delegate({
        chainId: Chains.ARBITRUM_ONE,
        delegate: TEST_ADDRESS,
        project: TEST_PROJECT,
      })
      expect(filter).to.deep.equal({
        chainId: Chains.ARBITRUM_ONE,
        to: TEST_PROJECT,
        input: {
          $abi: TALLY_ABI,
          delegatee: TEST_ADDRESS,
        },
      })
    })

    describe('should pass filter when all parameters are valid', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await delegate(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter when parameters are invalid', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await delegate(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
