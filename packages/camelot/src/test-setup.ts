import { GreaterThanOrEqual } from '@rabbitholegg/questdk'
import { parseEther, parseUnits } from 'viem'
import { Tokens, createTestCase } from './utils'
import {
  SWAP_ETH,
  SWAP_TOKENS,
  PARASWAP_SIMPLESWAP,
  PARASWAP_MULTISWAP,
  PARASWAP_MEGASWAP,
  PARASWAP_UNISWAP,
} from './test-transactions'

export const passingTestCases = [
  createTestCase(SWAP_ETH, 'when swapping ETH for tokens'),
  createTestCase(SWAP_TOKENS, 'when swapping tokens for tokens'),
  createTestCase(PARASWAP_SIMPLESWAP, 'when using aggregator mode'),
  createTestCase(PARASWAP_MULTISWAP, 'when using aggregator mode'),
  createTestCase(PARASWAP_MEGASWAP, 'when using aggregator mode'),
  createTestCase(PARASWAP_UNISWAP, 'when using aggregator mode'),
]

export const failingTestCases = [
  createTestCase(SWAP_TOKENS, 'when chainId is incorrect', { chainId: 10 }),
  createTestCase(SWAP_TOKENS, 'when tokenIn is incorrect', {
    tokenIn: Tokens.WETH,
  }),
  createTestCase(SWAP_TOKENS, 'when tokenOut is incorrect', {
    tokenOut: Tokens.WETH,
  }),
  createTestCase(SWAP_ETH, 'when amountIn is insufficient', {
    amountIn: GreaterThanOrEqual(parseEther('0.1')),
  }),
  createTestCase(SWAP_TOKENS, 'when amountOut is insufficient', {
    amountOut: GreaterThanOrEqual(parseUnits('20', 6)),
  }),
  createTestCase(SWAP_TOKENS, 'when recipient in incorrect', {
    recipient: '0x12e80D4b52023eDd8cB2294C6948D4c5d5D5D266',
  }),
]
