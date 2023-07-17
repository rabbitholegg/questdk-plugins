import type { FilterOperator } from '../filter/types.js'
import { type Address } from 'viem'

export type SwapAction = {
  chainId: number
  contractAddress?: Address
  tokenIn?: Address
  tokenOut?: Address
  amountIn?: bigint | FilterOperator
  amountOut?: bigint | FilterOperator
  recipient?: Address
  deadline?: bigint | FilterOperator
}

export type BridgeAction = {
  sourceChainId: number
  destinationChainId?: number
  contractAddress?: Address
  tokenAddress?: Address
  amount?: bigint | FilterOperator
  recipient?: Address
}

export type MintAction = {
  address: string
  tokenId: number
  quantity: number
}
