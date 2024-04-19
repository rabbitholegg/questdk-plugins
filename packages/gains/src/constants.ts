import { type Address, zeroAddress } from 'viem'

// https://arbiscan.io/address/0x2c7e82641f03fa077f88833213210a86027f15dc
export const GNS_TRADING_CONTRACT: Address =
  '0x2c7e82641f03fa077f88833213210a86027f15dc'
export const ETH: Address = zeroAddress
export const WBTC: Address = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'
const LINK: Address = '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4'
const AAVE: Address = '0xf329e36C7bF6E5E86ce2150875a84Ce77f477375'
const COMP: Address = '0x354A6dA3fcde098F8389cad84b0182725c6C91dE'
const UNI: Address = '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0'
const BAL: Address = '0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8'
const ARB: Address = '0x912CE59144191C1204E64559FE8253a0e49E6548'
const PEPE: Address = '0x42004200000000000000000000000000000006'

// https://github.com/GainsNetwork/gTrade-v6.1/blob/7803cc0a1d62c5b115c38b8e432a7436b51926d3/contracts/GNSTradingV6_1.sol#L127
export const MARKET_ORDER_TYPE = 0

export const tokenToId = {
  [WBTC]: 0,
  [ETH]: 1,
  [LINK]: 2,
  [AAVE]: 7,
  [COMP]: 10,
  [UNI]: 17,
  [ARB]: 109,
  [PEPE]: 134,
  [BAL]: 186,
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
