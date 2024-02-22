export const SYNAPSE_BRIDGE_FRAGMENTS = [
  // the bridge function for CCTP
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'chainId', type: 'uint256' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      {
        internalType: 'struct SwapQuery',
        name: 'originQuery',
        type: 'tuple',
        components: [
          { internalType: 'address', name: 'routerAdapter', type: 'address' },
          { internalType: 'address', name: 'tokenOut', type: 'address' },
          { internalType: 'uint256', name: 'minAmountOut', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'bytes', name: 'rawParams', type: 'bytes' },
        ],
      },
      {
        internalType: 'struct SwapQuery',
        name: 'destQuery',
        type: 'tuple',
        components: [
          { internalType: 'address', name: 'routerAdapter', type: 'address' },
          { internalType: 'address', name: 'tokenOut', type: 'address' },
          { internalType: 'uint256', name: 'minAmountOut', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'bytes', name: 'rawParams', type: 'bytes' },
        ],
      },
    ],
    name: 'bridge',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  //The bridge function for non-cctp
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'chainId', type: 'uint256' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      {
        internalType: 'struct SwapQuery',
        name: 'originQuery',
        type: 'tuple',
        components: [
          { internalType: 'address', name: 'swapAdapter', type: 'address' },
          { internalType: 'address', name: 'tokenOut', type: 'address' },
          { internalType: 'uint256', name: 'minAmountOut', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'bytes', name: 'rawParams', type: 'bytes' },
        ],
      },
      {
        internalType: 'struct SwapQuery',
        name: 'destQuery',
        type: 'tuple',
        components: [
          { internalType: 'address', name: 'swapAdapter', type: 'address' },
          { internalType: 'address', name: 'tokenOut', type: 'address' },
          { internalType: 'uint256', name: 'minAmountOut', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'bytes', name: 'rawParams', type: 'bytes' },
        ],
      },
    ],
    name: 'bridge',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const
