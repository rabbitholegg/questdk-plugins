import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { ActionType } from '@rabbitholegg/questdk'
import { describe, expect, test } from 'vitest'
import {
  MULTI_DEPOSIT,
  SIMPLE_DEPOSIT,
  PROD_SWAP_SIMPLE,
  SIMPLE_SWAP_ZYBER_TO_ETH,
  SINGLE_SWAP_EURO,
  SINGLE_SWAP_USDC_BTC,
  SWAP_MEGA,
  SWAP_MULTI,
  SWAP_SIMPLE,
  SWAP_BALANCER,
  SWAP_CURVE,
  UNISWAP_V3_SWAP,
  WETH_PROD_TEST,
} from './test-transactions'
import { stake, swap, getSupportedTokenAddresses } from './Paraswap.js'
import { ARB_ONE_CHAIN_ID, OPTIMISM_CHAIN_ID } from './chain-ids.js'
import { Tokens } from './utils'
import { parseEther, parseUnits } from 'viem'
import { PARASWAP_SWAP_ABI } from './abi.js'
import type {
  FilterObject,
  TransactionFilter,
} from '@rabbitholegg/questdk/dist/types/filter/types'
const AUGUSTUS_SWAPPER_ARBITRUM = '0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57'

describe('Given the paraswap plugin', () => {
  describe('When handling the swap', () => {
    test('should return a valid action filter', async () => {
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.USDCE,
        amountIn: GreaterThanOrEqual(339000000),
      })

      expect(filter).to.deep.equal({
        chainId: ARB_ONE_CHAIN_ID,
        to: AUGUSTUS_SWAPPER_ARBITRUM,
        input: {
          $abi: PARASWAP_SWAP_ABI,
          $or: [
            {
              data: {
                fromToken: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
                fromAmount: {
                  $gte: '339000000',
                },
                toToken: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
              },
            },
            {
              data: {
                fromToken: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
                fromAmount: {
                  $gte: '339000000',
                },
                path: {
                  $last: {
                    to: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
                  },
                },
              },
            },
            {
              data: {
                fromToken: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
                fromAmount: {
                  $gte: '339000000',
                },
                path: {
                  $last: {
                    path: {
                      $last: {
                        to: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
                      },
                    },
                  },
                },
              },
            },
            {
              data: {
                assets: {
                  $and: [
                    {
                      $first: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
                    },
                    {
                      $last: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
                    },
                  ],
                },
                fromAmount: {
                  $gte: '339000000',
                },
              },
            },
          ],
        },
      })
    })

    test('should pass filter with valid simple transactions', async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.USDCE,
        amountIn: GreaterThanOrEqual(339000000),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid production simple transactions', async () => {
      const transaction = PROD_SWAP_SIMPLE
      const testFilter: TransactionFilter = {
        to: AUGUSTUS_SWAPPER_ARBITRUM,
        input: {
          //@ts-ignore
          $abi: PARASWAP_SWAP_ABI,
          $or: [
            {
              data: {
                assets: {
                  $and: [
                    {
                      $first: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                    },
                    {
                      $last: '0x0000000000000000000000000000000000000000',
                    },
                  ],
                },
              },
            } as FilterObject,
            {
              data: {
                path: {
                  $last: {
                    path: {
                      $last: {
                        to: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                      },
                    },
                  },
                },
                fromToken: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
              },
            } as FilterObject,
            {
              data: {
                path: {
                  $last: {
                    to: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                  },
                },
                fromToken: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
              },
            } as FilterObject,
            {
              data: {
                toToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                fromToken: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
              },
            } as FilterObject,
          ],
        },
        chainId: 42161,
      }
      expect(apply(transaction, testFilter)).to.be.true
    })
    test('should not pass filter with invalid simple transactions', async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.USDCE,
        amountIn: GreaterThanOrEqual(339000000000),
      })
      expect(apply(transaction, filter)).to.be.false
    })

    test('should pass filter with valid singe swap WETH -> USDC', async () => {
      const transaction = WETH_PROD_TEST
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.WETH,
        tokenOut: Tokens.USDCE,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid singe swap USDC -> WBTC', async () => {
      const transaction = SINGLE_SWAP_USDC_BTC
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDCE,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid singe swap USDC -> EURO', async () => {
      const transaction = SINGLE_SWAP_EURO
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDCE,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid Uniswap swap', async () => {
      const transaction = UNISWAP_V3_SWAP
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.ETH,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid Simple swap Zyber -> ETH', async () => {
      const transaction = SIMPLE_SWAP_ZYBER_TO_ETH
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenOut: Tokens.ETH,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid multi transactions', async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDCE,
        tokenOut: Tokens.VELA,
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should not pass filter with invalid transactions', async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.VELA,
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.false
    })
    test('should pass filter with valid simple transactions', async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.USDCE,
        amountIn: GreaterThanOrEqual(339000000),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should not pass filter with invalid simple transactions', async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.USDCE,
        amountIn: GreaterThanOrEqual(339000000000),
      })
      expect(apply(transaction, filter)).to.be.false
    })
    test('should pass filter with valid multi transactions', async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDCE,
        tokenOut: Tokens.VELA,
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid balancer transaction', async () => {
      const transaction = SWAP_BALANCER
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.ETH,
        tokenOut: '0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8',
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid curve transaction', async () => {
      const transaction = SWAP_CURVE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.ETH,
        tokenOut: Tokens.USDT,
        amountIn: GreaterThanOrEqual(parseEther('0.121')),
        amountOut: GreaterThanOrEqual(parseUnits('249.50', 6)),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid megaswap transaction', async () => {
      const transaction = SWAP_MEGA
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        tokenIn: '0xB64E280e9D1B5DbEc4AcceDb2257A87b400DB149', // LVL Token
        tokenOut: Tokens.USDT,
        amountIn: GreaterThanOrEqual(parseUnits('500', 18)),
        amountOut: GreaterThanOrEqual(parseUnits('100', 6)),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should not pass filter with invalid transactions', async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.VELA,
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.false
    })

    describe('when returning supported tokens (swap)', () => {
      const chainIds = [1, 10, 42161]
      for (const chainId of chainIds) {
        test(`should return list of tokens for chainId ${chainId}`, async () => {
          const tokens = await getSupportedTokenAddresses(
            chainId,
            ActionType.Swap,
          )
          expect(tokens).to.not.be.empty
        })
      }
    })
  })
  describe('When handling the stake', () => {
    test('should pass with a simple deposit', async () => {
      const transaction = SIMPLE_DEPOSIT
      const filter = await stake({
        chainId: OPTIMISM_CHAIN_ID,
        contractAddress: '0x8C934b7dBc782568d14ceaBbEAeDF37cB6348615',
        amountOne: GreaterThanOrEqual(parseEther('46128')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass with a multi deposit', async () => {
      const transaction = MULTI_DEPOSIT
      const filter = await stake({
        chainId: OPTIMISM_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        amountOne: GreaterThanOrEqual(parseEther('659')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
  })
})
