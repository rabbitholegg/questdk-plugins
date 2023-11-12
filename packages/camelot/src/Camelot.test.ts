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
        to: { $or: [CAMELOT_ROUTER, PARASWAP_ROUTER] },
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
        to: { $or: [CAMELOT_ROUTER, PARASWAP_ROUTER] },
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

    test('should pass filter with valid simple transactions', async () => {
      const transaction = {
        chainId: 42161,
        from: '0x6682cEDE4F8bd59AdBb103392F2780E71013aEca',
        hash: '0xa7ba51c4894a13985d330c6ab12e6577b9c8379670755d4cbad2283e4b6b3fa8',
        input:
          '0x54e3f31b000000000000000000000000000000000000000000000000000000000000002000000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab1000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000072f698f6219c0000000000000000000000000000000000000000000000000000726371cbf0cd000000000000000000000000000000000000000000000000000072f698f6219c00000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000065306bc9ba0efe86825b4ac1966a7d2ecc6136a600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab100000000000000000000000000000000000000000000000000000000000000242e1a7d4d000000000000000000000000000000000000000000000000000072f698f6219c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000240000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000006682cede4f8bd59adbb103392f2780e71013aeca000000000000000000000000216b4b4ba9f3e719726886d34a177484278bfcae000000000000000000000000000000000000000000000000000072f698f6219c0000000000000000000000000000000000000000000000000000000065340be3000000000000000000000000000000000000000000000000000000000000001b0c72bb1fd84199aaee3edb6f03022733efd0fdf014e65952af64d7f658e7ea3a411b51ae18b1400ed89ab4351e446f50c5d04c9f1c876c29b0c8f2930c3dd3c8',
        to: '0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57',
        value: '0',
      }
      const filter = await swap({
        chainId: 42161,
        tokenIn: Tokens.WETH,
        tokenOut: Tokens.ETH,
      })
      expect(apply(transaction, filter)).to.be.true
    })
  })
})
