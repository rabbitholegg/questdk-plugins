import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import type { Address } from 'viem'

export const CHAIN_ID_ARRAY = [
  Chains.ETHEREUM,
  Chains.OPTIMISM,
  Chains.ARBITRUM_ONE,
  Chains.POLYGON_POS,
  Chains.ZK_SYNC_ERA,
  Chains.BASE,
  Chains.BLAST,
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

export const LIMIT_ORDER_REGISTRY_ABI = [
  {
    inputs: [
      {
        internalType: 'contract UniswapV3Pool',
        name: 'pool',
        type: 'address',
      },
      {
        internalType: 'int24',
        name: 'targetTick',
        type: 'int24',
      },
      {
        internalType: 'bool',
        name: 'direction',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'cancelOrder',
    outputs: [
      {
        internalType: 'uint128',
        name: 'amount0',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'amount1',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'batchId',
        type: 'uint128',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'batchId',
        type: 'uint128',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'claimOrder',
    outputs: [
      {
        internalType: 'contract ERC20',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract UniswapV3Pool',
        name: 'pool',
        type: 'address',
      },
      {
        internalType: 'int24',
        name: 'targetTick',
        type: 'int24',
      },
      {
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
      {
        internalType: 'bool',
        name: 'direction',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'startingNode',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'newOrder',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const NFT_POSITION_MANAGER_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'token0', type: 'address' },
          { internalType: 'address', name: 'token1', type: 'address' },
          { internalType: 'uint24', name: 'fee', type: 'uint24' },
          { internalType: 'int24', name: 'tickLower', type: 'int24' },
          { internalType: 'int24', name: 'tickUpper', type: 'int24' },
          { internalType: 'uint256', name: 'amount0Desired', type: 'uint256' },
          { internalType: 'uint256', name: 'amount1Desired', type: 'uint256' },
          { internalType: 'uint256', name: 'amount0Min', type: 'uint256' },
          { internalType: 'uint256', name: 'amount1Min', type: 'uint256' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        internalType: 'struct INonfungiblePositionManager.MintParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'mint',
    outputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
      { internalType: 'uint256', name: 'amount0', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

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
