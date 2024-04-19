import {
  BASE_ERC20_BRIDGE_ADDRESS,
  BASE_ETH_BRIDGE_ADDRESS,
  ETH,
  ETHEREUM_ERC20_BRIDGE_ADDRESS,
  ETHEREUM_ETH_BRIDGE_ADDRESS,
} from './constants'
import { type BridgeActionParams } from '@rabbitholegg/questdk'
import {
  Chains,
  type TestParams,
  createTestCase,
} from '@rabbitholegg/questdk-plugin-utils'
import { parseEther } from 'viem'

// https://etherscan.io/tx/0x3a148cc42db82258a2470c9bbb190644e6a0c1424b4451c4c43e9ba428fce05f
export const ETH_FROM_ETHEREUM_TO_BASE_TEST: TestParams<BridgeActionParams> = {
  transaction: {
    chainId: Chains.ETHEREUM,
    from: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4',
    hash: '0x3a148cc42db82258a2470c9bbb190644e6a0c1424b4451c4c43e9ba428fce05f',
    input:
      '0xe9e05c42000000000000000000000000990d07a69f23d69618e3bb2444fa07f499193fe4000000000000000000000000000000000000000000000000001c6bf52634000000000000000000000000000000000000000000000000000000000000000186a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010100000000000000000000000000000000000000000000000000000000000000',
    to: ETHEREUM_ETH_BRIDGE_ADDRESS,
    value: parseEther('0.008').toString(),
  },
  params: {
    sourceChainId: Chains.ETHEREUM,
    destinationChainId: Chains.BASE,
    tokenAddress: ETH,
    contractAddress: ETHEREUM_ETH_BRIDGE_ADDRESS,
    amount: '8000000000000000',
    recipient: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4',
  },
}

// https://etherscan.io/tx/0xbe50c733cff2ad6255ce8145f42c3e9481872450912337a2094cf74b06ea79f9
export const ERC20_FROM_ETHEREUM_TO_BASE_TEST: TestParams<BridgeActionParams> =
  {
    transaction: {
      chainId: Chains.ETHEREUM,
      from: '0x12Ff4cD1C31E00cc8aD9eA04fccd8a3174F324dF',
      hash: '0xbe50c733cff2ad6255ce8145f42c3e9481872450912337a2094cf74b06ea79f9',
      input:
        '0x6fd3504e0000000000000000000000000000000000000000000000000000000005f5e100000000000000000000000000000000000000000000000000000000000000000400000000000000000000000020b8e3b9d7bdc85036853be1b7ab162abeea0ad9000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      to: ETHEREUM_ERC20_BRIDGE_ADDRESS,
      value: '0',
    },
    params: {
      sourceChainId: Chains.ETHEREUM,
      destinationChainId: Chains.BASE,
      tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      amount: '100000000',
      contractAddress: ETHEREUM_ERC20_BRIDGE_ADDRESS,
      recipient:
        '0x00000000000000000000000020b8e3b9d7bdc85036853be1b7ab162abeea0ad9',
    },
  }

// https://basescan.org/tx/0x88006277d2f4ed6173942a5d678fdac5379a9486436d780472db383df4a18702
export const ETH_FROM_BASE_TO_ETHEREUM_TEST: TestParams<BridgeActionParams> = {
  transaction: {
    chainId: Chains.BASE,
    from: '0xa904404fa0d65e6d4ab864b51b2ee26a513d7a29',
    hash: '0x88006277d2f4ed6173942a5d678fdac5379a9486436d780472db383df4a18702',
    input:
      '0xc2b3e5ac000000000000000000000000a904404fa0d65e6d4ab864b51b2ee26a513d7a2900000000000000000000000000000000000000000000000000000000000186a0000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010100000000000000000000000000000000000000000000000000000000000000',
    to: BASE_ETH_BRIDGE_ADDRESS,
    value: parseEther('0.11325').toString(),
  },
  params: {
    sourceChainId: Chains.BASE,
    destinationChainId: Chains.ETHEREUM,
    tokenAddress: ETH,
    contractAddress: BASE_ETH_BRIDGE_ADDRESS,
    amount: parseEther('0.11325').toString(),
    recipient: '0xa904404fa0d65e6d4ab864b51b2ee26a513d7a29',
  },
}

// https://basescan.org/tx/0xcff3aaccf625bf44d59834e02d5e2c10fb3c019f7afa72acf00e73d6e16e5778
export const ERC20_FROM_BASE_TO_ETHEREUM_TEST: TestParams<BridgeActionParams> =
  {
    transaction: {
      chainId: Chains.BASE,
      from: '0x1bd1bde0d6fd16de6a3146ea2c7d981ef96c223b',
      hash: '0xcff3aaccf625bf44d59834e02d5e2c10fb3c019f7afa72acf00e73d6e16e5778',
      input:
        '0x6fd3504e00000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000000000000000030000000000000000000000001bd1bde0d6fd16de6a3146ea2c7d981ef96c223b000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda02913',
      to: BASE_ERC20_BRIDGE_ADDRESS,
      value: '0',
    },
    params: {
      sourceChainId: Chains.BASE,
      destinationChainId: Chains.ETHEREUM,
      contractAddress: BASE_ERC20_BRIDGE_ADDRESS,
      tokenAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      amount: '1000000',
      recipient:
        '0x0000000000000000000000001bd1bde0d6fd16de6a3146ea2c7d981ef96c223b',
    },
  }

export const passingTestCases = [
  // eth from ethereum
  createTestCase(
    ETH_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge eth from ethereum to base',
  ),
  createTestCase(
    ETH_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge eth from ethereum to base, when contractAddress not defined',
    { contractAddress: undefined },
  ),
  createTestCase(
    ETH_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge eth from ethereum to base, when tokenAddress not defined',
    { tokenAddress: undefined },
  ),
  createTestCase(
    ETH_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge eth from ethereum to base, when tokenAddress and contractAddress not defined',
    { tokenAddress: undefined, contractAddress: undefined },
  ),
  createTestCase(
    ETH_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge eth from ethereum to base, when recipient not defined',
    { recipient: undefined },
  ),
  createTestCase(
    ETH_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge eth from ethereum to base, when amount not defined',
    { amount: undefined },
  ),
  // erc20 from ethereum
  createTestCase(
    ERC20_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge erc20 from ethereum to base',
  ),
  createTestCase(
    ERC20_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge erc20 from ethereum to base, when contractAddress not defined',
    { contractAddress: undefined },
  ),
  createTestCase(
    ERC20_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge erc20 from ethereum to base, when tokenAddress not defined',
    { tokenAddress: undefined },
  ),
  createTestCase(
    ERC20_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge erc20 from ethereum to base, when tokenAddress and contractAddress not defined',
    { tokenAddress: undefined, contractAddress: undefined },
  ),
  createTestCase(
    ERC20_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge erc20 from ethereum to base, when recipient not defined',
    { recipient: undefined },
  ),
  createTestCase(
    ERC20_FROM_ETHEREUM_TO_BASE_TEST,
    'bridge erc20 from ethereum to base, when amount not defined',
    { amount: undefined },
  ),
  // eth from base
  createTestCase(
    ETH_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge eth from base to ethereum',
  ),
  createTestCase(
    ETH_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge eth from base to ethereum, when contractAddress not defined',
    { contractAddress: undefined },
  ),
  createTestCase(
    ETH_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge eth from base to ethereum, when tokenAddress not defined',
    { tokenAddress: undefined },
  ),
  createTestCase(
    ETH_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge eth from base to ethereum, when tokenAddress and contractAddress not defined',
    { tokenAddress: undefined, contractAddress: undefined },
  ),
  createTestCase(
    ETH_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge eth from base to ethereum, when recipient not defined',
    { recipient: undefined },
  ),
  createTestCase(
    ETH_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge eth from base to ethereum, when amount not defined',
    { amount: undefined },
  ),
  // erc20 from base
  createTestCase(
    ERC20_FROM_BASE_TO_ETHEREUM_TEST,
    'when bridge erc20 from base to ethereum',
  ),
  createTestCase(
    ERC20_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge erc20 from base to ethereum, when contractAddress not defined',
    { contractAddress: undefined },
  ),
  createTestCase(
    ERC20_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge erc20 from base to ethereum, when tokenAddress not defined',
    { tokenAddress: undefined },
  ),
  createTestCase(
    ERC20_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge erc20 from base to ethereum, when tokenAddress and contractAddress not defined',
    { tokenAddress: undefined, contractAddress: undefined },
  ),
  createTestCase(
    ERC20_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge erc20 from base to ethereum, when recipient not defined',
    { recipient: undefined },
  ),
  createTestCase(
    ERC20_FROM_BASE_TO_ETHEREUM_TEST,
    'bridge erc20 from base to ethereum, when amount not defined',
    { amount: undefined },
  ),
]

export const failingTestCases = [
  // eth from ethereum
  createTestCase(
    ETH_FROM_ETHEREUM_TO_BASE_TEST,
    'eth from ethereum to base, when sourceChainId is not correct',
    {
      sourceChainId: 5,
    },
  ),
  createTestCase(
    ETH_FROM_ETHEREUM_TO_BASE_TEST,
    'eth from ethereum to base, when amount is not correct',
    {
      amount: '4000000',
    },
  ),
  createTestCase(
    ETH_FROM_ETHEREUM_TO_BASE_TEST,
    'eth from ethereum to base, when contractAddress is not correct',
    {
      contractAddress: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4',
    },
  ),
  // erc20 from ethereum
  createTestCase(
    ERC20_FROM_ETHEREUM_TO_BASE_TEST,
    'erc20 from ethereum to base, when sourceChainId is not correct',
    {
      sourceChainId: 5,
    },
  ),
  createTestCase(
    ERC20_FROM_ETHEREUM_TO_BASE_TEST,
    'erc20 from ethereum to base, when amount is not correct',
    {
      amount: '4000000',
    },
  ),
  createTestCase(
    ERC20_FROM_ETHEREUM_TO_BASE_TEST,
    'erc20 from ethereum to base, when tokenAddress is not correct',
    {
      tokenAddress: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4333',
    },
  ),
  createTestCase(
    ERC20_FROM_ETHEREUM_TO_BASE_TEST,
    'erc20 from ethereum to base, when contractAddress is not correct',
    {
      contractAddress: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4',
    },
  ),

  // eth from base
  createTestCase(
    ETH_FROM_BASE_TO_ETHEREUM_TEST,
    'eth from base to ethereum, when sourceChainId is not correct',
    {
      sourceChainId: 5,
    },
  ),
  createTestCase(
    ETH_FROM_BASE_TO_ETHEREUM_TEST,
    'eth from base to ethereum, when amount is not correct',
    {
      amount: '3333',
    },
  ),
  createTestCase(
    ETH_FROM_BASE_TO_ETHEREUM_TEST,
    'eth from base to ethereum, when contractAddress is not correct',
    {
      contractAddress: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4333',
    },
  ),
  // erc20 from base
  createTestCase(
    ERC20_FROM_BASE_TO_ETHEREUM_TEST,
    'erc20 from base to ethereum, when sourceChainId is not correct',
    {
      sourceChainId: 5,
    },
  ),
  createTestCase(
    ERC20_FROM_BASE_TO_ETHEREUM_TEST,
    'erc20 from base to ethereum, when amount is not correct',
    {
      amount: '3333',
    },
  ),
  createTestCase(
    ERC20_FROM_BASE_TO_ETHEREUM_TEST,
    'erc20 from base to ethereum, when tokenAddress is not correct',
    {
      tokenAddress: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4333',
    },
  ),
  createTestCase(
    ERC20_FROM_BASE_TO_ETHEREUM_TEST,
    'erc20 from base to ethereum, when contractAddress is not correct',
    {
      contractAddress: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4333',
    },
  ),
]
