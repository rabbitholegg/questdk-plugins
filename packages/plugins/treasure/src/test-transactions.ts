import {
  type SwapActionParams,
  GreaterThanOrEqual,
  type MintActionParams,
  type StakeActionParams,
} from '@rabbitholegg/questdk'
import { parseUnits } from 'viem'
import {
  ANIMA,
  GFLY,
  MAGIC,
  MAGIC_STAKING,
  TREASURE_TAGS_PROXY,
} from './constants'
import { type TestParams, Chains, createTestCase } from './utils'

export const MINT_TREASURE_TAG: TestParams<MintActionParams> = {
  transaction: {
    chainId: Chains.ARBITRUM_ONE,
    from: '0x702c99051255ff9c621eddf5a752afef2f1ac14c',
    hash: '0x375e98904e78bbdde0e59cf7bb0158aa2c63a4f321182f43ada05d4839837a2e',
    input:
      '0x95f38e770000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000702c99051255ff9c621eddf5a752afef2f1ac14c000000000000000000000000ecdff76f3d9e130f795a68e50cdde5a11ec5542c00000000000000000000000000000000000000000e8a81453c23f19faf749b06000000000000000000000000000000000000000000000000000000000000000a63616666656d6f63686100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000434323836000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041b86733784462d0b6a679d1bd498b1a62b8250e1db37af0690c031959052dee64478635e23cfd305d8c4878fe6b19e20b124dfc46c44499971a839e9bf56af7b31b00000000000000000000000000000000000000000000000000000000000000',
    to: TREASURE_TAGS_PROXY,
    value: '0',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    contractAddress: TREASURE_TAGS_PROXY,
    recipient: '0x702c99051255ff9c621eddf5a752afef2f1ac14c',
  },
}

export const STAKE_MAGIC: TestParams<StakeActionParams> = {
  transaction: {
    chainId: Chains.ARBITRUM_ONE,
    from: '0x4ec63eefb25067d9ac0c54ca1d10f00930c599d9',
    hash: '0xeb43c2bdfa3ac3a13061dde88b098f7acf121848cd8fb5a5f0c7e18b1fa76c48',
    input:
      '0xb6b55f250000000000000000000000000000000000000000000000001bc16d674ec80000',
    to: MAGIC_STAKING,
    value: '0',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    contractAddress: MAGIC_STAKING,
    tokenOne: MAGIC,
    amountOne: '2000000000000000000',
  },
}

export const EXACT_TOKENS_FOR_TOKENS: TestParams<SwapActionParams> = {
  transaction: {
    chainId: Chains.ARBITRUM_ONE,
    from: '0x4c0ccf331fb23ca8bd5139b886cc821ede7b4204',
    hash: '0x8bf8405112a727937c67236c4972ca40e0c0f69d6eeadd60ce0e36649689096f',
    to: '0x23805449f91bb2d2054d9ba288fdc8f09b5eac79',
    input:
      '0x38ed173900000000000000000000000000000000000000000000000976a31864451380000000000000000000000000000000000000000000000000015ace3b39820c018a00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000004c0ccf331fb23ca8bd5139b886cc821ede7b420400000000000000000000000000000000000000000000000000000000657e5ed60000000000000000000000000000000000000000000000000000000000000002000000000000000000000000ccd05a0fcfc1380e9da27862adb2198e58e0d66f000000000000000000000000539bde0d7dbd336b79148aa742883198bbf60342',
    value: '0',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    tokenIn: ANIMA,
    tokenOut: MAGIC,
    amountIn: GreaterThanOrEqual(parseUnits('174.56', 18)),
    amountOut: GreaterThanOrEqual(parseUnits('24.98', 18)),
    recipient: '0x4c0ccf331fb23ca8bd5139b886cc821ede7b4204',
  },
}

export const TOKENS_FOR_EXACT_TOKENS: TestParams<SwapActionParams> = {
  transaction: {
    chainId: Chains.ARBITRUM_ONE,
    from: '0x76753c6b5c21dfa659a50fbd1cf385746b28515b',
    hash: '0xf72f2e47c9bc589d6bbc8824906fcece0ab244f266f758e2aa11bbea0326c080',
    to: '0x23805449f91bb2d2054d9ba288fdc8f09b5eac79',
    input:
      '0x8803dbee0000000000000000000000000000000000000000000000063bf212b431ec000000000000000000000000000000000000000000000000000105f69c25a0ea581800000000000000000000000000000000000000000000000000000000000000a000000000000000000000000076753c6b5c21dfa659a50fbd1cf385746b28515b00000000000000000000000000000000000000000000000000000000657d0d0d0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000539bde0d7dbd336b79148aa742883198bbf60342000000000000000000000000ccd05a0fcfc1380e9da27862adb2198e58e0d66f',
    value: '0',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    tokenIn: MAGIC,
    tokenOut: ANIMA,
    amountIn: GreaterThanOrEqual(parseUnits('18.5', 18)),
    amountOut: GreaterThanOrEqual(parseUnits('115', 18)),
    recipient: '0x76753c6b5c21dfa659a50fbd1cf385746b28515b',
  },
}

export const passingSwapTestCases = [
  createTestCase(
    EXACT_TOKENS_FOR_TOKENS,
    'when swapping exact tokens for tokens',
  ),
  createTestCase(
    TOKENS_FOR_EXACT_TOKENS,
    'when swapping tokens for exact tokens',
  ),
]

export const passingMintTestCases = [
  createTestCase(MINT_TREASURE_TAG, 'when minting a TreasureTag'),
  createTestCase(
    MINT_TREASURE_TAG,
    'when minting a TreasureTag without contractAddress',
    {
      contractAddress: undefined,
    },
  ),
]

export const passingStakeTestCases = [
  createTestCase(STAKE_MAGIC, 'when staking magic in the governance contract'),
  createTestCase(
    STAKE_MAGIC,
    'when staking magic in the governance contract without contractAddress',
    {
      contractAddress: undefined,
    },
  ),
]

export const failingSwapTestCases = [
  createTestCase(TOKENS_FOR_EXACT_TOKENS, 'when chainId is incorrect', {
    chainId: 10,
  }),
  createTestCase(EXACT_TOKENS_FOR_TOKENS, 'when contractAddress is incorrect', {
    contractAddress: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
  }),
  createTestCase(
    EXACT_TOKENS_FOR_TOKENS,
    'when contractAddress is another uniswap V2 fork',
    {
      contractAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      tokenIn: undefined,
      tokenOut: undefined,
      amountIn: undefined,
      amountOut: undefined,
      recipient: undefined,
    },
  ),
  createTestCase(TOKENS_FOR_EXACT_TOKENS, 'when tokenIn is incorrect', {
    tokenIn: GFLY,
  }),
  createTestCase(EXACT_TOKENS_FOR_TOKENS, 'when tokenOut is incorrect', {
    tokenOut: GFLY,
  }),
  createTestCase(EXACT_TOKENS_FOR_TOKENS, 'when amountIn is insufficient', {
    // should these amounts be hard-coded as values lower than the filters in the test params above?
    amountIn: GreaterThanOrEqual(parseUnits('1000000', 18)),
  }),
  createTestCase(TOKENS_FOR_EXACT_TOKENS, 'when amountOut is insufficient', {
    amountOut: GreaterThanOrEqual(parseUnits('54000000', 18)),
  }),
  createTestCase(EXACT_TOKENS_FOR_TOKENS, 'when recipient in incorrect', {
    recipient: '0x7a227272e5B583c2B51B04fF5cA4FDe498368b44',
  }),
]

export const failingMintTestCases = [
  createTestCase(MINT_TREASURE_TAG, 'when the chainId is incorrect', {
    chainId: Chains.ETHEREUM,
  }),
  createTestCase(MINT_TREASURE_TAG, 'when the contractAddress is incorrect', {
    contractAddress: MAGIC,
  }),
  createTestCase(MINT_TREASURE_TAG, 'when the recipient is incorrect', {
    recipient: '0x0A4066534E21dF54331EDcb65A2F41151eD20912',
  }),
]

export const failingStakeTestCases = [
  createTestCase(STAKE_MAGIC, 'when the chainId is incorrect', {
    chainId: Chains.ETHEREUM,
  }),
  createTestCase(STAKE_MAGIC, 'when the contractAddress is incorrect', {
    contractAddress: MAGIC,
  }),
  createTestCase(STAKE_MAGIC, 'when amountOne is incorrect', {
    amountOne: '1',
  }),
  createTestCase(STAKE_MAGIC, 'when amountOne is insufficient', {
    amountOne: GreaterThanOrEqual(4000000000000000000n),
  }),
]
