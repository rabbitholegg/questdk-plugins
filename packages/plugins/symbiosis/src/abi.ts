export const metaRouteABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes', name: 'firstSwapCalldata', type: 'bytes' },
          {
            internalType: 'bytes',
            name: 'secondSwapCalldata',
            type: 'bytes',
          },
          {
            internalType: 'address[]',
            name: 'approvedTokens',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: 'firstDexRouter',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'secondDexRouter',
            type: 'address',
          },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bool', name: 'nativeIn', type: 'bool' },
          {
            internalType: 'address',
            name: 'relayRecipient',
            type: 'address',
          },
          { internalType: 'bytes', name: 'otherSideCalldata', type: 'bytes' },
        ],
        internalType: 'struct MetaRouteStructs.MetaRouteTransaction',
        name: '_metarouteTransaction',
        type: 'tuple',
      },
    ],
    name: 'metaRoute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const metaBurnABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'stableBridgingFee',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'bytes32', name: 'crossChainID', type: 'bytes32' },
          { internalType: 'address', name: 'syntCaller', type: 'address' },
          {
            internalType: 'address',
            name: 'finalReceiveSide',
            type: 'address',
          },
          { internalType: 'address', name: 'sToken', type: 'address' },
          { internalType: 'bytes', name: 'finalCallData', type: 'bytes' },
          { internalType: 'uint256', name: 'finalOffset', type: 'uint256' },
          { internalType: 'address', name: 'chain2address', type: 'address' },
          { internalType: 'address', name: 'receiveSide', type: 'address' },
          { internalType: 'address', name: 'oppositeBridge', type: 'address' },
          {
            internalType: 'address',
            name: 'revertableAddress',
            type: 'address',
          },
          { internalType: 'uint256', name: 'chainID', type: 'uint256' },
          { internalType: 'bytes32', name: 'clientID', type: 'bytes32' },
        ],
        internalType: 'struct MetaRouteStructs.MetaBurnTransaction',
        name: '_metaBurnTransaction',
        type: 'tuple',
      },
    ],
    name: 'metaBurnSyntheticToken',
    outputs: [{ internalType: 'bytes32', name: 'internalID', type: 'bytes32' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
