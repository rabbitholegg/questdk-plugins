import { GreaterThanOrEqual } from '@rabbitholegg/questdk'
import { parseEther, parseUnits } from 'viem'
import { Tokens, createTestCase } from './utils'
import {
  V2_SWAP_ETH,
  V2_SWAP_TOKENS,
  V2_TOKENS_TO_ETH,
  V3_SWAP_ETH,
  V3_TOKEN_TO_ETH,
  PARASWAP_SIMPLESWAP,
  PARASWAP_MULTISWAP,
  PARASWAP_MEGASWAP,
  PARASWAP_UNISWAP,
  PARASWAP_BALANCER,
  PARASWAP_CURVE,
  SWAP_WRONG_PARTNER,
} from './test-transactions'

export const passingTestCases = [
  createTestCase(V2_SWAP_ETH, 'when swapping ETH for tokens'),
  createTestCase(V2_SWAP_TOKENS, 'when swapping tokens for tokens'),
  createTestCase(V2_TOKENS_TO_ETH, 'when swapping Tokens for ETH V2'),
  createTestCase(V3_SWAP_ETH, 'when swapping ETH for tokens V3'),
  createTestCase(V3_TOKEN_TO_ETH, 'when swapping Tokens for ETH V3'),
  createTestCase(PARASWAP_SIMPLESWAP, 'for simple swap'),
  createTestCase(PARASWAP_MULTISWAP, 'for multi swap'),
  createTestCase(PARASWAP_MEGASWAP, 'for mega swap'),
  createTestCase(PARASWAP_UNISWAP, 'for directUniV3Swap'),
  createTestCase(PARASWAP_BALANCER, 'for directBalancerV2'),
  createTestCase(PARASWAP_CURVE, 'for directCurveV2Swap'),
]

export const failingTestCases = [
  createTestCase(V2_SWAP_TOKENS, 'when chainId is incorrect', { chainId: 10 }),
  createTestCase(V2_SWAP_TOKENS, 'when tokenIn is incorrect', {
    tokenIn: Tokens.WETH,
  }),
  createTestCase(V2_SWAP_TOKENS, 'when tokenOut is incorrect', {
    tokenOut: Tokens.WETH,
  }),
  createTestCase(V2_SWAP_ETH, 'when amountIn is insufficient', {
    amountIn: GreaterThanOrEqual(parseEther('0.1')),
  }),
  createTestCase(V2_SWAP_TOKENS, 'when amountOut is insufficient', {
    amountOut: GreaterThanOrEqual(parseUnits('20', 6)),
  }),
  createTestCase(V2_SWAP_TOKENS, 'when recipient in incorrect', {
    recipient: '0x12e80D4b52023eDd8cB2294C6948D4c5d5D5D266',
  }),
  createTestCase(SWAP_WRONG_PARTNER, 'if swap did not originate from camelot'),
]
