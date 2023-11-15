import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { LBRouterV21ABI } from '@traderjoe-xyz/sdk-v2'
import { ChainId } from '@traderjoe-xyz/sdk-core'
import { swap, getSupportedTokenAddresses } from './TraderJoe'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { passingTestCases, failingTestCases } from './test-setup'
import { TOKENS_FOR_EXACT_TOKENS } from './test-transactions'
import { Tokens } from './contract-addresses'

describe('Given the TraderJoe plugin', () => {
  describe('When handling the swap action', () => {
    describe('should return a valid action filter', () => {
      test('when swapping tokens', async () => {
        const { params } = TOKENS_FOR_EXACT_TOKENS
        const filter = await swap(params)
        expect(filter).to.deep.equal({
          chainId: 42161,
          to: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
          input: {
            $abi: LBRouterV21ABI,
            $and: [
              {
                to: '0x22e798f9440f563b92aae24e94c75dfa499e3d3e',
                path: {
                  tokenPath: {
                    $and: [
                      {
                        $first: Tokens[ChainId.ARBITRUM_ONE].USDCE,
                      },
                      {
                        $last: Tokens[ChainId.ARBITRUM_ONE].ARB,
                      },
                    ],
                  },
                },
              },
              {
                $or: [
                  {
                    amountIn: {
                      $gte: '5996000000',
                    },
                    amountOutMin: {
                      $gte: '5315300000000000000000',
                    },
                  },
                  {
                    amountOut: {
                      $gte: '5315300000000000000000',
                    },
                  },
                  {
                    amountIn: {
                      $gte: '5996000000',
                    },
                    amountOutMinNATIVE: {
                      $gte: '5315300000000000000000',
                    },
                  },
                  {
                    amountNATIVEOut: {
                      $gte: '5315300000000000000000',
                    },
                    amountInMax: {
                      $gte: '5996000000',
                    },
                  },
                ],
              },
            ],
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
