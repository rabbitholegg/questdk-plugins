const ZORA_MINTER_ABI = [
  // https://github.com/ourzora/zora-721-contracts/blob/main/src/ERC721Drop.sol#L384
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "name": "purchase",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },  // ERC721Drop
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "comment",
        "type": "string"
      }
    ],
    "name": "purchaseWithComment",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }, // ERC721Drop
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "comment",
        "type": "string"
      }
    ],
    "name": "purchaseWithRecipient",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }, // ERC721Drop
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "comment",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "mintReferral",
        "type": "address"
      }
    ],
    "name": "mintWithRewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }, // ERC721Drop
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxQuantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pricePerToken",
        "type": "uint256"
      },
      {
        "internalType": "bytes32[]",
        "name": "merkleProof",
        "type": "bytes32[]"
      }
    ],
    "name": "purchasePresale",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }, // ERC721Drop
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxQuantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pricePerToken",
        "type": "uint256"
      },
      {
        "internalType": "bytes32[]",
        "name": "merkleProof",
        "type": "bytes32[]"
      },
      {
        "internalType": "string",
        "name": "comment",
        "type": "string"
      }
    ],
    "name": "purchasePresaleWithComment",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }, // ERC721Drop
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxQuantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pricePerToken",
        "type": "uint256"
      },
      {
        "internalType": "bytes32[]",
        "name": "merkleProof",
        "type": "bytes32[]"
      },
      {
        "internalType": "string",
        "name": "comment",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "mintReferral",
        "type": "address"
      }
    ],
    "name": "purchasePresaleWithRewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }, // ERC721Drop
  // https://github.com/ourzora/zora-protocol/blob/8d1fe9bdd79a552a8f74b4712451185f6aebf9a0/packages/1155-contracts/src/nft/ZoraCreator1155Impl.sol#L427
  {
    "inputs": [
      {
        "internalType": "contract IMinter1155",
        "name": "minter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "minterArguments",
        "type": "bytes"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }, // ZoraCreator1155Impl
  {
    "inputs": [
      {
        "internalType": "contract IMinter1155",
        "name": "minter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "minterArguments",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "mintReferral",
        "type": "address"
      }
    ],
    "name": "mintWithRewards",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  } // ZoraCreator1155Impl
]