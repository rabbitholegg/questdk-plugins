import { GreaterThanOrEqual } from '@rabbitholegg/questdk'
import { parseEther, parseUnits } from 'viem'
import { Tokens, createTestCase } from '../../camelot/src/utils'
import {
  V2_SWAP_ETH,

} from './test-transactions'

export const passingTestCases = [
  createTestCase(V2_SWAP_ETH, 'when swapping ETH for tokens'),
]

export const failingTestCases = [
  createTestCase(V2_SWAP_ETH, 'when chainId is incorrect', { chainId: 10 }),
  createTestCase(V2_SWAP_ETH, 'when tokenIn is incorrect', {
    tokenIn: Tokens.WETH,
  }),
  createTestCase(V2_SWAP_ETH, 'when tokenOut is incorrect', {
    tokenOut: Tokens.WETH,
  }),
  createTestCase(V2_SWAP_ETH, 'when amountIn is insufficient', {
    amountIn: GreaterThanOrEqual(parseEther('0.1')),
  }),
  createTestCase(V2_SWAP_ETH, 'when amountOut is insufficient', {
    amountOut: GreaterThanOrEqual(parseUnits('20', 6)),
  }),
  createTestCase(V2_SWAP_ETH, 'when recipient in incorrect', {
    recipient: '0x12e80D4b52023eDd8cB2294C6948D4c5d5D5D266',
  }),
]
