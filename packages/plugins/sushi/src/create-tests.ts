import {
  ETH_FOR_EXACT_TOKENS,
  EXACT_ETH_FOR_TOKENS,
  EXACT_TOKENS_FOR_ETH,
  EXACT_TOKENS_FOR_TOKENS,
  PROCESS_ROUTE_ETH_TOKEN,
  PROCESS_ROUTE_TOKEN_ETH,
  PROCESS_ROUTE_TOKEN_TOKEN,
  PROCESS_ROUTE_V4,
  TOKENS_FOR_EXACT_ETH,
  TOKENS_FOR_EXACT_TOKENS,
} from './test-transactions'
import { GreaterThanOrEqual } from '@rabbitholegg/questdk'
import { createTestCase } from '@rabbitholegg/questdk-plugin-utils'
import { parseEther } from 'viem'

export const passingTestCases = [
  createTestCase(
    PROCESS_ROUTE_ETH_TOKEN,
    'when swapping ETH to tokens using route processor',
  ),
  createTestCase(
    PROCESS_ROUTE_TOKEN_ETH,
    'when swapping tokens to ETH using route processor',
  ),
  createTestCase(
    PROCESS_ROUTE_TOKEN_TOKEN,
    'when swapping tokens to tokens using route processor',
  ),
  createTestCase(
    PROCESS_ROUTE_V4,
    'when swapping ETH to tokens using V4 route processor',
  ),
  createTestCase(
    ETH_FOR_EXACT_TOKENS,
    'when swapping ETH for exact tokens using V2 router',
  ),
  createTestCase(
    EXACT_ETH_FOR_TOKENS,
    'when swapping exact ETH for tokens using V2 router',
  ),
  createTestCase(
    EXACT_TOKENS_FOR_ETH,
    'when swapping exact tokens for ETH using V2 router',
  ),
  createTestCase(
    EXACT_TOKENS_FOR_TOKENS,
    'when swapping exact tokens for tokens using V2 router',
  ),
  createTestCase(
    TOKENS_FOR_EXACT_ETH,
    'when swapping tokens for exact ETH using V2 router',
  ),
  createTestCase(
    TOKENS_FOR_EXACT_TOKENS,
    'when swapping tokens for exact tokens using V2 router',
  ),
]

export const failingTestCases = [
  createTestCase(PROCESS_ROUTE_ETH_TOKEN, 'when chainId is not correct', {
    chainId: 10,
  }),
  createTestCase(
    PROCESS_ROUTE_TOKEN_ETH,
    'when tokenIn is not correct (process route)',
    {
      tokenIn: '0x4200000000000000000000000000000000000006',
    },
  ),
  createTestCase(
    EXACT_TOKENS_FOR_ETH,
    'when tokenIn is not correct (V2 swap)',
    {
      tokenIn: '0x4200000000000000000000000000000000000006',
    },
  ),
  createTestCase(
    PROCESS_ROUTE_TOKEN_TOKEN,
    'when tokenOut is not correct (process route)',
    {
      tokenOut: '0x4200000000000000000000000000000000000006',
    },
  ),
  createTestCase(
    EXACT_ETH_FOR_TOKENS,
    'when tokenOut is not correct (V2 swap)',
    {
      tokenOut: '0x4200000000000000000000000000000000000006',
    },
  ),
  createTestCase(
    PROCESS_ROUTE_ETH_TOKEN,
    'when amountIn is insufficient (process route)',
    {
      amountIn: GreaterThanOrEqual(parseEther('100000')),
    },
  ),
  createTestCase(
    ETH_FOR_EXACT_TOKENS,
    'when amountIn is insufficient (V2 swap)',
    {
      amountIn: GreaterThanOrEqual(parseEther('100000')),
    },
  ),
  createTestCase(
    PROCESS_ROUTE_TOKEN_TOKEN,
    'when amountOut is insufficient (process route)',
    {
      amountOut: GreaterThanOrEqual(parseEther('100000')),
    },
  ),
  createTestCase(
    EXACT_ETH_FOR_TOKENS,
    'when amountOut is insufficient (V2 swap)',
    {
      amountOut: GreaterThanOrEqual(parseEther('100000')),
    },
  ),
  createTestCase(
    PROCESS_ROUTE_TOKEN_ETH,
    'when recipient is not correct (process route)',
    {
      recipient: '0x96e0fd08cbcd2f8c9fa20557898464cb970c9a75',
    },
  ),
  createTestCase(
    EXACT_TOKENS_FOR_ETH,
    'when recipient is not correct (V2 swap)',
    {
      recipient: '0x96e0fd08cbcd2f8c9fa20557898464cb970c9a75',
    },
  ),
]
