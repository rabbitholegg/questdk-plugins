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

export const INSTANCEID_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creatorContractAddress',
        type: 'address',
      },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'getClaimForToken',
    outputs: [
      { internalType: 'uint256', name: 'instanceId', type: 'uint256' },
      {
        components: [
          { internalType: 'uint32', name: 'total', type: 'uint32' },
          { internalType: 'uint32', name: 'totalMax', type: 'uint32' },
          { internalType: 'uint32', name: 'walletMax', type: 'uint32' },
          { internalType: 'uint48', name: 'startDate', type: 'uint48' },
          { internalType: 'uint48', name: 'endDate', type: 'uint48' },
          {
            internalType: 'enum ILazyPayableClaim.StorageProtocol',
            name: 'storageProtocol',
            type: 'uint8',
          },
          { internalType: 'bytes32', name: 'merkleRoot', type: 'bytes32' },
          { internalType: 'string', name: 'location', type: 'string' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'uint256', name: 'cost', type: 'uint256' },
          {
            internalType: 'address payable',
            name: 'paymentReceiver',
            type: 'address',
          },
          { internalType: 'address', name: 'erc20', type: 'address' },
          { internalType: 'address', name: 'signingAddress', type: 'address' },
        ],
        internalType: 'struct IERC1155LazyPayableClaim.Claim',
        name: 'claim',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
