export const COLLECT_ENTRY_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'tokenRecipient', type: 'address' },
      { internalType: 'string', name: 'message', type: 'string' },
      { internalType: 'address', name: 'mintReferral', type: 'address' },
    ],
    name: 'purchase',
    outputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
]
