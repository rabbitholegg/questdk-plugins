import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import {
  CAMELOT_ROUTER,
  DEFAULT_TOKEN_LIST,
  ETH_ADDRESS,
  PARASWAP_ROUTER,
} from './contract-addresses'
import { ARBITRUM_CHAIN_ID } from './chain-ids'
import { parseEther, getAddress } from 'viem'
import { swap } from './Camelot'
import { Tokens } from './utils'
import { CAMELOT_ABI, PARASWAP_ABI } from './abi'
import { failingTestCases, passingTestCases } from './test-setup'

describe('Given the camelot plugin', () => {
  describe('should return a valid action filter', () => {
    test('for a swap using ERC-20 token as tokenIn', async () => {
      const filter = await swap({
        chainId: ARBITRUM_CHAIN_ID,
        contractAddress: CAMELOT_ROUTER,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.WETH,
        amountIn: GreaterThanOrEqual(1000000n),
        amountOut: GreaterThanOrEqual(parseEther('0.0005')),
      })

      expect(filter).to.deep.equal({
        chainId: 42161,
        to: {
          $or: [CAMELOT_ROUTER.toLowerCase(), PARASWAP_ROUTER.toLowerCase()],
        },
        input: {
          $abi: [...CAMELOT_ABI, ...PARASWAP_ABI],
          $or: [
            {
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
                fromAmount: {
                  $gte: '1000000',
                },
                toAmount: {
                  $gte: '500000000000000',
                },
                assets: {
                  $and: [{ $first: Tokens.USDT }, { $last: Tokens.WETH }],
                },
                partner: '0x353D2d14Bb674892910685520Ac040f560CcBC06',
              },
            },
          ],
        },
      })
    })
    test('for a swap using ETH as tokenIn', async () => {
      const filter = await swap({
        chainId: ARBITRUM_CHAIN_ID,
        contractAddress: CAMELOT_ROUTER,
        tokenIn: Tokens.ETH,
        tokenOut: Tokens.USDT,
        amountIn: GreaterThanOrEqual(1000000n),
        amountOut: GreaterThanOrEqual(parseEther('0.0005')),
        recipient: '0x67ef327038b25ff762a0606bc92c4a0a6e767048',
      })
      expect(filter).to.deep.equal({
        chainId: 42161,
        to: {
          $or: [CAMELOT_ROUTER.toLowerCase(), PARASWAP_ROUTER.toLowerCase()],
        },
        value: {
          $gte: '1000000',
        },
        input: {
          $abi: [...CAMELOT_ABI, ...PARASWAP_ABI],
          $or: [
            {
              to: '0x67ef327038b25ff762a0606bc92c4a0a6e767048',
              path: {
                $and: [
                  {
                    $first: Tokens.WETH,
                  },
                  {
                    $last: Tokens.USDT,
                  },
                ],
              },
              amountOutMin: {
                $gte: '500000000000000',
              },
            },
            {
              data: {
                fromToken: ETH_ADDRESS,
                fromAmount: {
                  $gte: '1000000',
                },
                toAmount: {
                  $gte: '500000000000000',
                },
                toToken: Tokens.USDT,
                partner: '0x353D2d14Bb674892910685520Ac040f560CcBC06',
              },
            },
            {
              data: {
                fromToken: ETH_ADDRESS,
                fromAmount: {
                  $gte: '1000000',
                },
                toAmount: {
                  $gte: '500000000000000',
                },
                path: {
                  $last: {
                    to: Tokens.USDT,
                  },
                },
                partner: '0x353D2d14Bb674892910685520Ac040f560CcBC06',
              },
            },
            {
              data: {
                fromToken: ETH_ADDRESS,
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
                        to: Tokens.USDT,
                      },
                    },
                  },
                },
                partner: '0x353D2d14Bb674892910685520Ac040f560CcBC06',
              },
            },
            {
              data: {
                fromAmount: {
                  $gte: '1000000',
                },
                toAmount: {
                  $gte: '500000000000000',
                },
                assets: {
                  $and: [{ $first: Tokens.ETH }, { $last: Tokens.USDT }],
                },
                partner: '0x353D2d14Bb674892910685520Ac040f560CcBC06',
              },
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
    test('should throw error when contract address is incorrect', async () => {
      try {
        const { transaction, params } = passingTestCases[0]
        params.contractAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
        const filter = await swap({ ...params })
        apply(transaction, filter)
        throw new Error('Expected bridge function to throw, but it did not.')
      } catch (err) {
        if (err instanceof Error) {
          expect(err.message).toBe('Invalid Contract Address')
        }
      }
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
