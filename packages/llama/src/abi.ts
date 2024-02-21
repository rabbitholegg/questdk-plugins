export const LLAMA_ABI_CAST_APPROVE = [
  {
    inputs: [
      { internalType: 'uint8', name: 'role', type: 'uint8' },
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'creator', type: 'address' },
          { internalType: 'uint8', name: 'creatorRole', type: 'uint8' },
          {
            internalType: 'contract ILlamaStrategy',
            name: 'strategy',
            type: 'address',
          },
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct ActionInfo',
        name: 'actionInfo',
        type: 'tuple',
      },
      { internalType: 'string', name: 'reason', type: 'string' },
    ],
    name: 'castApproval',
    outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'policyholder', type: 'address' },
      { internalType: 'uint8', name: 'role', type: 'uint8' },
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'creator', type: 'address' },
          { internalType: 'uint8', name: 'creatorRole', type: 'uint8' },
          {
            internalType: 'contract ILlamaStrategy',
            name: 'strategy',
            type: 'address',
          },
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct ActionInfo',
        name: 'actionInfo',
        type: 'tuple',
      },
      { internalType: 'string', name: 'reason', type: 'string' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' },
    ],
    name: 'castApprovalBySig',
    outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const LLAMA_ABI_CAST_DISAPPROVE = [
  {
    inputs: [
      { internalType: 'uint8', name: 'role', type: 'uint8' },
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'creator', type: 'address' },
          { internalType: 'uint8', name: 'creatorRole', type: 'uint8' },
          {
            internalType: 'contract ILlamaStrategy',
            name: 'strategy',
            type: 'address',
          },
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct ActionInfo',
        name: 'actionInfo',
        type: 'tuple',
      },
      { internalType: 'string', name: 'reason', type: 'string' },
    ],
    name: 'castDisapproval',
    outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'policyholder', type: 'address' },
      { internalType: 'uint8', name: 'role', type: 'uint8' },
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'creator', type: 'address' },
          { internalType: 'uint8', name: 'creatorRole', type: 'uint8' },
          {
            internalType: 'contract ILlamaStrategy',
            name: 'strategy',
            type: 'address',
          },
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct ActionInfo',
        name: 'actionInfo',
        type: 'tuple',
      },
      { internalType: 'string', name: 'reason', type: 'string' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' },
    ],
    name: 'castDisapprovalBySig',
    outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
