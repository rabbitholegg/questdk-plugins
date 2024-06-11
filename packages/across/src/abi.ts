export const ACROSS_BRIDGE_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'originToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'quoteTimestamp', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract SpokePoolInterface',
        name: 'spokePool',
        type: 'address',
      },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'originToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'quoteTimestamp', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const DEPOSIT_V3_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'inputToken', type: 'address' },
      { internalType: 'address', name: 'outputToken', type: 'address' },
      { internalType: 'uint256', name: 'inputAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'outputAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { internalType: 'address', name: 'exclusiveRelayer', type: 'address' },
      { internalType: 'uint32', name: 'quoteTimestamp', type: 'uint32' },
      { internalType: 'uint32', name: 'fillDeadline', type: 'uint32' },
      { internalType: 'uint32', name: 'exclusivityDeadline', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
    ],
    name: 'depositV3',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
