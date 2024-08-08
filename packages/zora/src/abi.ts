export const ZORA_MINTER_ABI_721 = [
  // https://github.com/ourzora/zora-721-contracts/blob/main/src/ERC721Drop.sol#L384
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
    ],
    name: 'purchase',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  }, // ERC721Drop
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'comment',
        type: 'string',
      },
    ],
    name: 'purchaseWithComment',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  }, // ERC721Drop
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'comment',
        type: 'string',
      },
    ],
    name: 'purchaseWithRecipient',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  }, // ERC721Drop
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'comment',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'mintReferral',
        type: 'address',
      },
    ],
    name: 'mintWithRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  }, // ERC721Drop
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxQuantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'pricePerToken',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'merkleProof',
        type: 'bytes32[]',
      },
    ],
    name: 'purchasePresale',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  }, // ERC721Drop
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxQuantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'pricePerToken',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'merkleProof',
        type: 'bytes32[]',
      },
      {
        internalType: 'string',
        name: 'comment',
        type: 'string',
      },
    ],
    name: 'purchasePresaleWithComment',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  }, // ERC721Drop
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxQuantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'pricePerToken',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'merkleProof',
        type: 'bytes32[]',
      },
      {
        internalType: 'string',
        name: 'comment',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'mintReferral',
        type: 'address',
      },
    ],
    name: 'purchasePresaleWithRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  }, // ERC721Drop
  // https://github.com/ourzora/zora-protocol/blob/8d1fe9bdd79a552a8f74b4712451185f6aebf9a0/packages/1155-contracts/src/nft/ZoraCreator1155Impl.sol#L427
]

export const ZORA_MINTER_ABI_1155_LEGACY = [
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
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
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
  // https://github.com/soundxyz/sound-protocol/blob/0c29ae2f5ce2f27f3823cacf66b5180906070805/contracts/core/SoundEditionV1_2.sol#L274
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'uint256',
        name: 'fromTokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  }, // Legacy SoundEditionV1_2
  {
    inputs: [],
    name: 'nextTokenId',
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
]

export const UNIVERSAL_MINTER_ABI = [
  {
    inputs: [
      { internalType: 'address[]', name: '_targets', type: 'address[]' },
      { internalType: 'bytes[]', name: '_calldatas', type: 'bytes[]' },
      { internalType: 'uint256[]', name: '_values', type: 'uint256[]' },
    ],
    name: 'mintBatchWithoutFees',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] // universal batch mint

export const V2_MINT_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'mintTo',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'collection',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'mintReferral',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'comment',
        type: 'string',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const CREATE_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: 'string', name: 'newContractURI', type: 'string' },
      { internalType: 'string', name: 'name', type: 'string' },
      {
        components: [
          {
            internalType: 'uint32',
            name: 'royaltyMintSchedule',
            type: 'uint32',
          },
          { internalType: 'uint32', name: 'royaltyBPS', type: 'uint32' },
          {
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
        ],
        internalType: 'struct ICreatorRoyaltiesControl.RoyaltyConfiguration',
        name: 'defaultRoyaltyConfiguration',
        type: 'tuple',
      },
      {
        internalType: 'address payable',
        name: 'defaultAdmin',
        type: 'address',
      },
      { internalType: 'bytes[]', name: 'setupActions', type: 'bytes[]' },
    ],
    name: 'createContract',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const FUNCTION_SELECTORS = [
  '359f1302', // mint (1155)
  '731133e9', // mint (Legacy 1155)
  '9dbb844d', // mintWithRewards (1155)
  'efef39a1', // purchase (721)
  '45368181', // mintWithRewards (721)
]
