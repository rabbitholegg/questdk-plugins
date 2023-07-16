import type { FilterOperator } from '../filter/types.js'
import { type Hex } from 'viem'

export type AmountOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq'

export type SwapAction = {
  chainId: number
  contractAddress?: Hex
  tokenIn?: Hex
  tokenOut?: Hex
  amountIn?: bigint | FilterOperator
  amountOut?: bigint | FilterOperator
  recipient?: Hex
  deadline?: bigint | FilterOperator
}

export type BridgeAction = {
  sourceChainId: number
  destinationChainId?: number
  contractAddress?: Hex
  tokenAddress?: Hex
  amount?: bigint | FilterOperator
  amountOperator: AmountOperator
  recipient?: Hex
}

export type MintAction = {
  address: string
  tokenId: number
  quantity: number
}
