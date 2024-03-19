import { Address, Hash } from 'viem'

export type Actions =
  | 'mint'
  | 'swap'
  | 'stake'
  | 'bridge'
  | 'burn'
  | 'vote'
  | 'delegate'
  | 'options'
  | 'propose'
  | 'proposeWithoutProof'

export type BuilderParams = {
  projectName: string
  chains: string[]
  tx: TransactionDetail[]
  actionType: Actions
  publish: boolean
}

export interface Transaction {
  chainId: number
  from: Address
  hash?: Hash
  input: string
  to: Address
  value: string
}

export type Params = Record<string, string | number | boolean | undefined>

interface TokenInfo {
  [key: string]: {
    decimals: number
    symbol?: string
  }
}

export interface ActionResponse {
  description: string
  transaction: Transaction
  params: Params
  tokenInfo: TokenInfo
  [key: string]: unknown
}
export interface TransactionDetail {
  description: string
  transaction: Transaction
  params: Params
  tokenInfo: { [key: string]: { symbol?: string; decimals: number } }
}

export const ActionParamKeys = {
  mint: ['chainId', 'contractAddress', 'amount', 'tokenId', 'recipient'],
  swap: [
    'chainId',
    'contractAddress',
    'amountIn',
    'amountOut',
    'tokenIn',
    'tokenOut',
    'recipient',
  ],
  stake: [
    'chainId',
    'contractAddress',
    'tokenOne',
    'amountOne',
    'tokenTwo',
    'amountTwo',
    'duration',
  ],
  bridge: [
    'sourceChainId',
    'destinationChainId',
    'contractAddress',
    'tokenAddress',
    'amount',
    'recipient',
  ],
  burn: ['chainId', 'contractAddress', 'amount', 'tokenId', 'recipient'],
  vote: ['chainId', 'project', 'support', 'proposalId'],
  delegate: [
    'chainId',
    'delegate',
    'project',
    'contractAddress',
    'amount',
    'delegator',
  ],
  options: [
    'chainId',
    'contractAddress',
    'token',
    'amount',
    'recipient',
    'orderType',
  ],
  propose: [
    'chainId',
    'project',
    'proposal',
    'proof',
  ],
  proposeWithoutProof: [
    'chainId',
    'project',
    'proposal',
  ],
}
