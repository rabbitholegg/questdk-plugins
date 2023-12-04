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

export type StakeActionParams = {
  chainId: number
  contractAddress?: Address
  tokenOne?: Address
  amountOne?: bigint | FilterOperator
  tokenTwo?: Address
  amountTwo?: bigint | FilterOperator
  duration?: bigint | FilterOperator
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
  chainId: number
  contractAddress: string
  tokenId?: number
  amount?: number
  recipient?: Address
}

export type BurnActionParams = MintActionParams

export type QuestActionParams = {
  chainId: number
  rewardToken?: Address
  rewardAmount?: bigint | FilterOperator
  startTime?: bigint | FilterOperator
  endTime?: bigint | FilterOperator
  totalParticipants?: bigint | FilterOperator
  actionSpec?: string
}

export type DelegateActionParams = {
  chainId: number
  delegate?: Address
  project: Address | string
  contractAddress?: Address
  amount?: bigint | FilterOperator
  delegator?: Address
}

export type ActionParams =
  | SwapActionParams
  | StakeActionParams
  | BridgeActionParams
  | MintActionParams
  | DelegateActionParams
  | MintActionParams
  | QuestActionParams

export interface IActionPlugin {
  pluginId: string
  getSupportedChainIds: (task?: ActionType) => Promise<number[]>
  getSupportedTokenAddresses: (
    chainId: number,
    task?: ActionType,
  ) => Promise<Address[]>
  bridge: (
    params: BridgeActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  swap: (
    params: SwapActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  mint: (
    params: MintActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  stake?: (
    params: StakeActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  delegate?: (
    params: DelegateActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  burn?: (
    params: DelegateActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  quest?: (
    params: QuestActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
}

export enum ActionType {
  Bridge = 'bridge',
  Stake = 'stake',
  Swap = 'swap',
  Mint = 'mint',
  Burn = 'burn',
  Quest = 'quest',
  Deposit = 'deposit',
  Delegate = 'delegate',
  Lend = 'lend',
  Other = 'other',
}
