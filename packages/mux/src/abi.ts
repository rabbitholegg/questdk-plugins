export const GNS_ABI = [
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
        internalType: 'struct IGNSTradingStorage.Trade',
        name: 't',
        type: 'tuple',
      },
      {
        internalType: 'enum IGNSOracleRewards.OpenLimitOrderType',
        name: 'orderType',
        type: 'uint8',
      },
      { internalType: 'uint256', name: 'slippageP', type: 'uint256' },
      { internalType: 'address', name: 'referrer', type: 'address' },
    ],
    name: 'openTrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
