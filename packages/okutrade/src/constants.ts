import { Chains } from '@rabbitholegg/questdk-plugin-utils'

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
