import {
  type PublicClient,
  type Address,
  type SimulateContractReturnType,
  type TransactionRequest,
} from 'viem'
import { FilterOperatorSchema, NumericSchema, type FilterOperator, type TransactionFilter } from './filters'
import { PluginActionNotImplementedError } from '../errors'
import type { MintIntentParams } from './intents'
import { ZodSchema, z } from 'zod'
import { EthAddressSchema } from './common'
import { UUID } from 'crypto'
import { QuestCompletionPayload } from './quests'

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
  amount?: number | string | bigint | FilterOperator
  recipient?: Address
  referral?: Address
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
  | FollowActionParams
  | RecastActionParams
  | CreateActionParams
  | CompleteActionParams
  | CollectActionParams
  | PremintActionParams

export type DisctriminatedActionParams =
  | { type: ActionType.Swap; data: SwapActionParams }
  | { type: ActionType.Stake; data: StakeActionParams }
  | { type: ActionType.Bridge; data: BridgeActionParams }
  | { type: ActionType.Mint; data: MintActionParams }
  | { type: ActionType.Delegate; data: DelegateActionParams }
  | { type: ActionType.Quest; data: QuestActionParams }
  | { type: ActionType.Options; data: OptionsActionParams }
  | { type: ActionType.Vote; data: VoteActionParams }
  | { type: ActionType.Create; data: CreateActionParams }
  | { type: ActionType.Complete; data: CompleteActionParams }
  | { type: ActionType.Collect; data: CollectActionParams }

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
  amount: z.union([NumericSchema, FilterOperatorSchema]),
  amountOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
})

export const MintActionDetailSchema = z.object({
  chainId: z.number(),
  contractAddress: EthAddressSchema,
  tokenId: z.number().optional(),
  amount: z.union([NumericSchema, FilterOperatorSchema]),
  amountOperator: QuestInputActionParamsAmountOperatorEnum.optional(),
})

export type MintActionDetail = z.infer<typeof MintActionDetailSchema>
export type MintActionForm = z.infer<typeof MintActionFormSchema>

/*
FOLLOW
*/
export type FollowActionParams = {
  // if the target is a string, then assume it's a valid username or channel name
  // if it's a number, assume it's a fid, but that will rarely be the case
  target: Address | string | number
  type: 'user' | 'channel'
  project?: Address | string
}

export const FollowValidationParamsSchema = z.object({
  actor: z.string(),
  project: EthAddressSchema.optional(),
})
export type FollowValidationParams = z.infer<
  typeof FollowValidationParamsSchema
>

export const FollowActionDetailSchema = z.object({
  // if the target is a string, then assume it's a valid username or channel name
  // if it's a number, assume it's a fid, but that will rarely be the case
  target: z.union([z.string(), EthAddressSchema, z.number()]),
  type: z.union([z.literal('user'), z.literal('channel')]),
  project: z.union([z.string(), EthAddressSchema]).optional(),
})
export type FollowActionDetail = z.infer<typeof FollowActionDetailSchema>

export const FollowActionFormSchema = z.object({
  // if the target is a string, then assume it's a valid username or channel name
  // if it's a number, assume it's a fid, but that will rarely be the case
  target: z.union([z.string(), EthAddressSchema, z.number()]),
  type: z.union([z.literal('user'), z.literal('channel')]),
})
export type FollowActionForm = z.infer<typeof FollowActionFormSchema>

/*
RECAST
*/
export type RecastActionParams = {
  // Can either be url or hash
  identifier: Address | string // https://docs.neynar.com/reference/cast-conversation
  project?: Address | string
}

export const RecastValidationParamsSchema = z.object({
  actor: z.string(),
  project: EthAddressSchema.optional(),
})
export type RecastValidationParams = z.infer<
  typeof RecastValidationParamsSchema
>

export const RecastActionDetailSchema = z.object({
  identifier: z.union([z.string().url(), EthAddressSchema]),
  project: z.union([z.string(), EthAddressSchema]).optional(),
})
export type RecastActionDetail = z.infer<typeof RecastActionDetailSchema>

export const RecastActionFormSchema = z.object({
  identifier: z.union([z.string().url(), EthAddressSchema]),
})
export type RecastActionForm = z.infer<typeof RecastActionFormSchema>

/*
PREMINT
*/
export type PremintActionParams = {
  chainId: number
  createdAfter: string
}

export const PremintValidationParamsSchema = z.object({
  actor: z.string(),
})
export type PremintValidationParams = z.infer<
  typeof PremintValidationParamsSchema
>

export const PremintActionDetailSchema = z.object({
  chainId: z.number(),
  createdAfter: z.string().datetime(),
})
export type PremintActionDetail = z.infer<typeof PremintActionDetailSchema>

export const PremintActionFormSchema = z.object({
  chainId: z.number(),
  createdAfter: z.string().datetime(),
})
export type PremintActionForm = z.infer<typeof PremintActionFormSchema>

/*
CREATE
*/
export type CreateActionParams = {
  chainId: number
  contractAddress?: Address
}

export const CreateActionFormSchema = z.object({})
export const CreateActionDetailSchema = z.object({
  chainId: z.number(),
  contractAddress: EthAddressSchema.optional(),
})

export type CreateActionForm = z.infer<typeof CreateActionFormSchema>
export type CreateActionDetail = z.infer<typeof CreateActionDetailSchema>

/*
COMPLETE
*/
export type CompleteActionParams = {
  completeAfter: number
  chainId?: string
  boostId?: string
  actionType?: string
}

export const CompleteActionDetailSchema = z.object({
  completeAfter: z.number(),
  chainId: z.string().optional(),
  boostId: z.string().optional(),
  actionType: z.string().optional(),
})
export const CompleteActionFormSchema = CompleteActionDetailSchema
export type CompleteActionDetail = z.infer<typeof CompleteActionDetailSchema>
export type CompleteActionForm = z.infer<typeof CompleteActionFormSchema>

export const CompleteValidationParamsSchema = z.object({
  actor: z.string(),
})
export type CompleteValidationParams = z.infer<
  typeof CompleteValidationParamsSchema
>

/*
COLLECT
*/
export type CollectActionParams = {
  identifier: Address | string
  project?: Address | string
}

export const CollectValidationParamsSchema = z.object({
  actor: z.string(),
  project: EthAddressSchema.optional(),
})
export type CollectValidationParams = z.infer<
  typeof CollectValidationParamsSchema
>

export const CollectActionDetailSchema = z.object({
  identifier: z.string(),
  project: z.union([z.string(), EthAddressSchema]).optional(),
})
export type CollectActionDetail = z.infer<typeof CollectActionDetailSchema>

export const CollectActionFormSchema = z.object({
  identifier: z.string(),
})
export type CollectActionForm = z.infer<typeof CollectActionFormSchema>
/*
VOTE
*/

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
  z.object({ type: z.literal('create'), data: CreateActionFormSchema }),
  z.object({ type: z.literal('complete'), data: CompleteActionFormSchema }),
  z.object({ type: z.literal('collect'), data: CollectActionFormSchema }),
])

export type ActionParamsForm = z.infer<typeof ActionParamsFormSchema>

export const ActionParamsSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('bridge'), data: BridgeActionDetailSchema }),
  z.object({ type: z.literal('swap'), data: SwapActionDetailSchema }),
  z.object({ type: z.literal('delegate'), data: DelegateActionDetailSchema }),
  z.object({ type: z.literal('stake'), data: StakeActionDetailSchema }),
  z.object({ type: z.literal('mint'), data: MintActionDetailSchema }),
  z.object({ type: z.literal('options'), data: OptionsActionDetailSchema }),
  z.object({ type: z.literal('vote'), data: VoteActionDetailSchema }),
  z.object({ type: z.literal('follow'), data: FollowActionDetailSchema }),
  z.object({ type: z.literal('recast'), data: RecastActionDetailSchema }),
  z.object({ type: z.literal('create'), data: CreateActionDetailSchema }),
  z.object({ type: z.literal('complete'), data: CompleteActionDetailSchema }),
  z.object({ type: z.literal('collect'), data: CollectActionDetailSchema }),
  z.object({ type: z.literal('premint'), data: PremintActionDetailSchema }),
])

export const QuestActionParamsSchema = ActionParamsSchema

export const ValidationParamsSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('follow'), data: FollowValidationParamsSchema }),
  z.object({ type: z.literal('recast'), data: RecastValidationParamsSchema }),
  z.object({
    type: z.literal('complete'),
    data: CompleteValidationParamsSchema,
  }),
  z.object({ type: z.literal('collect'), data: CollectValidationParamsSchema }),
  z.object({
    type: z.literal('premint'),
    data: PremintValidationParamsSchema,
  }),
])

export type ValidationParams = z.infer<typeof ValidationParamsSchema>

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
  create?: (
    params: CreateActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  complete?: (
    params: CompleteActionParams,
  ) => Promise<TransactionFilter> | Promise<PluginActionNotImplementedError>
  collect?: (
    params: CollectActionParams,
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
    creatorAddress?: Address,
  ) => Promise<SimulateContractReturnType>
  getProjectFees?: (params: ActionParams) => Promise<bigint>
  getFees?: (
    params: ActionParams,
  ) => Promise<{ actionFee: bigint; projectFee: bigint }>
  getExternalUrl?: (
    params: ActionParams,
    actionType?: ActionType,
  ) => Promise<string>
  validate?: (
    validationPayload: PluginActionValidation,
  ) =>
    | Promise<QuestCompletionPayload | null>
    | Promise<PluginActionNotImplementedError>
  validateFollow?: (
    actionP: FollowActionParams,
    validateP: FollowValidationParams,
  ) => Promise<boolean> | Promise<PluginActionNotImplementedError>
  validateRecast?: (
    actionP: RecastActionParams,
    validateP: RecastValidationParams,
  ) => Promise<boolean> | Promise<PluginActionNotImplementedError>
  validateComplete?: (
    actionP: CompleteActionParams,
    validateP: CompleteValidationParams,
  ) =>
    | Promise<{
        isCompleteValid: boolean
        transactionHash: string | null
        chainId: number | null
      }>
    | Promise<PluginActionNotImplementedError>
  validateCollect?: (
    actionP: CollectActionParams,
    validateP: CollectValidationParams,
  ) => Promise<boolean> | Promise<PluginActionNotImplementedError>
  validatePremint?: (
    actionP: PremintActionParams,
    validateP: PremintValidationParams,
  ) => Promise<boolean> | Promise<PluginActionNotImplementedError>
  canValidate?: (actionType: ActionType) => boolean
}

/*
ACTION VALIDATION
*/
export type ActionValidation<ActorType, ActionPayload> = {
  actor: ActorType
  payload: ActionPayload
}

export function ActionValidationSchema(
  actorSchema: ZodSchema,
  payloadSchema: ZodSchema,
) {
  return z.object({
    actor: actorSchema,
    payload: payloadSchema,
  })
}

export type PluginActionPayload = {
  actionParams: z.infer<typeof ActionParamsSchema>
  validationParams: z.infer<typeof ValidationParamsSchema>
  questId: UUID
  taskId: UUID
}

export type PluginActionValidation = ActionValidation<
  Address,
  PluginActionPayload
>

export const PluginActionValidationSchema = ActionValidationSchema(
  z.string(),
  z.object({
    actionParams: ActionParamsSchema,
    validationParams: ValidationParamsSchema,
    questId: z.string().uuid(),
    taskId: z.string().uuid(),
  }),
)

/*
ENUM TYPES
*/
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
  Follow = 'follow',
  Recast = 'recast',
  Create = 'create',
  Complete = 'complete',
  Collect = 'collect',
  Premint = 'premint',
}

export enum OrderType {
  Limit = 'limit',
  Market = 'market',
}
