import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { swap, getSupportedTokenAddresses } from './HandleFi'
import { passingTestCases, failingTestCases } from './test-transactions'
import { ARBITRUM_ONE } from './constants'
import {
  PARASWAP_ABI,
  V2_ROUTER_ABI,
  HSPMHLP_ABI,
  HPSM2_ABI,
  HLP_BALANCER_ABI,
  HLP_CURVE_V2_ABI,
  CURVE_FACTORY_ABI,
} from './abi'

describe('Given the handlefi plugin', () => {
  describe('When handling the swap action', () => {
    describe('should return a valid action filter', () => {
      test('when using convert fetaure on handlefi', async () => {
        const { params } = passingTestCases[0]
        const filter = await swap(params)
        expect(filter).to.deep.equal({
          chainId: 42161,
          from: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
          to: {
            $or: [
              '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
              '0x434b5245f6fe54d0c9f881d55c2ba27fe7132d89',
              '0x69328f23a090e57378e3120f622ed0697f0e7ecf',
              '0x0f330a53874cea3e5a0dee5d291c49275fdc3260',
              '0x559844b1df66e247f83ba58bc39fa488a1af1093',
              '0x9bdc4094860c97d9e5f1c18c4602a4a907d0a916',
              '0xab174ffa530c888649c44c4d21c849bbaabc723f',
              '0xd0dd5d76cf0fc06dabc48632735566dca241a35e',
            ],
          },
          input: {
            $or: [
              {
                $abi: PARASWAP_ABI,
                $or: [
                  {
                    data: {
                      fromToken: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                      fromAmount: {
                        $gte: '1000000000000000000',
                      },
                      toAmount: {
                        $gte: '1110000',
                      },
                      toToken: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                      partner: '0xFa2c1bE677BE4BEc8851D1577B343F7060B51E3A',
                    },
                  },
                  {
                    data: {
                      fromToken: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                      fromAmount: {
                        $gte: '1000000000000000000',
                      },
                      toAmount: {
                        $gte: '1110000',
                      },
                      path: {
                        $last: {
                          to: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                        },
                      },
                      partner: '0xFa2c1bE677BE4BEc8851D1577B343F7060B51E3A',
                    },
                  },
                  {
                    data: {
                      fromToken: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                      fromAmount: {
                        $gte: '1000000000000000000',
                      },
                      toAmount: {
                        $gte: '1110000',
                      },
                      path: {
                        $last: {
                          path: {
                            $last: {
                              to: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                            },
                          },
                        },
                      },
                      partner: '0xFa2c1bE677BE4BEc8851D1577B343F7060B51E3A',
                    },
                  },
                  {
                    data: {
                      assets: {
                        $and: [
                          {
                            $first:
                              '0x912ce59144191c1204e64559fe8253a0e49e6548',
                          },
                          {
                            $last: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
                          },
                        ],
                      },
                      fromAmount: {
                        $gte: '1000000000000000000',
                      },
                      toAmount: {
                        $gte: '1110000',
                      },
                      partner: '0xFa2c1bE677BE4BEc8851D1577B343F7060B51E3A',
                    },
                  },
                ],
              },
              {
                $abi: V2_ROUTER_ABI,
                _path: {
                  $and: [
                    {
                      $first: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                    },
                    {
                      $last: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                    },
                  ],
                },
                _amountIn: {
                  $gte: '1000000000000000000',
                },
                _minOut: {
                  $gte: '1110000',
                },
                _receiver: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
              },
              {
                $abi: HSPMHLP_ABI,
                peggedToken: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                tokenOut: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                receiver: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
                amountIn: { $gte: '1000000000000000000' },
                minOut: { $gte: '1110000' },
              },
              {
                $abi: HPSM2_ABI,
                amount: {
                  $gte: '1000000000000000000',
                },
                fxTokenAddress: {
                  $or: [
                    '0x912CE59144191C1204E64559FE8253a0e49E6548',
                    '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                  ],
                },
                peggedTokenAddress: {
                  $or: [
                    '0x912CE59144191C1204E64559FE8253a0e49E6548',
                    '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                  ],
                },
              },
              {
                $abi: HLP_CURVE_V2_ABI,
                tokenOut: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                amountIn: {
                  $gte: '1000000000000000000',
                },
                minOut: {
                  $gte: '1110000',
                },
                receiver: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
                $or: [
                  {
                    peggedToken: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                  },
                  {
                    hlpToken: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                  },
                ],
              },
              {
                $abi: HLP_BALANCER_ABI,
                minOut: {
                  $gte: '1110000',
                },
                amountIn: {
                  $gte: '1000000000000000000',
                },
                receiver: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
                tokenIn: '0x912CE59144191C1204E64559FE8253a0e49E6548',
              },
              {
                $abi: CURVE_FACTORY_ABI,
                i: null,
                j: null,
                _dx: {
                  $gte: '1000000000000000000',
                },
                _min_dy: {
                  $gte: '1110000',
                },
              },
            ],
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    describe('should return a valid list of tokens for each supported chain', () => {
      test(`for chainId: ${ARBITRUM_ONE}`, async () => {
        const tokens = await getSupportedTokenAddresses(ARBITRUM_ONE)
        const addressRegex = /^0x[a-fA-F0-9]{40}$/
        expect(tokens).to.be.an('array')
        expect(tokens).to.have.length.greaterThan(0)
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
