import { type MintActionParams } from '@rabbitholegg/questdk'
import {
  createTestCase,
  type TestParams,
  Chains,
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

export const passingTestCases = [
  createTestCase(BOOST_PASS_MINT, 'when minting a boostpass'),
]

export const failingTestCases = [
  createTestCase(BOOST_PASS_MINT, 'when chainId is not correct', {
    chainId: Chains.OPTIMISM,
  }),
  createTestCase(BOOST_PASS_MINT, 'when recipient is not correct', {
    recipient: '0x0487bc0f676433e1e245450a94ce1052758bd182',
  }),
]
