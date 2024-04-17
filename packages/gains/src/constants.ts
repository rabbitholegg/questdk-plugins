import { type Address, zeroAddress } from 'viem'

// https://arbiscan.io/address/0x2c7e82641f03fa077f88833213210a86027f15dc
export const DAI_CONTRACT_ADDRESS: Address =
  '0x2c7e82641f03fa077f88833213210a86027f15dc'

export const CONTRACTS: Address[] = [DAI_CONTRACT_ADDRESS]
export const WBTC: Address = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'
export const ETH: Address = zeroAddress
export const TOKENS: Address[] = [ETH, WBTC]

// https://github.com/GainsNetwork/gTrade-v6.1/blob/7803cc0a1d62c5b115c38b8e432a7436b51926d3/contracts/GNSTradingV6_1.sol#L127
export const MARKET_ORDER_TYPE = 0

// https://gains-network.gitbook.io/docs-home/gtrade-leveraged-trading/pair-list
export const BTC_USD_PAIR = 0
export const ETH_USD_PAIR = 1
export const PAIRS = [BTC_USD_PAIR, ETH_USD_PAIR]
export const TOKEN_PAIRS: Record<Address, number> = {
  [WBTC]: BTC_USD_PAIR,
  [ETH]: ETH_USD_PAIR,
}

// https://github.com/GainsNetwork/gTrade-v6.1/blob/7803cc0a1d62c5b115c38b8e432a7436b51926d3/contracts/GNSTradingV6_1.sol#L81
export const ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'trader', type: 'address' },
          { internalType: 'uint256', name: 'pairIndex', type: 'uint256' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
          { internalType: 'uint256', name: 'initialPosToken', type: 'uint256' },
          { internalType: 'uint256', name: 'positionSizeDai', type: 'uint256' },
          { internalType: 'uint256', name: 'openPrice', type: 'uint256' },
          { internalType: 'bool', name: 'buy', type: 'bool' },
          { internalType: 'uint256', name: 'leverage', type: 'uint256' },
          { internalType: 'uint256', name: 'tp', type: 'uint256' },
          { internalType: 'uint256', name: 'sl', type: 'uint256' },
        ],
        internalType: 'struct StorageInterfaceV5.Trade',
        name: 't',
        type: 'tuple',
      },
      {
        internalType: 'enum NftRewardsInterfaceV6.OpenLimitOrderType',
        name: '_type',
        type: 'uint8',
      },
      { internalType: 'uint256', name: '_slippageP', type: 'uint256' },
      { internalType: 'address', name: '_referral', type: 'address' },
    ],
    name: 'openTrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
