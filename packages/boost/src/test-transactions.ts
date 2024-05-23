import type {
  CompleteActionParams,
  MintActionParams,
} from '@rabbitholegg/questdk'
import {
  createTestCase,
  type TestParams,
  Chains,
  ActionType,
} from '@rabbitholegg/questdk-plugin-utils'

export const BOOST_PASS_MINT: TestParams<MintActionParams> = {
  transaction: {
    chainId: 11155111, // sepolia testnet
    to: '0x9a618d6302f27cdbb97206ce269a31c1f7da3913',
    from: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    hash: '0x3358d3f4b241be3e1c714d478a722885611f644c538d3b607fb45ba4e4f7aa1c',
    input:
      '0x6bc63893000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000411d54b3e05833422826560f4b81e97684da450eb7786f4b3a60e19d0e0b041c9e1e397fe301d06aaa0018d97aecbd2507d798a43b6f9a4865be4cfe1e68ffd5101c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000865c301c46d64de5c9b124ec1a97ef1efc1bcbd10000000000000000000000000000000000000000000000000000000000000000',
    value: '2000000000000000',
  },
  params: {
    chainId: 11155111, // sepolia testnet
    contractAddress: '0x9a618d6302f27cdbb97206ce269a31c1f7da3913',
    recipient: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
  },
}

export const COMPLETE_BOOST_MINT: TestParams<CompleteActionParams> = {
  transaction: {
    chainId: 10,
    from: '0xa99f898530df1514a566f1a6562d62809e99557d',
    to: '0x52629961f71c1c2564c5aa22372cb1b9fa9eba3e',
    hash: '0xd9b8f3cf9b0b972d08359cf9d2ec763216f45cae1bae41e125bc03d12b74eb7f',
    input:
      '0xa2e445930000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000007741a6f952d17ea6d90bee54f3162fc2d96abe847aabbdf55965496978eb9fd0ba10726bf45e2fd173074865a21b724074531f92d7b6462ff2a4269d8179c051ed1bc5fd717659d7a28702e79f02c315fa6d3f673dc73b730dc8bf0e5c6148cd0f001f5eaba33a796a4bc990d316b795020000f3002d2105000000000000000000',
    value: '75000000000000',
  },
  params: {
    chainId: '0xa',
    boostId: '5eaba33a-796a-4bc9-90d3-16b7950200f3',
    actionType: ActionType.Mint,
  },
}

export const passingTestCasesMint = [
  createTestCase(BOOST_PASS_MINT, 'when minting a boostpass'),
]

export const failingTestCasesMint = [
  createTestCase(BOOST_PASS_MINT, 'when chainId is not correct', {
    chainId: Chains.OPTIMISM,
  }),
  createTestCase(BOOST_PASS_MINT, 'when recipient is not correct', {
    recipient: '0x0487bc0f676433e1e245450a94ce1052758bd182',
  }),
]

export const passingTestCasesComplete = [
  createTestCase(COMPLETE_BOOST_MINT, 'when completing a boostpass'),
  createTestCase(COMPLETE_BOOST_MINT, 'when actionType is "any"', {
    actionType: undefined,
  }),
  createTestCase(COMPLETE_BOOST_MINT, 'when boostId is "any"', {
    boostId: undefined,
  }),
  createTestCase(COMPLETE_BOOST_MINT, 'when chain is "any"', {
    chainId: undefined,
  }),
  createTestCase(COMPLETE_BOOST_MINT, 'when actionType and boostId are "any"', {
    actionType: undefined,
    boostId: undefined,
  }),
]

export const failingTestCasesComplete = [
  createTestCase(COMPLETE_BOOST_MINT, 'when chainId is not correct', {
    chainId: '0x1',
  }),
  createTestCase(COMPLETE_BOOST_MINT, 'when actionType is not correct', {
    actionType: ActionType.Swap,
  }),
  createTestCase(COMPLETE_BOOST_MINT, 'when boostId is not correct', {
    boostId: '0x0487bc0f676433e1e245450a94ce1052758bd182',
  }),
]
