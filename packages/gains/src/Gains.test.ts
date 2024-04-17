import { options } from './Gains'
import { ABI, CONTRACTS, MARKET_ORDER_TYPE, PAIRS } from './constants'
import { failingTestCases, passingTestCases } from './test-transactions'
import { compressJson } from '@rabbitholegg/questdk'
import { Chains, OrderType } from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'

describe('Given the gains plugin', () => {
  describe('When handling the options action', () => {
    describe('should return a valid action filter', () => {
      test('for limit order', async () => {
        const filter = await options({
          chainId: Chains.ARBITRUM_ONE,
          amount: 10000,
          orderType: OrderType.Limit,
        })
        expect(filter).toStrictEqual(
          compressJson({
            chainId: Chains.ARBITRUM_ONE,
            to: { $or: CONTRACTS },
            input: {
              $abi: ABI,
              t: {
                pairIndex: { $or: PAIRS },
                positionSizeDai: 10000,
              },
              _type: { $gt: MARKET_ORDER_TYPE },
            },
          }),
        )
      })

      test('for market order', async () => {
        const filter = await options({
          chainId: Chains.ARBITRUM_ONE,
          amount: 20000,
          orderType: OrderType.Market,
        })
        expect(filter).toStrictEqual(
          compressJson({
            chainId: Chains.ARBITRUM_ONE,
            to: { $or: CONTRACTS },
            input: {
              $abi: ABI,
              t: {
                pairIndex: { $or: PAIRS },
                positionSizeDai: 20000,
              },
              _type: MARKET_ORDER_TYPE,
            },
          }),
        )
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await options(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await options(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
