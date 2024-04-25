import { options } from './Kwenta'
import {
  ETH_PERPS_MARKET_ID,
  SMART_MARGIN_V3,
  SMART_MARGIN_V3_COMMIT_ORDER_ABI,
} from './constants.js'
import {
  OPTIONS_TEST,
  failingTestCases,
  passingTestCases,
} from './test-transactions'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'

describe('Given the kwenta plugin', () => {
  describe('When handling the options action', () => {
    test('should return a valid action filter', async () => {
      const { params } = OPTIONS_TEST
      const filter = await options(params)
      expect(filter).to.deep.equal({
        chainId: Chains.BASE,
        to: SMART_MARGIN_V3,
        from: params.recipient,
        input: {
          $abiAbstract: SMART_MARGIN_V3_COMMIT_ORDER_ABI,
          _sizeDelta: params.amount,
          _perpsMarketId: ETH_PERPS_MARKET_ID,
        },
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
