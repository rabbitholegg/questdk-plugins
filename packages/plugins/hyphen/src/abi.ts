import { type Abi } from 'viem'

export const ABI: Abi = [
  {
    inputs: [
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint256', name: 'toChainId', type: 'uint256' },
      { internalType: 'string', name: 'tag', type: 'string' },
    ],
    name: 'depositNative',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'toChainId', type: 'uint256' },
      { internalType: 'address', name: 'tokenAddress', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'string', name: 'tag', type: 'string' },
    ],
    name: 'depositErc20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenAddress', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint256', name: 'toChainId', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'string', name: 'tag', type: 'string' },
      {
        components: [
          { internalType: 'address', name: 'tokenAddress', type: 'address' },
          { internalType: 'uint256', name: 'percentage', type: 'uint256' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          {
            internalType: 'enum SwapOperation',
            name: 'operation',
            type: 'uint8',
          },
          { internalType: 'bytes', name: 'path', type: 'bytes' },
        ],
        internalType: 'struct SwapRequest[]',
        name: 'swapRequest',
        type: 'tuple[]',
      },
    ],
    name: 'depositAndSwapErc20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
