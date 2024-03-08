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
  {
    inputs: [
      { internalType: 'address', name: 'tokenRecipient', type: 'address' },
      { internalType: 'string', name: 'message', type: 'string' },
    ],
    name: 'purchase',
    outputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_ABI = [
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

export const GET_PRICE_ABI = [
  {
    inputs: [],
    name: 'price',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const GET_TREASURY_CONFIGURATION_ABI = [
  {
    inputs: [],
    name: 'treasuryConfiguration',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const GET_FEE_CONFIGURATION_ABI = [
  {
    inputs: [],
    name: 'feeConfiguration',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const GET_PLATFORM_FEE_ABI = [
  {
    inputs: [],
    name: 'flatFeeAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
