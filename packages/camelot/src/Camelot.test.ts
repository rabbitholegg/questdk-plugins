import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { CAMELOT_ROUTER } from './contract-addresses'
import { ARBITRUM_CHAIN_ID } from './chain-ids'
import { parseEther } from 'viem'
import { swap } from './Camelot'
import { CAMELOT_ABI } from './abi'
import { failingTestCases, passingTestCases } from './test-setup'

describe('Given the camelot plugin', () => {
  describe('When handling the plugin', () => {
    test('should return a valid action filter', async () => {
      const filter = await swap({
        chainId: ARBITRUM_CHAIN_ID,
        contractAddress: CAMELOT_ROUTER,
        tokenOut: '0xBfbCFe8873fE28Dfa25f1099282b088D52bbAD9C',
        amountOut: GreaterThanOrEqual(parseEther('0.0005')),
      })

      expect(filter).to.deep.equal({
        chainId: 42161,
        to: '0xc873fEcbd354f5A56E00E710B90EF4201db2448d',
        input: {
          $abi: CAMELOT_ABI,
          path: {
            $and: [{ $last: '0xBfbCFe8873fE28Dfa25f1099282b088D52bbAD9C' }],
          },
          amountOutMin: { $gte: '500000000000000' },
        },
      })
    })
  })
  describe('should pass filter when all parameters are valid', () => {
    passingTestCases.forEach((testCase) => {
      const { transaction, params, description } = testCase
      test(description, async () => {
        const filter = await swap({ ...params })
        expect(apply(transaction, filter)).to.be.true
      })
    })
  })
  describe('should not pass filter when parameters are invalid', () => {
    failingTestCases.forEach((testCase) => {
      const { transaction, params, description } = testCase
      test(description, async () => {
        const filter = await swap({ ...params })
        expect(apply(transaction, filter)).to.be.false
      })
    })
  })
})
