export const ZORA_MINTER_ABI_1155 = [
  {
    inputs: [
      {
        internalType: 'contract IMinter1155',
        name: 'minter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'rewardsRecipients',
        type: 'address[]',
      },
      {
        internalType: 'bytes',
        name: 'minterArguments',
        type: 'bytes',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  }, // ZoraCreator1155Impl
  {
    inputs: [
      {
        internalType: 'contract IMinter1155',
        name: 'minter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'minterArguments',
        type: 'bytes',
      },
      {
        internalType: 'address',
        name: 'mintReferral',
        type: 'address',
      },
    ],
    name: 'mintWithRewards',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  }, // ZoraCreator1155Impl,
]

export const FEES_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'tokenContract', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'sale',
    outputs: [
      {
        components: [
          { internalType: 'uint64', name: 'saleStart', type: 'uint64' },
          { internalType: 'uint64', name: 'saleEnd', type: 'uint64' },
          {
            internalType: 'uint64',
            name: 'maxTokensPerAddress',
            type: 'uint64',
          },
          { internalType: 'uint96', name: 'pricePerToken', type: 'uint96' },
          { internalType: 'address', name: 'fundsRecipient', type: 'address' },
        ],
        internalType: 'struct ZoraCreatorFixedPriceSaleStrategy.SalesConfig',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
]
