import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import type { Address } from 'viem'

export const CHAIN_ID_ARRAY = [
  Chains.ETHEREUM,
  Chains.OPTIMISM,
  Chains.ARBITRUM_ONE,
  Chains.POLYGON_POS,
  Chains.ZK_SYNC_ERA,
  Chains.BASE,
] as number[]

/* 
  Command param type definitions:
  https://github.com/Uniswap/universal-router-sdk/blob/6ec60ce9ff2853e236ba8f40a3aaa8819a97bd8b/src/utils/routerCommands.ts#L74
*/
export const V3_SWAP_EXACT_TYPES = [
  'address recipient',
  'uint256 amountIn',
  'uint256 amountOut',
  'bytes path',
  'bool payerIsUser',
]

export const V2_SWAP_EXACT_TYPES = [
  'address recipient',
  'uint256 amountIn',
  'uint256 amountOut',
  'address[] path',
  'bool payerIsUser',
]

export const EXECUTE_ABI_FRAGMENTS = [
  {
    inputs: [
      { internalType: 'bytes', name: 'commands', type: 'bytes' },
      { internalType: 'bytes[]', name: 'inputs', type: 'bytes[]' },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes', name: 'commands', type: 'bytes' },
      { internalType: 'bytes[]', name: 'inputs', type: 'bytes[]' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const LIMIT_ORDER_REGISTRY_ABI = [{}]

export const LIMIT_ORDER_REGISTRY_CONTRACT: {
  [chainId: number]: Address | undefined
} = {
  [Chains.ETHEREUM]: '0x54dF9e11c7933a9cA3BD1E540B63dA15edAe40bf',
  [Chains.OPTIMISM]: '0x54dF9e11c7933a9cA3BD1E540B63dA15edAe40bf',
  [Chains.ARBITRUM_ONE]: '0x54dF9e11c7933a9cA3BD1E540B63dA15edAe40bf',
  [Chains.POLYGON_POS]: '0x54dF9e11c7933a9cA3BD1E540B63dA15edAe40bf',
  [Chains.ZK_SYNC_ERA]: '0x0FD66bD1e0974e2535CB424E6675D60aC52a84Fa',
  [Chains.BASE]: '0xff8b754c64e9a8473bd6e1118d0eac67f0a8ae27',
}
