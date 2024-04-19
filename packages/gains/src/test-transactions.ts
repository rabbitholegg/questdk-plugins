import { GNS_TRADING_DAI_CONTRACT, ETH, WBTC } from './constants'
import {
  GreaterThanOrEqual,
  type OptionsActionParams,
} from '@rabbitholegg/questdk'
import {
  OrderType,
  type TestParams,
  createTestCase,
} from '@rabbitholegg/questdk-plugin-utils'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

// https://arbiscan.io/tx/0xa02fc54900f4d70d70c226843e95d2aa1a87af5fdde70c377be9b5cbaea346cf
export const OPTIONS_DAI_ETH_TEST: TestParams<OptionsActionParams> = {
  transaction: {
    chainId: Chains.ARBITRUM_ONE,
    from: '0x37106760d6c250df1e366e0749c17ee14dc65652',
    hash: '0xa02fc54900f4d70d70c226843e95d2aa1a87af5fdde70c377be9b5cbaea346cf',
    input:
      '0xfb4b71bb00000000000000000000000037106760d6c250df1e366e0749c17ee14dc656520000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000878678326eac90000000000000000000000000000000000000000000000000000000001ff970d00a00000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000540000000000000000000000000000000000000000000000000000236673c1c1ed00000000000000000000000000000000000000000000000000001fefb233c0d80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000026be368000000000000000000000000000000000000000000000000000000000000000000',
    to: GNS_TRADING_DAI_CONTRACT,
    value: '0',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    contractAddress: GNS_TRADING_DAI_CONTRACT,
    token: ETH,
    amount: GreaterThanOrEqual(2500000000000000000000n),
    recipient: '0x37106760d6c250df1e366e0749c17ee14dc65652',
    orderType: OrderType.Market,
  },
}

// https://arbiscan.io/tx/0xabfe906d9eef7fdd4e659c0d6edbb388e7e69e3d56bc8dd97a455c526aa8055a
export const OPTIONS_DAI_WBTC_TEST: TestParams<OptionsActionParams> = {
  transaction: {
    chainId: Chains.ARBITRUM_ONE,
    from: '0x2241574d90d58c6d83aba4315e02e98e5668365a',
    hash: '0xabfe906d9eef7fdd4e659c0d6edbb388e7e69e3d56bc8dd97a455c526aa8055a',
    input:
      '0xfb4b71bb0000000000000000000000002241574d90d58c6d83aba4315e02e98e5668365a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a7669bd71326400000000000000000000000000000000000000000000000000000002302dfb3a88000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000000000000000000000000000002f216836c549d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000026be368000000000000000000000000000000000000000000000000000000000000000000',
    to: GNS_TRADING_DAI_CONTRACT,
    value: '0',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    contractAddress: GNS_TRADING_DAI_CONTRACT,
    token: WBTC,
    amount: GreaterThanOrEqual(193000000000000000000),
    recipient: '0x2241574d90d58c6D83Aba4315E02E98E5668365A',
    orderType: OrderType.Market,
  },
}

export const passingTestCases = [
  createTestCase(OPTIONS_DAI_ETH_TEST, 'when open trade for ETH'),
  createTestCase(OPTIONS_DAI_WBTC_TEST, 'when open trade for WBTC'),
]

export const failingTestCases = [
  createTestCase(OPTIONS_DAI_ETH_TEST, 'ETH when chainId is not correct', {
    chainId: 0,
  }),
  createTestCase(OPTIONS_DAI_ETH_TEST, 'ETH when token is not correct', {
    token: WBTC,
  }),
  createTestCase(OPTIONS_DAI_ETH_TEST, 'ETH when recipient is not correct', {
    recipient: '0x27106760d6c250df1e366e0749c17ee14dc65652',
  }),
  createTestCase(OPTIONS_DAI_ETH_TEST, 'ETH when orderType is not correct', {
    orderType: OrderType.Limit,
  }),
  createTestCase(OPTIONS_DAI_ETH_TEST, 'ETH when amount is not correct', {
    amount: 100000,
  }),
  createTestCase(OPTIONS_DAI_WBTC_TEST, 'WBTC when chainId is not correct', {
    chainId: 0,
  }),
  createTestCase(OPTIONS_DAI_WBTC_TEST, 'WBTC when token is not correct', {
    token: ETH,
  }),
  createTestCase(OPTIONS_DAI_WBTC_TEST, 'WBTC when recipient is not correct', {
    recipient: '0x27106760d6c250df1e366e0749c17ee14dc65652',
  }),
  createTestCase(OPTIONS_DAI_WBTC_TEST, 'WBTC when orderType is not correct', {
    orderType: OrderType.Limit,
  }),
  createTestCase(OPTIONS_DAI_WBTC_TEST, 'WBTC when amount is not correct', {
    amount: 100000,
  }),
]
