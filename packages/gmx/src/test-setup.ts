import { GreaterThanOrEqual } from '@rabbitholegg/questdk'
import { parseEther, parseUnits } from 'viem'
import { createTestCase, Tokens } from './utils'
import {
  TOKENS_FOR_TOKENS_V1,
  ETH_FOR_TOKENS_V1,
  TOKENS_FOR_ETH_V1,
  SWAP_TOKENS_V2,
  TOKENS_FOR_TOKENS_V2,
  ETH_FOR_TOKENS_V2,
  TOKENS_FOR_ETH_V2,
  TOKENS_FOR_USDC_V2,
  ETH_FOR_USDC_V2,
  USDC_FOR_ETH_V2,
  USDC_FOR_WETH_V2,
  REDUCE_ORDER_V2,
  ALT_ETHOUT_V2,
} from './test-transactions'

export const passingTestCasesV1 = [
  createTestCase(TOKENS_FOR_TOKENS_V1, 'when swapping tokens for tokens'),
  createTestCase(TOKENS_FOR_ETH_V1, 'when swapping tokens for ETH'),
  createTestCase(ETH_FOR_TOKENS_V1, 'when swapping ETH for tokens'),
]

export const failingTestCasesV1 = [
  createTestCase(TOKENS_FOR_TOKENS_V1, 'when chainId is incorrect', {
    chainId: 10,
  }),
  createTestCase(TOKENS_FOR_ETH_V1, 'when tokenIn is incorrect', {
    tokenIn: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  }),
  createTestCase(ETH_FOR_TOKENS_V1, 'when tokenOut is incorrect', {
    tokenOut: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  }),
  createTestCase(ETH_FOR_TOKENS_V1, 'when amountIn is insufficient using ETH', {
    amountIn: GreaterThanOrEqual(parseEther('0.0193')),
  }),
  createTestCase(TOKENS_FOR_TOKENS_V1, 'when amountIn is insufficient', {
    amountIn: GreaterThanOrEqual(parseUnits('5001', 6)),
  }),
  createTestCase(TOKENS_FOR_ETH_V1, 'when amountOut is insufficient', {
    amountOut: GreaterThanOrEqual(parseEther('.58')),
  }),
  createTestCase(TOKENS_FOR_ETH_V1, 'when recipient is incorrect', {
    recipient: '0x052c68abe8e4bf0b78925e488b98f6fdc18a3af9',
  }),
]

export const passingTestCasesV2 = [
  createTestCase(TOKENS_FOR_TOKENS_V2, 'when swapping USDC.e to WBTC'),
  createTestCase(ETH_FOR_TOKENS_V2, 'when swapping ETH to LINK'),
  createTestCase(TOKENS_FOR_ETH_V2, 'when swapping LINK to ETH'),
  createTestCase(TOKENS_FOR_USDC_V2, 'when swapping LINK to USDC'),
  createTestCase(ETH_FOR_USDC_V2, 'when swapping ETH to USDC'),
  createTestCase(USDC_FOR_ETH_V2, 'when swapping USDC to ETH'),
  createTestCase(USDC_FOR_WETH_V2, 'when swapping USDC to WETH'),
  createTestCase(ALT_ETHOUT_V2, 'when swapping USDC.e to ETH'),
  createTestCase(SWAP_TOKENS_V2, 'when all parameters are correct'),
]

export const failingTestCasesV2 = [
  createTestCase(TOKENS_FOR_TOKENS_V2, 'when chainId is incorrect', {
    chainId: 10,
  }),
  createTestCase(TOKENS_FOR_TOKENS_V2, 'when tokenIn is incorrect', {
    tokenIn: Tokens.UNI,
  }),
  createTestCase(SWAP_TOKENS_V2, 'when tokenIn is incorrect', {
    tokenIn: Tokens.DAI,
  }),
  createTestCase(TOKENS_FOR_TOKENS_V2, 'when tokenOut is incorrect', {
    tokenOut: Tokens.UNI,
  }),
  createTestCase(TOKENS_FOR_TOKENS_V2, 'when amountIn is insufficient', {
    amountIn: GreaterThanOrEqual(parseUnits('20.01', 6)),
  }),
  createTestCase(SWAP_TOKENS_V2, 'when amountIn is insufficient', {
    amountIn: GreaterThanOrEqual(parseEther('10000')),
  }),
  createTestCase(TOKENS_FOR_TOKENS_V2, 'when amountOut is insufficient', {
    amountOut: GreaterThanOrEqual(parseUnits('0.00055', 8)),
  }),
  createTestCase(REDUCE_ORDER_V2, 'when wrong OrderType is used'),
]
