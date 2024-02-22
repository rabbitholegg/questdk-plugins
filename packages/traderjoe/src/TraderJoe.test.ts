import { apply } from '@rabbitholegg/questdk/filter'
import { LBRouterV21ABI } from '@traderjoe-xyz/sdk-v2'
import { describe, expect, test } from 'vitest'
import { getSupportedTokenAddresses, swap } from './TraderJoe'
import {
  EXACT_NATIVE_FOR_TOKENS_ABI,
  EXACT_TOKENS_FOR_NATIVE_ABI,
  EXACT_TOKENS_FOR_TOKENS_ABI,
  NATIVE_FOR_EXACT_TOKENS_ABI,
  TOKENS_FOR_EXACT_NATIVE_ABI,
  TOKENS_FOR_EXACT_TOKENS_ABI,
} from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { Tokens } from './contract-addresses'
import { failingTestCases, passingTestCases } from './test-setup'
import { TOKENS_FOR_EXACT_TOKENS } from './test-transactions'
import { Chains } from './utils'

describe('Given the TraderJoe plugin', () => {
  describe('When handling the swap action', () => {
    describe('should return a valid action filter', () => {
      test('when swapping tokens', async () => {
        const { params } = TOKENS_FOR_EXACT_TOKENS
        const filter = await swap(params)
        expect(filter).to.deep.equal({
          chainId: 42161,
          to: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
          value: 0,
          input: {
            $and: [
              {
                $abi: LBRouterV21ABI,
                to: '0x22e798f9440f563b92aae24e94c75dfa499e3d3e',
                path: {
                  tokenPath: {
                    $and: [
                      {
                        $first: Tokens[Chains.ARBITRUM_ONE].USDCE,
                      },
                      {
                        $last: Tokens[Chains.ARBITRUM_ONE].ARB,
                      },
                    ],
                  },
                },
              },
              {
                $or: [
                  {
                    $abi: EXACT_NATIVE_FOR_TOKENS_ABI,
                    amountOutMin: {
                      $gte: '5315300000000000000000',
                    },
                  },
                  {
                    $abi: EXACT_TOKENS_FOR_TOKENS_ABI,
                    amountIn: {
                      $gte: '5996000000',
                    },
                    amountOutMin: {
                      $gte: '5315300000000000000000',
                    },
                  },
                  {
                    $abi: NATIVE_FOR_EXACT_TOKENS_ABI,
                    amountOut: {
                      $gte: '5315300000000000000000',
                    },
                  },
                  {
                    $abi: TOKENS_FOR_EXACT_TOKENS_ABI,
                    amountInMax: {
                      $gte: '5996000000',
                    },
                    amountOut: {
                      $gte: '5315300000000000000000',
                    },
                  },
                  {
                    $abi: EXACT_TOKENS_FOR_NATIVE_ABI,
                    amountIn: {
                      $gte: '5996000000',
                    },
                    amountOutMinNATIVE: {
                      $gte: '5315300000000000000000',
                    },
                  },
                  {
                    $abi: TOKENS_FOR_EXACT_NATIVE_ABI,
                    amountInMax: {
                      $gte: '5996000000',
                    },
                    amountNATIVEOut: {
                      $gte: '5315300000000000000000',
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
