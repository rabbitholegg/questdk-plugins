export const ERC1155_CONTRACT = '0x26bbea7803dcac346d5f5f135b57cf2c752a02be'
export const ERC721_CONTRACT = '0x23aa05a271debffaa3d75739af5581f744b326e4'

export const ABI_MINT = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creatorContractAddress',
        type: 'address',
      },
      { internalType: 'uint256', name: 'instanceId', type: 'uint256' },
      { internalType: 'uint32', name: 'mintIndex', type: 'uint32' },
      { internalType: 'bytes32[]', name: 'merkleProof', type: 'bytes32[]' },
      { internalType: 'address', name: 'mintFor', type: 'address' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const ABI_MULTI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creatorContractAddress',
        type: 'address',
      },
      { internalType: 'uint256', name: 'instanceId', type: 'uint256' },
      { internalType: 'uint16', name: 'mintCount', type: 'uint16' },
      { internalType: 'uint32[]', name: 'mintIndices', type: 'uint32[]' },
      {
        internalType: 'bytes32[][]',
        name: 'merkleProofs',
        type: 'bytes32[][]',
      },
      { internalType: 'address', name: 'mintFor', type: 'address' },
    ],
    name: 'mintBatch',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creatorContractAddress',
        type: 'address',
      },
      { internalType: 'uint256', name: 'instanceId', type: 'uint256' },
      { internalType: 'uint16', name: 'mintCount', type: 'uint16' },
      { internalType: 'uint32[]', name: 'mintIndices', type: 'uint32[]' },
      {
        internalType: 'bytes32[][]',
        name: 'merkleProofs',
        type: 'bytes32[][]',
      },
      { internalType: 'address', name: 'mintFor', type: 'address' },
    ],
    name: 'mintProxy',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creatorContractAddress',
        type: 'address',
      },
      { internalType: 'uint256', name: 'instanceId', type: 'uint256' },
      { internalType: 'uint16', name: 'mintCount', type: 'uint16' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      { internalType: 'bytes32', name: 'message', type: 'bytes32' },
      { internalType: 'bytes32', name: 'nonce', type: 'bytes32' },
      { internalType: 'address', name: 'mintFor', type: 'address' },
      { internalType: 'uint256', name: 'expiration', type: 'uint256' },
    ],
    name: 'mintSignature',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const ERC721_MINT_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creatorContractAddress',
        type: 'address',
      },
      { internalType: 'uint256', name: 'instanceId', type: 'uint256' },
      { internalType: 'uint32', name: 'mintIndex', type: 'uint32' },
      { internalType: 'bytes32[]', name: 'merkleProof', type: 'bytes32[]' },
      { internalType: 'address', name: 'mintFor', type: 'address' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
