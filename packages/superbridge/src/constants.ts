import {
  CHAIN_TO_TOKENS as DEFAULT_TOKENS,
  Chains,
} from '@rabbitholegg/questdk-plugin-utils'
import { type AbiFunction, type Address, getAbiItem } from 'viem'

export const mainToL2BridgeContract: Record<number, string> = {
  [Chains.BASE]: '0x3154cf16ccdb4c6d922629664174b904d80f2c35',
}

export const l2ToMainBridgeContract: Record<number, string> = {
  [Chains.BASE]: '0x4200000000000000000000000000000000000010',
}

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

const chainToCircleUSDCAddress: Record<number, string> = {
  [Chains.BASE]: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
  [Chains.ETHEREUM]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
}

export const CHAIN_TO_TOKENS: Record<number, Address[]> = {
  [Chains.BASE]: [
    ...(DEFAULT_TOKENS[Chains.BASE]?.filter(
      (token) => token !== chainToCircleUSDCAddress[Chains.BASE],
    ) as Address[]),
    '0x04d1963c76eb1bec59d0eeb249ed86f736b82993', // SOFT
  ],
  [Chains.ETHEREUM]: [
    ...(DEFAULT_TOKENS[Chains.ETHEREUM]?.filter(
      (token) => token !== chainToCircleUSDCAddress[Chains.ETHEREUM],
    ) as Address[]),
    '0xfe3b138879d6d0555be4132dcfe6e7424e257a2e', // SOFT
  ],
}
