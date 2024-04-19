import { type AbiFunction, getAbiItem } from "viem"

const STANDARD_BRIDGE_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_localToken', type: 'address' },
      { internalType: 'address', name: '_remoteToken', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint32', name: '_minGasLimit', type: 'uint32' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'bridgeERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_localToken', type: 'address' },
      { internalType: 'address', name: '_remoteToken', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint32', name: '_minGasLimit', type: 'uint32' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'bridgeERC20To',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: '_minGasLimit', type: 'uint32' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'bridgeETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint32', name: '_minGasLimit', type: 'uint32' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'bridgeETHTo',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_l1Token', type: 'address' },
      { internalType: 'address', name: '_l2Token', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint32', name: '_minGasLimit', type: 'uint32' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'depositERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_l1Token', type: 'address' },
      { internalType: 'address', name: '_l2Token', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint32', name: '_minGasLimit', type: 'uint32' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'depositERC20To',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: '_minGasLimit', type: 'uint32' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'depositETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint32', name: '_minGasLimit', type: 'uint32' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'depositETHTo',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_l2Token', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint32', name: '_minGasLimit', type: 'uint32' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_l2Token', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint32', name: '_minGasLimit', type: 'uint32' },
      { internalType: 'bytes', name: '_extraData', type: 'bytes' },
    ],
    name: 'withdrawTo',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const BRIDGE_ERC20_FRAGMENT = getAbiItem({
  abi: STANDARD_BRIDGE_ABI,
  name: 'bridgeERC20',
}) as AbiFunction
export const BRIDGE_ERC20_TO_FRAGMENT = getAbiItem({
  abi: STANDARD_BRIDGE_ABI,
  name: 'bridgeERC20To',
}) as AbiFunction
export const BRIDGE_ETH_FRAGMENT = getAbiItem({
  abi: STANDARD_BRIDGE_ABI,
  name: 'bridgeETH',
}) as AbiFunction
export const BRIDGE_ETH_TO_FRAGMENT = getAbiItem({
  abi: STANDARD_BRIDGE_ABI,
  name: 'bridgeETHTo',
}) as AbiFunction
export const DEPOSIT_ERC20_FRAGMENT = getAbiItem({
  abi: STANDARD_BRIDGE_ABI,
  name: 'depositERC20',
}) as AbiFunction
export const DEPOSIT_ERC20_TO_FRAGMENT = getAbiItem({
  abi: STANDARD_BRIDGE_ABI,
  name: 'depositERC20To',
}) as AbiFunction
export const DEPOSIT_ETH_FRAGMENT = getAbiItem({
  abi: STANDARD_BRIDGE_ABI,
  name: 'depositETH',
}) as AbiFunction
export const DEPOSIT_ETH_TO_FRAGMENT = getAbiItem({
  abi: STANDARD_BRIDGE_ABI,
  name: 'depositETHTo',
}) as AbiFunction
export const WITHDRAW_FRAGMENT = getAbiItem({
  abi: STANDARD_BRIDGE_ABI,
  name: 'withdraw',
}) as AbiFunction
export const WITHDRAW_TO_FRAGMENT = getAbiItem({
  abi: STANDARD_BRIDGE_ABI,
  name: 'withdrawTo',
}) as AbiFunction
