import { type Address, zeroAddress } from 'viem'

export const ETH = zeroAddress
//
// Ethereum
//
export const ETHEREUM_ETH_BRIDGE_ADDRESS: Address =
  '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e'
export const ETHEREUM_ERC20_BRIDGE_ADDRESS: Address =
  '0xBd3fa81B58Ba92a82136038B25aDec7066af3155'
export const ethereumContracts: Address[] = [
  ETHEREUM_ETH_BRIDGE_ADDRESS,
  ETHEREUM_ERC20_BRIDGE_ADDRESS,
]

// https://etherscan.io/address/0x5fb30336a8d0841cf15d452afa297cb6d10877d7#code
export const ETHEREUM_ETH_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_value', type: 'uint256' },
      { internalType: 'uint64', name: '_gasLimit', type: 'uint64' },
      { internalType: 'bool', name: '_isCreation', type: 'bool' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'depositTransaction',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

// https://etherscan.io/address/0xbd3fa81b58ba92a82136038b25adec7066af3155#code
export const ETHEREUM_ERC20_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint32', name: 'destinationDomain', type: 'uint32' },
      { internalType: 'bytes32', name: 'mintRecipient', type: 'bytes32' },
      { internalType: 'address', name: 'burnToken', type: 'address' },
    ],
    name: 'depositForBurn',
    outputs: [{ internalType: 'uint64', name: '_nonce', type: 'uint64' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

//
// Base
//
export const BASE_ETH_BRIDGE_ADDRESS: Address =
  '0x4200000000000000000000000000000000000016'
export const BASE_ERC20_BRIDGE_ADDRESS: Address =
  '0x1682Ae6375C4E4A97e4B583BC394c861A46D8962'
export const baseContracts: Address[] = [
  BASE_ETH_BRIDGE_ADDRESS,
  BASE_ERC20_BRIDGE_ADDRESS,
]

// https://basescan.org/address/0xc0d3c0d3c0d3c0d3c0d3c0d3c0d3c0d3c0d30016#code
export const BASE_ETH_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_target', type: 'address' },
      { internalType: 'uint256', name: '_gasLimit', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'initiateWithdrawal',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

// https://basescan.org/address/0x1682ae6375c4e4a97e4b583bc394c861a46d8962#code
export const BASE_ERC20_ABI = ETHEREUM_ERC20_ABI
