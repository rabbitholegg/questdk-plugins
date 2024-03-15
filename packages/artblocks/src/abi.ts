const PURCHASE_SET_PRICE_V5_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
    ],
    name: 'purchase',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

const PURCHASE_TO_SET_PRICE_V5_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_SET_PRICE_ERC20_V5 = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'maxPricePerToken',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'currencyAddress',
        type: 'address',
      },
    ],
    name: 'purchase',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const PURCHASE_TO_SET_PRICE_ERC20_V5 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'maxPricePerToken',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'currencyAddress',
        type: 'address',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const PURCHASE_SET_PRICE_MERKLE_V5 = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'purchase',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_TO_SET_PRICE_MERKLE_V5 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_TO_SET_PRICE_MERKLE_VAULT_V5 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
      {
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_SET_PRICE_HOLDER_V5 = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ownedNFTAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'ownedNFTTokenId',
        type: 'uint256',
      },
    ],
    name: 'purchase',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_TO_SET_PRICE_HOLDER_V5 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ownedNFTAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'ownedNFTTokenId',
        type: 'uint256',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_TO_SET_PRICE_HOLDER_VAULT_V5 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ownedNFTAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'ownedNFTTokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_SET_PRICE_V4 = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectId',
        type: 'uint256',
      },
    ],
    name: 'purchase',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_TO_SET_PRICE_V4 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_projectId',
        type: 'uint256',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_MERKLE_V5 = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: '_proof',
        type: 'bytes32[]',
      },
    ],
    name: 'purchase',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_TO_MERKLE_V5 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_projectId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: '_proof',
        type: 'bytes32[]',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_TO_MERKLE_VAULT_V5 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_projectId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: '_proof',
        type: 'bytes32[]',
      },
      {
        internalType: 'address',
        name: '_vault',
        type: 'address',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PURCHASE_SET_PRICE_POLYPTYCH_ERC20_V5 = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'maxPricePerToken',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'currencyAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ownedNFTAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'ownedNFTTokenId',
        type: 'uint256',
      },
    ],
    name: 'purchase',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const PURCHASE_TO_SET_PRICE_POLYPTYCH_ERC20_V5 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'maxPricePerToken',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'currencyAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ownedNFTAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'ownedNFTTokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const PURCHASE_TO_SET_PRICE_POLYPTYCH_ERC20_VAULT_V5 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'maxPricePerToken',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'currencyAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'ownedNFTAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'ownedNFTTokenId',
        type: 'uint256',
      },
    ],
    name: 'purchaseTo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const purchaseABISet = [
  PURCHASE_SET_PRICE_V5_ABI,
  PURCHASE_SET_PRICE_ERC20_V5,
  PURCHASE_SET_PRICE_MERKLE_V5,
  PURCHASE_SET_PRICE_HOLDER_V5,
  PURCHASE_SET_PRICE_V4,
  PURCHASE_MERKLE_V5,
  PURCHASE_SET_PRICE_POLYPTYCH_ERC20_V5,
]
export const purchaseToABISet = [
  PURCHASE_TO_SET_PRICE_V5_ABI,
  PURCHASE_TO_SET_PRICE_ERC20_V5,
  PURCHASE_TO_SET_PRICE_MERKLE_V5,
  PURCHASE_TO_SET_PRICE_MERKLE_VAULT_V5,
  PURCHASE_TO_SET_PRICE_HOLDER_V5,
  PURCHASE_TO_SET_PRICE_HOLDER_VAULT_V5,
  PURCHASE_TO_SET_PRICE_V4,
  PURCHASE_TO_MERKLE_V5,
  PURCHASE_TO_MERKLE_VAULT_V5,
  PURCHASE_TO_SET_PRICE_POLYPTYCH_ERC20_V5,
  PURCHASE_TO_SET_PRICE_POLYPTYCH_ERC20_VAULT_V5,
]
