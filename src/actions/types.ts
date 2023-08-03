import type { FilterOperator, TransactionFilter } from '../filter/types.js'
import type { PluginActionNotImplementedError } from '../index.js'
import { type Address } from 'viem'

export type SwapActionParams = {
  chainId: number
  contractAddress?: Address
  tokenIn?: Address
  tokenOut?: Address
  amountIn?: bigint | FilterOperator
  amountOut?: bigint | FilterOperator
  recipient?: Address
  deadline?: bigint | FilterOperator
}

export type BridgeActionParams = {
  sourceChainId: number
  destinationChainId: number
  contractAddress?: Address
  tokenAddress?: Address
  amount?: bigint | FilterOperator
  recipient?: Address
}

export type MintActionParams = {
  address: string
  tokenId: number
  quantity: number
}

export type ActionParams =
  | SwapActionParams
  | BridgeActionParams
  | MintActionParams

export interface IActionPlugin {
  bridge: (
    params: BridgeActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  swap: (
    params: SwapActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  mint: (
    params: MintActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
}

export enum ActionType {
  Bridge = 'bridge',
  Swap = 'swap',
  Mint = 'mint',
}
