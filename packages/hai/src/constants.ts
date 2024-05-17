import { type AbiFunction, Address, getAbiItem } from 'viem'

export const BASIC_ACTIONS_CONTRACT =
  '0xd36b1bd5445374ceb7fe4148a719584234da7bb0'

const OP_TOKEN = '0x4200000000000000000000000000000000000042'
const STETH_TOKEN = '0x1f32b1c2345538c0c6f582fcb022739c4a194ebb'
const WETH_TOKEN = '0x4200000000000000000000000000000000000006'
const SNX_TOKEN = '0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4'
export const SUPPORTED_TOKEN_ARRAY: Address[] = [
  OP_TOKEN,
  STETH_TOKEN,
  WETH_TOKEN,
  SNX_TOKEN,
]

export const TOKEN_TO_COLLATERAL_JOIN_CONTRACT: Record<Address, Address> = {
  [OP_TOKEN]: '0x994fa61f9305bdd6e5e6ba84015ee28b109c827a',
  [STETH_TOKEN]: '0x77a82b65f8fa7da357a047b897c0339bd0b0b361',
  [WETH_TOKEN]: '0xbe57d71e81f83a536937f07e0b3f48dd6f55376b',
  [SNX_TOKEN]: '0xa24b2dff829cf0e0a60216b814169b54114f3f37',
}

export const HAI_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_manager', type: 'address' },
      { internalType: 'address', name: '_taxCollector', type: 'address' },
      { internalType: 'address', name: '_coinJoin', type: 'address' },
      { internalType: 'uint256', name: '_safeId', type: 'uint256' },
      { internalType: 'uint256', name: '_deltaWad', type: 'uint256' },
    ],
    name: 'generateDebt',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_manager', type: 'address' },
      { internalType: 'address', name: '_taxCollector', type: 'address' },
      { internalType: 'address', name: '_collateralJoin', type: 'address' },
      { internalType: 'address', name: '_coinJoin', type: 'address' },
      { internalType: 'bytes32', name: '_cType', type: 'bytes32' },
      { internalType: 'uint256', name: '_collateralAmount', type: 'uint256' },
      { internalType: 'uint256', name: '_deltaWad', type: 'uint256' },
    ],
    name: 'openLockTokenCollateralAndGenerateDebt',
    outputs: [{ internalType: 'uint256', name: '_safe', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const GENERATE_DEBT_FRAGMENT = getAbiItem({
  abi: HAI_ABI,
  name: 'generateDebt',
}) as AbiFunction
export const LOCK_AND_GENERATE_DEBT_FRAGMENT = getAbiItem({
  abi: HAI_ABI,
  name: 'openLockTokenCollateralAndGenerateDebt',
}) as AbiFunction

export const EXECUTE_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_target', type: 'address' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'execute',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'payable',
    type: 'function',
  },
]
