import {
    type SwapActionParams,
    GreaterThanOrEqual,
    StakeActionParams,
    MintActionParams,
  } from '@rabbitholegg/questdk'
  import { parseUnits } from 'viem'
  import { type TestParams } from './utils'
import { VELA_CONTRACT, VLP_CONTRACT } from './contract-addresses'
  
  export const TRADE_VOLUME_FOR_ETH: TestParams<SwapActionParams> = {
    transaction: {
      chainId: 42161,
      from: '0x4e122c62742eb4811659f6d85fda51cc63764940',
      hash: '0x6f027f508d87a8cc8e5d43f8d22854277045afa02e6fab895bb9684ba9e2ee86',
      input: '0xdf33dc16000280000000000000000000000000000000000000000000000000000000000000006f231182e5d1cb57add20d092239000000000000000000000000000000fa000001f8def8808b02452c9a0000000000002d5c08538c7d343701d600000000',
      to: '0xc4abade3a15064f9e3596943c699032748b13352',
      value: '250000000000000',
    },
    params: {
        chainId: 42161,
        amountIn: '4417117661945960823958243751857296289568709742189047395304015503231549440',
        amountOut: '767039286784265043550941280406316641544635344583127390113772822081831162',
        deadline: '13611294676837538538534984297270728459160000000000000000000000000000000'
    },
  }
  
  export const TRADE_VOLUME_FOR_INJ: TestParams<SwapActionParams> = {
    transaction: {
      chainId: 42161,
      from: '0x4e122c62742eb4811659f6d85fda51cc63764940',
      hash: '0x5eccc436205c499443f24b7fb21cdcd552f5a266fd498bc6a6b1dcfa62b1fbaf',
      input: '0xdf33dc160028000000000000000000000000000000000000000000000000000000000000000001da42bae9bc785154837047cfe4000000000000000000000000000000fa000000fc6f7c40458122964d00000000000009dc5ada82b70b59df0200000000',
      to: '0xc4abade3a15064f9e3596943c699032748b13352',
      value: '250000000000000',
    },
    params: {
      chainId: 42161,
      amountIn: '70673882591135373183331900029716740633099355875024758324864248051704791040',
      amountOut: '12786042223041053092989985204273259065683439988259640452410480353345786',
      deadline: '6805647338418769269267492148635364229320000000000000000000000000000000'
    },
  }
  
  export const MINT_VLP: TestParams<SwapActionParams> = {
    transaction: {
      chainId: 42161,
      from: '0x786b201f4e0dbfbadd2f0ba89d8240591d25b2c7',
      hash: '0x0bd975155e6c0d9e46d8546462173805b3481969ea99a286897180483ea7f60f',
      input:
        '0xbf6eac2f000000000000000000000000786b201f4e0dbfbadd2f0ba89d8240591d25b2c7000000000000000000000000ff970a61a04b1ca14834a43f5de4533ebddb5cc800000000000000000000000000000000000000000000000000000000005d1fd2',
      to: '0xc4abade3a15064f9e3596943c699032748b13352',
      value: '0',
    },
    params: {
      chainId: 42161,
      tokenIn: VLP_CONTRACT,
      amountIn: GreaterThanOrEqual(parseUnits('6.102994', 6)),
      recipient: '0x786B201f4E0DBfBadd2F0BA89d8240591D25B2c7',
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