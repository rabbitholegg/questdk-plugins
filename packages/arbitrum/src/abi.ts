// https://github.com/OffchainLabs/token-bridge-contracts/blob/main/contracts/tokenbridge/ethereum/gateway/L1GatewayRouter.sol#L229
export const OUTBOUND_TRANSFER_L1_TO_L2 = [
  {
    inputs: [
      { internalType: 'address', name: '_token', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint256', name: '_maxGas', type: 'uint256' },
      { internalType: 'uint256', name: '_gasPriceBid', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'outboundTransfer',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const OUTBOUND_TRANSFER_L2_TO_L1 = [
  {
    inputs: [
      { internalType: 'address', name: '_l1Token', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'outboundTransfer',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const ARBSYS_WITHDRAW_ETH_FRAG = [
  {
    inputs: [{ internalType: 'address', name: 'destination', type: 'address' }],
    name: 'withdrawEth',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const INBOX_DEPOSIT_ETH_FRAG = [
  {
    inputs: [],
    name: 'depositEth',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
]
