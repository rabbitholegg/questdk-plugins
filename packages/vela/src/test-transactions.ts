import {
  type OptionsActionParams,
  type StakeActionParams,
  GreaterThanOrEqual,
  LessThanOrEqual,
  OrderType,
} from '@rabbitholegg/questdk'
import { parseUnits, zeroAddress } from 'viem'
import {
  type TestParams,
  createTestCase,
  Chains,
} from '@rabbitholegg/questdk-plugin-utils'
import { VELA_CONTRACT, VLP_CONTRACT } from './contract-addresses'

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
    orderType: OrderType.Market,
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
    orderType: OrderType.Market,
  },
}

const LINK_STOP_MARKET: TestParams<OptionsActionParams> = {
  transaction: {
    chainId: 42161,
    to: '0xc4abade3a15064f9e3596943c699032748b13352',
    from: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    input:
      '0xdf33dc16002702000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a7fda314b1a74b2b5aa0000000000001da8ac8354dbce97db72c0000000000b870f0d0b7b6ecc05cb19a000000',
    value: '250000000000000',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    token: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4', // LINK (39)
    amount: GreaterThanOrEqual(parseUnits('37.5971', 18)),
    recipient: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    orderType: OrderType.Market,
  },
}

const BTC_LIMIT_ORDER: TestParams<OptionsActionParams> = {
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
    token: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f', // BTC (1)
    amount: GreaterThanOrEqual(parseUnits('20.315245', 18)),
    recipient: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    orderType: OrderType.Limit,
  },
}

const ETH_STOPLIMIT: TestParams<OptionsActionParams> = {
  transaction: {
    chainId: 42161,
    to: '0xc4abade3a15064f9e3596943c699032748b13352',
    from: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    input:
      '0xdf33dc16000283000000000000000000000000000000000000000000000000000000000000006cbaececab5863a0846a3000000000006cbaececab5863a0846a30000000000001809f2534742567c0fe5380000000000f0637740c89760d89ef43000000',
    value: '250000000000000',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    token: zeroAddress, // ETH (2)
    amount: GreaterThanOrEqual(parseUnits('22.0531', 18)),
    recipient: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    orderType: OrderType.Limit,
  },
}

export const STAKE_VLP: TestParams<StakeActionParams> = {
  transaction: {
    chainId: 42161,
    from: '0x786b201f4e0dbfbadd2f0ba89d8240591d25b2c7',
    hash: '0xb0fb54c8d145cdd5a49d64ce7f0e5547fa1a1cd618ae46d194e763a4a47592d0',
    input:
      '0x69a292bb000000000000000000000000000000000000000000000000520e3128d8375e00',
    to: '0x60b8c145235a31f1949a831803768bf37d7ab7aa',
    value: '0',
  },
  params: {
    chainId: 42161,
    tokenOne: VLP_CONTRACT,
    amountOne: GreaterThanOrEqual(parseUnits('5.91271741228', 18)),
  },
}

export const STAKE_VELA: TestParams<StakeActionParams> = {
  transaction: {
    chainId: 42161,
    from: '0xf4019ee39c7b6e0702dbe7c6c54ce0606b3b0f8f',
    hash: '0x05dc8fe5f5e000e395f89593d31745b00970c638127bbb79f339ab091de17b0d',
    input:
      '0x4159f57e000000000000000000000000000000000000000000000000553844909e362800',
    to: '0x60b8c145235a31f1949a831803768bf37d7ab7aa',
    value: '0',
  },
  params: {
    chainId: 42161,
    tokenOne: VELA_CONTRACT,
    amountOne: GreaterThanOrEqual(parseUnits('6.14073347984', 18)),
  },
}

const TPSL_ORDER: TestParams<OptionsActionParams> = {
  transaction: {
    chainId: 42161,
    to: '0xc4abade3a15064f9e3596943c699032748b13352',
    from: '0xe65c84603a376299410736c85e659fc2701bf4c3',
    hash: '0xa18ef3ec007d9427c93998676ee29757c58045dd6461e87dad0de49823e44357',
    input:
      '0x006c09e80000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000006e8c48715295a125105a91f5eb9500000000000000000000000000000000000000000000000000000000000000fa00000000000000000000000000000000000000fc6f7c40458122964d000000000000000000000000000000000000000000001a218a5ca731de148ef8800000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000006b06364b799877ed9bc768f8940a000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000061a8',
    value: '500000000000000',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    token: zeroAddress, // ETH (2)
    amount: GreaterThanOrEqual(parseUnits('0.1', 1)),
    recipient: '0xe65c84603a376299410736c85e659fc2701bf4c3',
    orderType: OrderType.Market,
  },
}

export const passingTestCasesOptions = [
  createTestCase(ARB_NEW_POSITION, 'when opening a new position'),
  createTestCase(ARB_MARKET_ORDER, 'when opening a market order'),
  createTestCase(LINK_STOP_MARKET, 'when opening a stop-market order'),
  createTestCase(BTC_LIMIT_ORDER, 'when opening a limit order'),
  createTestCase(ETH_STOPLIMIT, 'when opening a stop-limit order'),
  createTestCase(TPSL_ORDER, 'when opening a take-profit/stop-loss order'),
  createTestCase(ARB_MARKET_ORDER, 'when amount is exact', {
    amount: parseUnits('34.82474', 18),
  }),
  createTestCase(ARB_MARKET_ORDER, 'when using $lte operator', {
    amount: LessThanOrEqual(parseUnits('34.82474', 18)),
  }),
  createTestCase(ARB_NEW_POSITION, 'when amount is set to any', {
    amount: undefined,
  }),
  createTestCase(ARB_NEW_POSITION, 'when orderType is set to any', {
    orderType: undefined,
  }),
  createTestCase(ARB_NEW_POSITION, 'when recipient is set to any', {
    recipient: undefined,
  }),
  createTestCase(ARB_MARKET_ORDER, 'when token is set to any', {
    token: undefined,
  }),
  createTestCase(BTC_LIMIT_ORDER, 'when all parameters are set to any', {
    amount: undefined,
    orderType: undefined,
    recipient: undefined,
    token: undefined,
  }),
]

export const passingTestCasesStake = [
  createTestCase(STAKE_VLP, 'when staking vlp'),
  createTestCase(STAKE_VELA, 'when staking vela'),
]

export const failingTestCasesOptions = [
  createTestCase(ARB_NEW_POSITION, 'when chainId is not correct', {
    chainId: 10,
  }),
  createTestCase(ARB_NEW_POSITION, 'when token is not correct', {
    token: '0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978',
  }),
  createTestCase(ARB_NEW_POSITION, 'when amount is not sufficient', {
    amount: GreaterThanOrEqual(parseUnits('1000', 18)),
  }),
  createTestCase(
    ARB_MARKET_ORDER,
    'when using $gte and amount is off by 1 wei',
    {
      amount: GreaterThanOrEqual(parseUnits('34.824740000000000001', 18)),
    },
  ),
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
  createTestCase(ARB_NEW_POSITION, 'when orderType is not correct', {
    orderType: OrderType.Limit,
  }),
  createTestCase(TPSL_ORDER, 'when using TP/SL and token is not correct', {
    token: '0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978',
  }),
  createTestCase(TPSL_ORDER, 'when using TP/SL and amount is not correct', {
    amount: GreaterThanOrEqual(parseUnits('1000000', 18)),
  }),
  createTestCase(TPSL_ORDER, 'when using TP/SL and orderType is not correct', {
    orderType: OrderType.Limit,
  }),
]

export const failingTestCasesStake = [
  createTestCase(STAKE_VLP, 'when token is wrong', { tokenOne: zeroAddress }),
  createTestCase(STAKE_VELA, 'when amount is not enough', {
    amountOne: GreaterThanOrEqual(parseUnits('10000', 18)),
  }),
]
