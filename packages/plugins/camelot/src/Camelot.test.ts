import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import {
  CAMELOT_V2_ROUTER,
  CAMELOT_V3_ROUTER,
  DEFAULT_TOKEN_LIST,
  PARASWAP_ROUTER,
} from './contract-addresses'
import {
  CAMELOT_V2_ABI,
  CAMELOT_V3_EXACT_INPUT_ABI,
  CAMELOT_V3_EXACT_OUTPUT_ABI,
  PARASWAP_ABI,
} from './abi'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { parseEther, getAddress } from 'viem'
import { swap } from './Camelot'
import { Tokens } from './utils'
import { failingTestCases, passingTestCases } from './test-setup'

describe('Given the camelot plugin', () => {
  describe('should return a valid action filter', () => {
    test('for a swap using ERC-20 token as tokenIn', async () => {
      const filter = await swap({
        chainId: Chains.ARBITRUM_ONE,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.WETH,
        amountIn: GreaterThanOrEqual(1000000n),
        amountOut: GreaterThanOrEqual(parseEther('0.0005')),
      })

      expect(filter).to.deep.equal({
        chainId: 42161,
        to: {
          $or: [
            CAMELOT_V2_ROUTER.toLowerCase(),
            CAMELOT_V3_ROUTER.toLowerCase(),
            PARASWAP_ROUTER.toLowerCase(),
          ],
        },
        input: {
          $or: [
            {
              $abi: CAMELOT_V2_ABI,
              path: {
                $and: [
                  {
                    $first: Tokens.USDT,
                  },
                  {
                    $last: Tokens.WETH,
                  },
                ],
              },
              amountOutMin: {
                $gte: '500000000000000',
              },
              amountIn: {
                $gte: '1000000',
              },
            },
            {
              $or: [
                {
                  $abiAbstract: CAMELOT_V3_EXACT_OUTPUT_ABI,
                  params: {
                    $or: [
                      {
                        tokenIn: Tokens.USDT,
                        tokenOut: Tokens.WETH,
                      },
                      {
                        path: {
                          $and: [
                            {
                              $regex:
                                '^0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
                            },
                            {
                              $regex:
                                'fd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9$',
                            },
                          ],
                        },
                      },
                    ],
                    amountInMaximum: {
                      $gte: '1000000',
                    },
                    amountOut: {
                      $gte: '500000000000000',
                    },
                  },
                },
                {
                  $abiAbstract: CAMELOT_V3_EXACT_INPUT_ABI,
                  params: {
                    $or: [
                      {
                        tokenIn: Tokens.USDT,
                        tokenOut: Tokens.WETH,
                      },
                      {
                        path: {
                          $and: [
                            {
                              $regex:
                                '^0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                            },
                            {
                              $regex:
                                '82af49447d8a07e3bd95bd0d56f35241523fbab1$',
                            },
                          ],
                        },
                      },
                    ],
                    amountIn: {
                      $gte: '1000000',
                    },
                    amountOutMinimum: {
                      $gte: '500000000000000',
                    },
                  },
                },
              ],
            },
            {
              $abi: PARASWAP_ABI,
              $or: [
                {
                  data: {
                    fromToken: Tokens.USDT,
                    fromAmount: {
                      $gte: '1000000',
                    },
                    toAmount: {
                      $gte: '500000000000000',
                    },
                    toToken: Tokens.WETH,
                    partner: '0x353D2d14Bb674892910685520Ac040f560CcBC06',
                  },
                },
                {
                  data: {
                    fromToken: Tokens.USDT,
                    fromAmount: {
                      $gte: '1000000',
                    },
                    toAmount: {
                      $gte: '500000000000000',
                    },
                    path: {
                      $last: {
                        to: Tokens.WETH,
                      },
                    },
                    partner: '0x353D2d14Bb674892910685520Ac040f560CcBC06',
                  },
                },
                {
                  data: {
                    fromToken: Tokens.USDT,
                    fromAmount: {
                      $gte: '1000000',
                    },
                    toAmount: {
                      $gte: '500000000000000',
                    },
                    path: {
                      $last: {
                        path: {
                          $last: {
                            to: Tokens.WETH,
                          },
                        },
                      },
                    },
                    partner: '0x353D2d14Bb674892910685520Ac040f560CcBC06',
                  },
                },
                {
                  data: {
                    assets: {
                      $and: [
                        {
                          $first: Tokens.USDT,
                        },
                        {
                          $last: Tokens.WETH,
                        },
                      ],
                    },
                    fromAmount: {
                      $gte: '1000000',
                    },
                    toAmount: {
                      $gte: '500000000000000',
                    },
                    partner: '0x353D2d14Bb674892910685520Ac040f560CcBC06',
                  },
                },
              ],
            },
          ],
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

  describe('all supported tokens addresses are properly checksummed', () => {
    test('should have all addresses properly checksummed', () => {
      const notChecksummed = DEFAULT_TOKEN_LIST.filter(
        (tokenAddress) => tokenAddress !== getAddress(tokenAddress),
      )
      expect(notChecksummed).to.be.empty
    })
  })
})
