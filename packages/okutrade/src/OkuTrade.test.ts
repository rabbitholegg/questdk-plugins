import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { getSupportedTokenAddresses, swap } from './OkuTrade.js'
import {
  CHAIN_ID_ARRAY,
  EXECUTE_ABI_FRAGMENTS,
  V2_SWAP_EXACT_TYPES,
  V3_SWAP_EXACT_TYPES,
} from './constants.js'
import { failingTestCases, passingTestCases } from './test-transactions.js'
import { zeroAddress } from 'viem'

describe('Given the uniswap plugin', () => {
  describe('When handling the swap', () => {
    describe('should return a valid action filter', () => {
      test('with a valid swap action', async () => {
        const filter = await swap({
          chainId: 10,
          tokenIn: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
          tokenOut: '0x4200000000000000000000000000000000000006',
          amountIn: GreaterThanOrEqual(100000n),
          amountOut: GreaterThanOrEqual(100000n),
        })

        expect(filter).to.deep.equal({
          chainId: 10,
          to: '0xb555edF5dcF85f42cEeF1f3630a52A108E55A654',
          input: {
            $abi: EXECUTE_ABI_FRAGMENTS,
            inputs: {
              $some: {
                $or: [
                  {
                    $abiParams: V3_SWAP_EXACT_TYPES,
                    path: {
                      $and: [
                        {
                          $regex: '^0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
                        },
                        {
                          $regex: '4200000000000000000000000000000000000006$',
                        },
                      ],
                    },
                    amountIn: {
                      $gte: '100000',
                    },
                    amountOut: {
                      $gte: '100000',
                    },
                  },
                  {
                    $abiParams: V2_SWAP_EXACT_TYPES,
                    path: {
                      $and: [
                        {
                          $first: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
                        },
                        {
                          $last: '0x4200000000000000000000000000000000000006',
                        },
                      ],
                    },
                    amountIn: {
                      $gte: '100000',
                    },
                    amountOut: {
                      $gte: '100000',
                    },
                  },
                ],
              },
            },
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    describe('should return a valid list of tokens for each supported chain', () => {
      CHAIN_ID_ARRAY.forEach((chainId) => {
        test(`for chainId: ${chainId}`, async () => {
          const tokens = await getSupportedTokenAddresses(chainId)
          const addressRegex = /^0x[a-fA-F0-9]{40}$/
          expect(tokens).to.be.an('array')
          expect(tokens).to.contain(zeroAddress)
          expect(tokens).to.have.length.greaterThan(1)
          expect(tokens).to.have.length.lessThan(100)
          tokens.forEach((token) => {
            expect(token).to.match(
              addressRegex,
              `Token address ${token} is not a valid Ethereum address`,
            )
          })
        })
      })
    })
  })
})
