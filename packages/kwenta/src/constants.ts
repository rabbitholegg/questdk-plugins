import { type Address } from 'viem'

// https://docs.kwenta.io/developers/deployed-contracts
export const SMART_MARGIN_V3: Address =
  '0xe331a7eec851ba702aa8bf43070a178451d6d28e'
export const ETH_PERPS_MARKET_ID = 100
export const WETH: Address = '0x4200000000000000000000000000000000000006'

export const TOKEN_TO_MARKET: Record<Address, number> = {
  [WETH]: ETH_PERPS_MARKET_ID,
}

// https://basescan.org/address/0xe331a7eec851ba702aa8bf43070a178451d6d28e#code
export const SMART_MARGIN_V3_COMMIT_ORDER_ABI = [
  {
    inputs: [
      { internalType: 'uint128', name: '_perpsMarketId', type: 'uint128' },
      { internalType: 'uint128', name: '_accountId', type: 'uint128' },
      { internalType: 'int128', name: '_sizeDelta', type: 'int128' },
      {
        internalType: 'uint128',
        name: '_settlementStrategyId',
        type: 'uint128',
      },
      { internalType: 'uint256', name: '_acceptablePrice', type: 'uint256' },
      { internalType: 'bytes32', name: '_trackingCode', type: 'bytes32' },
      { internalType: 'address', name: '_referrer', type: 'address' },
    ],
    name: 'commitOrder',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'settlementTime', type: 'uint256' },
          {
            components: [
              { internalType: 'uint128', name: 'marketId', type: 'uint128' },
              { internalType: 'uint128', name: 'accountId', type: 'uint128' },
              { internalType: 'int128', name: 'sizeDelta', type: 'int128' },
              {
                internalType: 'uint128',
                name: 'settlementStrategyId',
                type: 'uint128',
              },
              {
                internalType: 'uint256',
                name: 'acceptablePrice',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'trackingCode',
                type: 'bytes32',
              },
              { internalType: 'address', name: 'referrer', type: 'address' },
            ],
            internalType: 'struct IPerpsMarketProxy.OrderCommitmentRequest',
            name: 'request',
            type: 'tuple',
          },
        ],
        internalType: 'struct IPerpsMarketProxy.Data',
        name: 'retOrder',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]
