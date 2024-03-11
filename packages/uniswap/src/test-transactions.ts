import type { SwapActionParams } from '@rabbitholegg/questdk'
import { GreaterThanOrEqual } from '@rabbitholegg/questdk'
import { createTestCase, type TestParams } from './utils'
import { parseEther, parseUnits, zeroAddress } from 'viem'

export const V3_NATIVE_TO_TOKENS: TestParams<SwapActionParams> = {
  transaction: {
    chainId: 10,
    to: '0xcb1355ff08ab38bbce60111f1bb2b784be25d7e8',
    from: '0x5941f88e17d3c528b9aeb9183ba822e193911b3b',
    hash: '0x7e2871f2521b31b1b5b8acf0a739efb42cb760b6ca69ef0cdb657cf45e826a89',
    input:
      '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000655bd42b00000000000000000000000000000000000000000000000000000000000000020b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000003782dace9d900000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000003782dace9d9000000000000000000000000000000000000000000000000001b53d6516f4ad8844c00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004242000000000000000000000000000000000000060001f4da10009cbd5d07dd0cecc66161fc93d7c9000da10000648c6f28f2f1a3c87f0f938b96d27520d9751ec8d9000000000000000000000000000000000000000000000000000000000000',
    value: '250000000000000000',
  },
  params: {
    chainId: 10,
    tokenIn: zeroAddress,
    tokenOut: '0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9', // SUSD
    amountIn: GreaterThanOrEqual(parseEther('0.25')),
    amountOut: GreaterThanOrEqual(parseUnits('500', 18)),
    recipient: '0x5941f88e17d3c528b9aeb9183ba822e193911b3b',
  },
}

export const V3_TOKENS_TO_NATIVE: TestParams<SwapActionParams> = {
  transaction: {
    chainId: 42161,
    to: '0x5e325eda8064b456f4781070c0738d849c824258',
    from: '0x3ba239b230af38d1afddc9db38019fbae1eef4af',
    hash: '0xba95482e28439800b446c403416ef08997060a3a65d75acb992fd280718067b9',
    input:
      '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000655c105000000000000000000000000000000000000000000000000000000000000000040a00060c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000032000000000000000000000000000000000000000000000000000000000000003a00000000000000000000000000000000000000000000000000000000000000160000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e5831000000000000000000000000ffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000065839c330000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ec8b0f7ffe3ae75d7ffab09429e3675bb63503e400000000000000000000000000000000000000000000000000000000655c163b00000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000041171760924ace7d35d7302b3e3d112b53b25c6db3aaad4128f6c8e8eee808418a00c2d56cc776bbbd7499099531f2baca9cf0fbd658ea252f5d53bbcf4adff6211c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000005f5e10000000000000000000000000000000000000000000000000000ad8933312340ed00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002baf88d065e77c8cc2239327c5edb3a432268e58310001f482af49447d8a07e3bd95bd0d56f35241523fbab1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab100000000000000000000000034ecdad9090cd133e63cf6670f3a03aa7f04fa74000000000000000000000000000000000000000000000000000000000000000f0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000ad8933312340ed',
    value: '0',
  },
  params: {
    chainId: 42161,
    tokenIn: '0xaf88d065e77c8cc2239327c5edb3a432268e5831', // USDC
    tokenOut: zeroAddress,
    amountIn: GreaterThanOrEqual(parseUnits('100', 6)),
    amountOut: GreaterThanOrEqual(parseEther('0.0488')),
    recipient: '0x3ba239b230af38d1afddc9db38019fbae1eef4af',
  },
}

export const V3_TOKENS_TO_TOKENS: TestParams<SwapActionParams> = {
  transaction: {
    chainId: 1,
    to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
    from: '0xef7d8ee2ebe3b4c7d70e723d5a148c710e0ec2e6',
    hash: '0x40c641e76d527b54ddc3f4521656639e117e2b0b98925d45b8e91f39a76b5b8e',
    input:
      '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000655c3a4b00000000000000000000000000000000000000000000000000000000000000020a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000160000000000000000000000000b131f4a55907b10d1f0a50d8ab8fa09ec342cd74000000000000000000000000ffffffffffffffffffffffffffffffffffffffff000000000000000000000000000000000000000000000000000000006583c50900000000000000000000000000000000000000000000000000000000000000000000000000000000000000003fc91a3afd70395cd496c647d5a6cc9d4b2b7fad00000000000000000000000000000000000000000000000000000000655c3f1100000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000041378e4e3bc549c875325dc48fa377b8827e9258313486865ba679961cddef06a47bbfeec9294d688e1e629623b759afcc3e253707cc9076084927659a67eacdce1c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000152d0834665d93c0816f00000000000000000000000000000000000000000000000000000000a18ca8b000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000042b131f4a55907b10d1f0a50d8ab8fa09ec342cd74000bb8c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20001f4a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000000000',
    value: '0',
  },
  params: {
    chainId: 1,
    tokenIn: '0xb131f4a55907b10d1f0a50d8ab8fa09ec342cd74', // MEME
    tokenOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
    amountIn: GreaterThanOrEqual(parseUnits('100000', 18)),
    amountOut: GreaterThanOrEqual(parseUnits('2710.35', 6)),
    recipient: '0xef7d8ee2ebe3b4c7d70e723d5a148c710e0ec2e6',
  },
}

export const V2_NATIVE_TO_TOKENS: TestParams<SwapActionParams> = {
  transaction: {
    chainId: 1,
    to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
    from: '0xa99f898530df1514a566f1a6562d62809e99557d',
    input:
      '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000655c411700000000000000000000000000000000000000000000000000000000000000020b080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000db48eb97a26dca8200000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000f7b3f5a8fed821c5eb60049538a548db2d479ce',
    value: '10000000000000000',
  },
  params: {
    chainId: 1,
    tokenIn: zeroAddress,
    tokenOut: '0x0f7b3f5a8fed821c5eb60049538a548db2d479ce', // ATOR
    amountIn: GreaterThanOrEqual(parseEther('0.01')),
    amountOut: GreaterThanOrEqual(parseUnits('15', 18)),
    recipient: '0xa99f898530df1514a566f1a6562d62809e99557d',
  },
}

export const V2_TOKENS_TO_NATIVE: TestParams<SwapActionParams> = {
  transaction: {
    chainId: 137,
    to: '0xec7be89e9d109e7e3fec59c222cf297125fefda2',
    from: '0x808a4914f189b4439bccfa4f1c46b7c8cfc0b23e',
    input:
      '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000655c4ad60000000000000000000000000000000000000000000000000000000000000002000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000019fb770000000000000000000000000000000000000000000000001c076eccdfb16e7200000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002bc2132d05d31c914a87c6611c10748aeb04b58e8f0001f40d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000808a4914f189b4439bccfa4f1c46b7c8cfc0b23e0000000000000000000000000000000000000000000000001c076eccdfb16e72',
    value: '0',
  },
  params: {
    chainId: 137,
    tokenIn: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT
    tokenOut: zeroAddress, // MATIC
    amountIn: GreaterThanOrEqual(parseUnits('1.70', 6)),
    amountOut: GreaterThanOrEqual(parseEther('2')),
    recipient: '0x808a4914f189b4439bccfa4f1c46b7c8cfc0b23e',
  },
}

export const V2_TOKENS_TO_TOKENS: TestParams<SwapActionParams> = {
  transaction: {
    chainId: 1,
    to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
    from: '0x9baa635e318cdb9c5924858f1d3900a0d1cb4beb',
    input:
      '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000655c283f00000000000000000000000000000000000000000000000000000000000000020a080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000160000000000000000000000000fc0d6cf33e38bce7ca7d89c0e292274031b7157a000000000000000000000000ffffffffffffffffffffffffffffffffffffffff000000000000000000000000000000000000000000000000000000006583b27d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000003fc91a3afd70395cd496c647d5a6cc9d4b2b7fad00000000000000000000000000000000000000000000000000000000655c2c8500000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000004105eab9ffbc4694fc840891fab98b5ded5a14229428f3cc47b6341113d0941e501b6129766e7cbf06cafe65120fc3e5b252bd7819aa3cf25531a3867837164aa71b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000c097915b23a1345e870000000000000000000000000000000000000000000003676db1ceeceae12b7200000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000fc0d6cf33e38bce7ca7d89c0e292274031b7157a000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000045c2f8c9b4c0bdc76200448cc26c48ab6ffef83f',
    value: '0',
  },
  params: {
    chainId: 1,
    tokenIn: '0xfc0d6cf33e38bce7ca7d89c0e292274031b7157a', // NTVRK
    tokenOut: '0x45c2f8c9b4c0bdc76200448cc26c48ab6ffef83f', // DOMI
    amountIn: GreaterThanOrEqual(parseUnits('3552.69', 18)),
    amountOut: GreaterThanOrEqual(parseUnits('16075', 18)),
    recipient: '0x9baa635e318cdb9c5924858f1d3900a0d1cb4beb',
  },
}

export const passingTestCases = [
  createTestCase(V3_NATIVE_TO_TOKENS, 'swapping native to tokens on V3'),
  createTestCase(V3_TOKENS_TO_NATIVE, 'swapping tokens to native on V3'),
  createTestCase(V3_TOKENS_TO_TOKENS, 'swapping tokens to tokens on V3'),
  createTestCase(V2_NATIVE_TO_TOKENS, 'swapping native to tokens on V2'),
  createTestCase(V2_TOKENS_TO_NATIVE, 'swapping tokens to native on V2'),
  createTestCase(V2_TOKENS_TO_TOKENS, 'swapping tokens to tokens on V2'),
  createTestCase(
    V3_NATIVE_TO_TOKENS,
    'swapping tokenIn is set to "any" (using ETH)',
    { tokenIn: undefined },
  ),
  createTestCase(
    V2_TOKENS_TO_TOKENS,
    'swapping tokenIn is set to "any" (using tokens)',
    { tokenIn: undefined },
  ),
  createTestCase(
    V3_TOKENS_TO_NATIVE,
    'swapping tokenOut is set to "any" (using ETH)',
    { tokenOut: undefined },
  ),
  createTestCase(
    V3_TOKENS_TO_TOKENS,
    'swapping tokenOut is set to "any" (using tokens)',
    { tokenOut: undefined },
  ),
  createTestCase(V3_TOKENS_TO_TOKENS, 'swapping tokens are set to "any/any', {
    tokenIn: undefined,
    tokenOut: undefined,
  }),
]

export const failingTestCases = [
  createTestCase(V3_NATIVE_TO_TOKENS, 'when chainId is incorrect', {
    chainId: 1,
  }),
  createTestCase(V3_TOKENS_TO_NATIVE, 'when contract address is incorrect', {
    contractAddress: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
  }),
  createTestCase(V3_TOKENS_TO_TOKENS, 'when tokenIn is incorrect', {
    tokenIn: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  }),
  createTestCase(V2_NATIVE_TO_TOKENS, 'when tokenOut is incorrect', {
    tokenOut: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  }),
  createTestCase(V2_TOKENS_TO_NATIVE, 'when amountIn is insufficient', {
    amountIn: GreaterThanOrEqual(parseEther('100000')),
  }),
  createTestCase(V2_TOKENS_TO_TOKENS, 'when amountOut is insufficient', {
    amountOut: GreaterThanOrEqual(parseEther('100000')),
  }),
]
