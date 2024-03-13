import {
  type PublicClient,
  type Address,
  type SimulateContractReturnType,
  type TransactionRequest,
} from 'viem'
import type { FilterOperator, TransactionFilter } from './filters'
import { PluginActionNotImplementedError } from '../errors'
import type { MintIntentParams } from './intents'
import { z } from 'zod'
import { EthAddressSchema } from './common'

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
  | { type: ActionType.Vote; data: VoteActionParams }

export const QuestInputActionParamsAmountOperatorEnum = z.enum([
  'any',
  'gt',
  'gte',
  'lt',
  'lte',
  'eq',
])

export const QuestInputActionParamsAmountOperatorWithoutAny =
  QuestInputActionParamsAmountOperatorEnum.exclude(['any'])

export type QuestInputActionParamsAmountOperator = z.infer<
  typeof QuestInputActionParamsAmountOperatorEnum
>

export const BridgeActionDetailSchema = z.object({
  sourceChainId: z.number(),
  destinationChainId: z.number(),
  tokenAddress: z.string().optional(),
  amount: z.string().optional(),
  amountOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
})

export type BridgeActionDetail = z.infer<typeof BridgeActionDetailSchema>

export const SwapActionDetailSchema = z.object({
  sourceChainId: z.number().optional(),
  chainId: z.number().optional(),
  sourceTokenAddress: EthAddressSchema.optional(),
  targetTokenAddress: EthAddressSchema.optional(),
  amount: z.string().optional(),
  amountOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
})

export type SwapActionDetail = z.infer<typeof SwapActionDetailSchema>

export const DelegateActionFormSchema = z.object({
  delegate: EthAddressSchema.optional(),
})

export const DelegateActionDetailSchema = z.object({
  chainId: z.number(),
  delegate: EthAddressSchema.optional(),
})

export type DelegateActionDetail = z.infer<typeof DelegateActionDetailSchema>
export type DelegateActionForm = z.infer<typeof DelegateActionFormSchema>

export const StakeActionDetailSchema = z.object({
  chainId: z.number(),
  tokenOne: EthAddressSchema.optional(),
  tokenTwo: EthAddressSchema.optional(),
  amountOne: z.string().optional(),
  amountTwo: z.string().optional(),
  amountOneOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
  amountTwoOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
})

export type StakeActionDetail = z.infer<typeof StakeActionDetailSchema>

export const BridgeActionFormSchema = z.object({
  destinationNetworkId: z.string(),
  tokenAddress: EthAddressSchema.optional(),
  tokenDecimals: z.number().optional(),
  amount: z.string().optional(),
  amountOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
})

export const SwapActionFormSchema = z.object({
  sourceTokenAddress: EthAddressSchema.optional(),
  targetTokenAddress: EthAddressSchema.optional(),
  tokenDecimals: z.number().optional(),
  amount: z.string().optional(),
  amountOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
})

export const BaseStakeActionFormaSchema = z.object({
  tokenOne: EthAddressSchema.optional(),
  tokenOneDecimals: z.number().optional(),
  amountOne: z.string().optional(),
  amountOneOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
  tokenTwo: EthAddressSchema.optional(),
  tokenTwoDecimals: z.number().optional(),
  amountTwo: z.string().optional(),
  amountTwoOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
  duration: z.number().optional(),
})

export const StakeActionFormSchema = BaseStakeActionFormaSchema

export const MintActionFormSchema = z.object({
  contractAddress: EthAddressSchema,
  tokenId: z.number().optional(),
  amount: z.string().optional(),
  amountOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
})

export const MintActionDetailSchema = z.object({
  chainId: z.number(),
  contractAddress: EthAddressSchema,
  tokenId: z.number().optional(),
  amount: z.string().optional(),
  amountOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
})

export type MintActionDetail = z.infer<typeof MintActionDetailSchema>
export type MintActionForm = z.infer<typeof MintActionFormSchema>

export const VoteActionFormSchema = z.object({
  project: EthAddressSchema,
  proposalId: z.number().optional(),
  support: z.boolean().optional(),
})

export const VoteActionDetailSchema = z.object({
  chainId: z.number(),
  project: EthAddressSchema,
  proposalId: z.number().optional(),
  support: z.boolean().optional(),
})

export type VoteActionDetail = z.infer<typeof VoteActionDetailSchema>
export type VoteActionForm = z.infer<typeof VoteActionFormSchema>

export const OptionsActionFormSchema = z.object({
  contractAddress: EthAddressSchema.optional(),
  token: EthAddressSchema.optional(),
  amount: z.string().optional(),
  amountOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
  recipient: EthAddressSchema.optional(),
  orderType: z.string().optional(),
})

export const OptionsActionDetailSchema = z.object({
  chainId: z.number(),
  contractAddress: EthAddressSchema.optional(),
  token: EthAddressSchema.optional(),
  amount: z.string().optional(),
  amountOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
  recipient: EthAddressSchema.optional(),
  orderType: z.string().optional(),
})

export type OptionsActionDetail = z.infer<typeof OptionsActionDetailSchema>
export type OptionsActionForm = z.infer<typeof OptionsActionFormSchema>

export const ActionParamsFormSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('bridge'), data: BridgeActionFormSchema }),
  z.object({ type: z.literal('swap'), data: SwapActionFormSchema }),
  z.object({ type: z.literal('stake'), data: StakeActionFormSchema }),
  z.object({ type: z.literal('mint'), data: MintActionFormSchema }),
  z.object({ type: z.literal('delegate'), data: DelegateActionFormSchema }),
  z.object({ type: z.literal('options'), data: OptionsActionFormSchema }),
  z.object({ type: z.literal('vote'), data: VoteActionFormSchema }),
])

export type ActionParamsForm = z.infer<typeof ActionParamsFormSchema>

export const QuestActionParamsSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('bridge'), data: BridgeActionDetailSchema }),
  z.object({ type: z.literal('swap'), data: SwapActionDetailSchema }),
  z.object({ type: z.literal('delegate'), data: DelegateActionDetailSchema }),
  z.object({ type: z.literal('stake'), data: StakeActionDetailSchema }),
  z.object({ type: z.literal('mint'), data: MintActionDetailSchema }),
  z.object({ type: z.literal('options'), data: OptionsActionDetailSchema }),
  z.object({ type: z.literal('vote'), data: VoteActionDetailSchema }),
])

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
  getDynamicNameParams?: (
    params: DisctriminatedActionParams,
    metadata: Record<string, unknown>,
  ) => Promise<Record<string, unknown>>
  simulateMint?: (
    mint: MintIntentParams,
    value: bigint,
    account?: Address,
    client?: PublicClient,
  ) => Promise<SimulateContractReturnType>
  getProjectFees?: (params: ActionParams) => Promise<bigint>
  getFees?: (
    params: ActionParams,
  ) => Promise<{ actionFee: bigint; projectFee: bigint }>
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
