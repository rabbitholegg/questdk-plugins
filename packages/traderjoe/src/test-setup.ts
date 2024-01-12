import {
  type SwapActionParams,
  GreaterThanOrEqual,
} from '@rabbitholegg/questdk'
import { parseEther, parseUnits } from 'viem'
import { type TestCase, createTestCase, Chains } from './utils'
import { Tokens } from './contract-addresses'
import {
  EXACT_NATIVE_FOR_TOKENS,
  EXACT_NATIVE_FOR_TOKENS_FEE,
  EXACT_TOKENS_FOR_NATIVE,
  EXACT_TOKENS_FOR_NATIVE_FEE,
  EXACT_TOKENS_FOR_TOKENS,
  EXACT_TOKENS_FOR_TOKENS_FEE,
  NATIVE_FOR_EXACT_TOKENS,
  TOKENS_FOR_EXACT_NATIVE,
  TOKENS_FOR_EXACT_TOKENS,
  WETH_AMOUNT_IN,
} from './test-transactions'

export const passingTestCases: TestCase<SwapActionParams>[] = [
  createTestCase(EXACT_NATIVE_FOR_TOKENS, 'when using exactNativeForTokens'),
  createTestCase(
    EXACT_NATIVE_FOR_TOKENS_FEE,
    'when using exactNativeForTokensWithSupportingFee',
  ),
  createTestCase(EXACT_TOKENS_FOR_NATIVE, 'when using exactTokensForNative'),
  createTestCase(
    EXACT_TOKENS_FOR_NATIVE_FEE,
    'when using exactTokensForNativeWithSupportingFee',
  ),
  createTestCase(EXACT_TOKENS_FOR_TOKENS, 'when using exactTokensForTokens'),
  createTestCase(
    EXACT_TOKENS_FOR_TOKENS_FEE,
    'when using exactTokensForTokensWithSupportingFee',
  ),
  createTestCase(NATIVE_FOR_EXACT_TOKENS, 'when using NativeForExactTokens'),
  createTestCase(TOKENS_FOR_EXACT_NATIVE, 'when using TokensForExactNative'),
  createTestCase(TOKENS_FOR_EXACT_TOKENS, 'when using TokensForExactTokens'),
  createTestCase(EXACT_TOKENS_FOR_TOKENS, 'when tokenIn is set to "any"', {
    tokenIn: undefined,
  }),
  createTestCase(EXACT_TOKENS_FOR_TOKENS, 'when tokenOut is set to "any"', {
    tokenOut: undefined,
  }),
  createTestCase(EXACT_TOKENS_FOR_TOKENS, 'when tokens are set to "any/any"', {
    tokenIn: undefined,
    tokenOut: undefined,
  }),
  createTestCase(EXACT_NATIVE_FOR_TOKENS, 'when tokenIn is set to "any"', {
    tokenIn: undefined,
  }),
  createTestCase(EXACT_NATIVE_FOR_TOKENS, 'when tokenOut is set to "any"', {
    tokenOut: undefined,
  }),
  createTestCase(EXACT_NATIVE_FOR_TOKENS, 'when tokens are set to "any/any"', {
    tokenIn: undefined,
    tokenOut: undefined,
  }),
]

export const failingTestCases: TestCase<SwapActionParams>[] = [
  createTestCase(TOKENS_FOR_EXACT_NATIVE, 'when chainId is incorrect', {
    chainId: 10,
  }),
  createTestCase(EXACT_NATIVE_FOR_TOKENS, 'when contractAddress is incorrect', {
    contractAddress: '0xc873fEcbd354f5A56E00E710B90EF4201db2448d',
  }),
  createTestCase(TOKENS_FOR_EXACT_NATIVE, 'when tokenIn is incorrect', {
    tokenIn: Tokens[Chains.ARBITRUM_ONE].STG,
  }),
  createTestCase(EXACT_TOKENS_FOR_TOKENS, 'when tokenOut is incorrect', {
    tokenOut: Tokens[Chains.ARBITRUM_ONE].STG,
  }),
  createTestCase(EXACT_NATIVE_FOR_TOKENS, 'when amountIn is insufficient', {
    amountIn: GreaterThanOrEqual(parseEther('100')),
  }),
  createTestCase(TOKENS_FOR_EXACT_TOKENS, 'when amountOut is insufficient', {
    amountOut: GreaterThanOrEqual(parseUnits('5400', 18)),
  }),
  createTestCase(EXACT_NATIVE_FOR_TOKENS, 'when recipient in incorrect', {
    recipient: '0x7a227272e5B583c2B51B04fF5cA4FDe498368b44',
  }),
  createTestCase(
    WETH_AMOUNT_IN,
    'when using WETH and amount is not sufficient',
  ),
]
