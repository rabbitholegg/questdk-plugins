import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { swap, getSupportedTokenAddresses } from './WooFi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { passingTestCases, failingTestCases } from './test-transactions'
import { SWAP_ABI } from './abi'

describe('Given the WooFi plugin', () => {
  describe('When handling the swap action', () => {
    describe('should return a valid action filter', () => {
      test('when swapping on woofi', async () => {
        const { params } = passingTestCases[0]
        const filter = await swap(params)
        expect(filter).to.deep.equal({
          chainId: 42161,
          to: '0x4c4AF8DBc524681930a27b2F1Af5bcC8062E6fB7',
          input: {
            $abi: SWAP_ABI,
            fromToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            toToken: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
            fromAmount: {
              $gte: '222000000000000000',
            },
            minToAmount: {
              $gte: '500000000',
            },
            to: '0x9a67df384ec63f6cf960ef7e33287ea61491e415',
          },
        })
      })
    })
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
