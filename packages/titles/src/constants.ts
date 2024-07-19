export const TITLES_PUBLISHER_V1 = '0x04e4d53374a5e6259ce06cfc6850a839bd960d01'

export const TITLES_ABI_V1 = [
  {
    inputs: [
      { internalType: 'address', name: '_creator', type: 'address' },
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'string', name: '_symbol', type: 'string' },
      { internalType: 'string', name: '_uri', type: 'string' },
      {
        internalType: 'address[]',
        name: 'creatorProceedAccounts',
        type: 'address[]',
      },
      {
        internalType: 'uint32[]',
        name: 'creatorProceedAllocations',
        type: 'uint32[]',
      },
      {
        internalType: 'address[]',
        name: 'derivativeFeeAccounts',
        type: 'address[]',
      },
      {
        internalType: 'uint32[]',
        name: 'derivativeFeeAllocations',
        type: 'uint32[]',
      },
      { internalType: 'uint256', name: '_price', type: 'uint256' },
      { internalType: 'uint256', name: '_maxSupply', type: 'uint256' },
      { internalType: 'uint256', name: '_mintLimitPerWallet', type: 'uint256' },
      { internalType: 'uint256', name: '_saleEndTime', type: 'uint256' },
    ],
    name: 'publishEdition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const TITLES_COLLECTION_ABI_V2 = [
  {
    inputs: [
      { internalType: 'address', name: 'to_', type: 'address' },
      { internalType: 'uint256', name: 'tokenId_', type: 'uint256' },
      { internalType: 'uint256', name: 'amount_', type: 'uint256' },
      { internalType: 'address', name: 'referrer_', type: 'address' },
      { internalType: 'bytes', name: 'data_', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to_', type: 'address' },
      { internalType: 'uint256', name: 'tokenId_', type: 'uint256' },
      { internalType: 'uint256', name: 'amount_', type: 'uint256' },
      { internalType: 'address', name: 'referrer_', type: 'address' },
      { internalType: 'bytes', name: 'data_', type: 'bytes' },
      { internalType: 'string', name: 'comment_', type: 'string' },
    ],
    name: 'mintWithComment',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
