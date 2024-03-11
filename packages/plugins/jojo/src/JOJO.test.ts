import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'

import { stake } from './JOJO'
import { FUNDING_RATE_ARBITRAGE_ABI } from './abi'
import {
  STAKE_USDC,
  failingStakeTestCases,
  passingStakeTestCases,
} from './test-transactions'

describe('Given the JOJO plugin', () => {
  describe('when handling the stake action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid USDC stake filter', async () => {
        const { params } = STAKE_USDC
        const filter = await stake(params)
        expect(filter).to.deep.equal({
          chainId: Chains.ARBITRUM_ONE,
          to: params.contractAddress,
          input: {
            $abi: FUNDING_RATE_ARBITRAGE_ABI,
            amount: params.amountOne,
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingStakeTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await stake(params)
          const result = apply(transaction, filter)
          expect(result).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingStakeTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await stake(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
