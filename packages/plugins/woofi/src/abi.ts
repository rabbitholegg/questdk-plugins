import { type Abi } from 'viem'

export const SWAP_ABI: Abi = [
  {
    inputs: [
      { internalType: 'address', name: 'approveTarget', type: 'address' },
      { internalType: 'address', name: 'swapTarget', type: 'address' },
      { internalType: 'address', name: 'fromToken', type: 'address' },
      { internalType: 'address', name: 'toToken', type: 'address' },
      { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'minToAmount', type: 'uint256' },
      { internalType: 'address payable', name: 'to', type: 'address' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'externalSwap',
    outputs: [
      { internalType: 'uint256', name: 'realToAmount', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'fromToken', type: 'address' },
      { internalType: 'address', name: 'toToken', type: 'address' },
      { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'minToAmount', type: 'uint256' },
      { internalType: 'address payable', name: 'to', type: 'address' },
      { internalType: 'address', name: 'rebateTo', type: 'address' },
    ],
    name: 'swap',
    outputs: [
      { internalType: 'uint256', name: 'realToAmount', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]
