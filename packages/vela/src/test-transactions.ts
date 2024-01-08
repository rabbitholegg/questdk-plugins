import {
  type OptionsActionParams,
  GreaterThanOrEqual,
  LessThanOrEqual,
} from '@rabbitholegg/questdk'
import { parseUnits } from 'viem'
import { type TestParams, createTestCase, Chains } from './utils'

const ARB_NEW_POSITION: TestParams<OptionsActionParams> = {
  transaction: {
    chainId: 42161,
    to: '0xc4abade3a15064f9e3596943c699032748b13352',
    from: '0xa99f898530df1514a566f1a6562d62809e99557d',
    input:
      '0xdf33dc1600078000000000000000000000000000000000000000000000000000000000000000000eb54e87e885085e71a9fa3fc5000000000000000000000000000000fa0000011436ebb5ae615652af8200000000000aca253518cfcd5f3adb14000000',
    value: '250000000000000',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    token: '0x912CE59144191C1204E64559FE8253a0e49E6548', // ARB (7)
    amount: GreaterThanOrEqual(parseUnits('21.88', 18)),
    recipient: '0xa99f898530df1514a566f1a6562d62809e99557d',
    orderType: 'market'
  },
}

const ARB_MARKET_ORDER: TestParams<OptionsActionParams> = {
  transaction: {
    chainId: 42161,
    to: '0xc4abade3a15064f9e3596943c699032748b13352',
    from: '0x21fa21343d58d37d3d1856921279726a32e5fdb3',
    hash: '0x7e7912f9abd63dbf91772cf0e9098c797fae6cf3492dddc527d45e3640d08baf',
    input:
      '0xdf33dc160007800000000000000000000000000000000000000000000000000000000000000000184e8d481bf3ec92e95dbe80d6000000000000000000000000000000fa000001b78ccdc3e4246cbc0ca4000000000050b2d9c6f6e2aff686521c000000',
    value: '250000000000000',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    token: '0x912CE59144191C1204E64559FE8253a0e49E6548', // ARB (7)
    amount: GreaterThanOrEqual(parseUnits('34.82474', 18)),
    recipient: '0x21fa21343d58d37d3d1856921279726a32e5fdb3',
    orderType: 'market'
  },
}

const BTC_MARKET_ORDER: TestParams<OptionsActionParams> = {
  transaction: {
    chainId: 42161,
    to: '0xc4abade3a15064f9e3596943c699032748b13352',
    from: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    input:
      '0xdf33dc16000181000000000000000000000000000000000000000000000000000000000000086ad48c0cb8d234a8a0783000000000000000000000000000000000000000000001006a18cda2c39a80a98d00000000000a0424f8085ba409069f82000000',
    value: '250000000000000',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    token: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f', // ARB BTC (1)
    amount: GreaterThanOrEqual(parseUnits('20.315245', 18)),
    recipient: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    orderType: 'limit'
  },
}

export const passingTestCases = [
  createTestCase(ARB_NEW_POSITION, 'when opening a new position'),
  createTestCase(ARB_MARKET_ORDER, 'when opening a new position'),
  createTestCase(BTC_MARKET_ORDER, 'when opening a market order'),
  createTestCase(ARB_MARKET_ORDER, 'when amount is exact', {
    amount: parseUnits('34.82474', 18),
  }),
  createTestCase(ARB_MARKET_ORDER, 'when using $lte operator', {
    amount: LessThanOrEqual(parseUnits('34.82474', 18)),
  }),
]

export const failingTestCases = [
  createTestCase(ARB_NEW_POSITION, 'when chainId is not correct', {
    chainId: 10,
  }),
  createTestCase(ARB_NEW_POSITION, 'when token is not correct', {
    token: '0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978',
  }),
  createTestCase(ARB_NEW_POSITION, 'when amount is not sufficient', {
    amount: GreaterThanOrEqual(parseUnits('1000', 18)),
  }),
  createTestCase(ARB_MARKET_ORDER, 'when using $gte and amount is off by 1 wei', {
    amount: GreaterThanOrEqual(parseUnits('34.824740000000000001', 18)),
  }),
  createTestCase(ARB_MARKET_ORDER, 'when exact amount is off by 1 wei', {
    amount: parseUnits('34.824740000000000001', 18),
  }),
  createTestCase(
    ARB_MARKET_ORDER,
    'when using $lte operator and off by 1 wei',
    {
      amount: LessThanOrEqual(parseUnits('34.824739999999999999', 18)),
    },
  ),
  createTestCase(ARB_NEW_POSITION, 'when recipient is not correct', {
    recipient: '0x512daa85f8d2c863d0cfc8f65ab7842629d409f6',
  }),
]
