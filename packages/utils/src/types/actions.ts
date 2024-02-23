import { type TransactionRequest, type Address } from 'viem'
import type { FilterOperator, TransactionFilter } from './filters'
import { PluginActionNotImplementedError } from '../errors'
import type { MintIntentParams } from './intents'
import { BridgeActionDetailSchema, DelegateActionDetailSchema, MintActionDetailSchema, OptionsActionDetailSchema, StakeActionDetailSchema, SwapActionDetailSchema, VoteActionDetailSchema } from './quests'
import { z } from 'zod'

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

export type OptionsActionParams = {
  chainId: number
  contractAddress?: Address
  token?: Address
  amount?: bigint | FilterOperator
  recipient?: Address
  orderType?: OrderType
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
  contractAddress: Address
  tokenId?: number
  amount?: number | FilterOperator
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

export type VoteActionParams = {
  chainId: number
  project: Address | string
  support?: bigint | boolean | FilterOperator
  proposalId?: bigint | FilterOperator
}

export type ActionParams =
  | SwapActionParams
  | StakeActionParams
  | BridgeActionParams
  | MintActionParams
  | DelegateActionParams
  | QuestActionParams
  | OptionsActionParams
  | VoteActionParams

  export type DisctriminatedActionParams = 
  | { type: ActionType.Swap; data: SwapActionParams }
  | { type: ActionType.Stake; data: StakeActionParams }
  | { type: ActionType.Bridge; data: BridgeActionParams }
  | { type: ActionType.Mint; data: MintActionParams }
  | { type: ActionType.Delegate; data: DelegateActionParams }
  | { type: ActionType.Quest; data: QuestActionParams }
  | { type: ActionType.Options; data: OptionsActionParams }
  | { type: ActionType.Vote; data: VoteActionParams };

  export const QuestActionParamsSchema = z.discriminatedUnion('type', [
    z.object({ type: z.literal('bridge'), data: BridgeActionDetailSchema }),
    z.object({ type: z.literal('swap'), data: SwapActionDetailSchema }),
    z.object({ type: z.literal('delegate'), data: DelegateActionDetailSchema }),
    z.object({ type: z.literal('stake'), data: StakeActionDetailSchema }),
    z.object({ type: z.literal('mint'), data: MintActionDetailSchema }),
    z.object({ type: z.literal('options'), data: OptionsActionDetailSchema }),
    z.object({ type: z.literal('vote'), data: VoteActionDetailSchema }),
  ]);

export interface IActionPlugin {
  pluginId: string
  getSupportedChainIds: (task?: ActionType) => Promise<number[]>
  getSupportedTokenAddresses: (
    chainId: number,
    task?: ActionType,
  ) => Promise<Address[]>
  bridge?: (
    params: BridgeActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  swap?: (
    params: SwapActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  mint?: (
    params: MintActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  stake?: (
    params: StakeActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  delegate?: (
    params: DelegateActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  burn?: (
    params: BurnActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  quest?: (
    params: QuestActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  options?: (
    params: OptionsActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  vote?: (
    params: VoteActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  getMintIntent?: (
    mint: MintIntentParams,
  ) => Promise<TransactionRequest> | Promise<PluginActionNotImplementedError>
  getDynamicName?: (params: DisctriminatedActionParams) => Promise<string>
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
  Options = 'options',
  Vote = 'vote',
}

export enum OrderType {
  Limit = 'limit',
  Market = 'market',
}
