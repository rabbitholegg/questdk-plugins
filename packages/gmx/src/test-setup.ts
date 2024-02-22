import { GreaterThanOrEqual, OrderType } from '@rabbitholegg/questdk'
import { parseEther, parseUnits } from 'viem'
import { Tokens } from './utils'
import { createTestCase } from '@rabbitholegg/questdk-plugin-utils'
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
  USDCe_FOR_WETH_V2,
  REDUCE_ORDER_V2,
  ALT_ETHOUT_V2,
  LIMIT_SWAP,
  MARKET_SHORT_ETH_ORDER_V2,
  LIMIT_LONG_ARB_ORDER_V2,
  MARKET_LONG_ARB_WITH_USDC_ORDER_V2,
  MARKET_SWAP_OPTIONS_TYPE,
} from './test-transactions'

export const passingTestCasesV1 = [
  createTestCase(TOKENS_FOR_TOKENS_V1, 'when swapping tokens for tokens'),
  createTestCase(TOKENS_FOR_ETH_V1, 'when swapping tokens for ETH'),
  createTestCase(ETH_FOR_TOKENS_V1, 'when swapping ETH for tokens'),
  createTestCase(TOKENS_FOR_TOKENS_V1, 'tokenIn is set to "any"', {
    tokenIn: undefined,
  }),
  createTestCase(TOKENS_FOR_TOKENS_V1, 'tokenOut is set to "any"', {
    tokenOut: undefined,
  }),
  createTestCase(TOKENS_FOR_TOKENS_V1, 'tokens are set to "any/any"', {
    tokenIn: undefined,
    tokenOut: undefined,
  }),
]

export const failingTestCasesV1 = [
  createTestCase(TOKENS_FOR_TOKENS_V1, 'when chainId is incorrect', {
    chainId: 10,
  }),
  createTestCase(TOKENS_FOR_ETH_V1, 'when tokenIn is incorrect', {
    tokenIn: Tokens.USDCe,
  }),
  createTestCase(ETH_FOR_TOKENS_V1, 'when tokenOut is incorrect', {
    tokenOut: Tokens.USDC,
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
  createTestCase(USDCe_FOR_WETH_V2, 'when swapping USDC.e to WETH'),
  createTestCase(ALT_ETHOUT_V2, 'when swapping USDC.e to ETH'),
  createTestCase(SWAP_TOKENS_V2, 'when all parameters are correct'),
  createTestCase(LIMIT_SWAP, 'when making a limit swap'),
  createTestCase(TOKENS_FOR_TOKENS_V2, 'when tokenIn is set to "any', {
    tokenIn: undefined,
  }),
  createTestCase(TOKENS_FOR_USDC_V2, 'when tokenOut is set to "any', {
    tokenOut: undefined,
  }),
  createTestCase(USDCe_FOR_WETH_V2, 'when tokens are set to "any/any', {
    tokenIn: undefined,
    tokenOut: undefined,
  }),
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

export const passingOptionsTestCases = [
  createTestCase(MARKET_SHORT_ETH_ORDER_V2, 'when using a market order'),
  createTestCase(LIMIT_LONG_ARB_ORDER_V2, 'when using a limit order'),
  createTestCase(
    MARKET_LONG_ARB_WITH_USDC_ORDER_V2,
    'when using a market order and token collateral',
  ),
  createTestCase(
    MARKET_SHORT_ETH_ORDER_V2,
    'when using a market order but the order type is undefined',
    {
      orderType: undefined,
    },
  ),
  createTestCase(
    LIMIT_LONG_ARB_ORDER_V2,
    'when using a limit order but the order type is undefined',
    {
      orderType: undefined,
    },
  ),
  createTestCase(
    MARKET_SHORT_ETH_ORDER_V2,
    'when using a market order but the amount is undefined',
    {
      amount: undefined,
    },
  ),
  createTestCase(
    LIMIT_LONG_ARB_ORDER_V2,
    'when using a limit order but the amount is undefined',
    {
      amount: undefined,
    },
  ),
  createTestCase(
    MARKET_SHORT_ETH_ORDER_V2,
    'when using a market order but the token is undefined',
    {
      token: undefined,
    },
  ),
  createTestCase(
    LIMIT_LONG_ARB_ORDER_V2,
    'when using a limit order but the token is undefined',
    {
      token: undefined,
    },
  ),
]

export const failingOptionsTestCases = [
  createTestCase(
    MARKET_SHORT_ETH_ORDER_V2,
    'when using a market order but the order type is wrong',
    {
      orderType: OrderType.Limit,
    },
  ),
  createTestCase(
    LIMIT_LONG_ARB_ORDER_V2,
    'when using a limit order but the order type is wrong',
    {
      orderType: OrderType.Market,
    },
  ),
  createTestCase(
    MARKET_SHORT_ETH_ORDER_V2,
    'when using a market order but the amount is wrong',
    {
      amount: parseEther('0.0001'),
    },
  ),
  createTestCase(
    LIMIT_LONG_ARB_ORDER_V2,
    'when using a limit order but the amount is wrong',
    {
      amount: parseEther('0.0001'),
    },
  ),
  createTestCase(
    MARKET_SHORT_ETH_ORDER_V2,
    'when using a market order but the token is wrong',
    {
      token: Tokens.UNI,
    },
  ),
  createTestCase(
    LIMIT_LONG_ARB_ORDER_V2,
    'when using a limit order but the token is wrong',
    {
      token: Tokens.UNI,
    },
  ),
  createTestCase(MARKET_SWAP_OPTIONS_TYPE, 'when using a "swap" ordertype'),
]
