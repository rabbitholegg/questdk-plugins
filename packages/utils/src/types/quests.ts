import { z } from 'zod'
import { EthAddressSchema, NetworkNameSchema } from './common'
import { parseEther } from 'viem'
import { QuestActionParamsSchema } from './actions'
import { RewardTypeSchema } from './rewards'
const NetworkSchema = z.object({
  name: z.string(),
  chainId: z.string(),
})
// Which one of these TaskSchema is the correct one?
const TaskSchema = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string(),
  iconOption: z.string(),
  deprecated: z.boolean().nullish(),
  timestamp: z.coerce.date().nullish(),
  contractAddress: EthAddressSchema.nullable(),
  eventName: z.string(),
  status: z.string().nullish(),
  webhookUrl: z.string(),
  indexerStrategy: z.string(),
  title: z.string(),
  network: NetworkSchema,
})

// I Think this one is outdated but need to double check
//   export const TaskSchema = z.object({
//     name: z.string().nullish(),
//     type: z.string(),
//     project: z.string(),
//     displayId: z.string().optional(),
//     description: z.string().optional(),
//     link: z.string().optional(),
//     iconOption: z.string().optional(),
//     deprecated: z.boolean().nullish(),
//     contractAddress: z.string().nullish(),
//     eventName: z.string().optional(),
//     status: z.string().nullish(),
//     network: NetworkWithChainIdSchema,
//   });

const QuestSchema = z.object({
  id: z.string(),
  appLink: z.string(),
  iconOption: z.string(),
  imagePath: z.string(),
  name: z.string(),
  questEnd: z.union([z.date(), z.string()]),
  questStart: z.union([z.date(), z.string()]),
  description: z.string(),
  network: z.string(),
  receiptsMinted: z.number(),
  status: z.string(),
  createdAt: z.union([z.date(), z.string()]),
  contractAddress: EthAddressSchema.nullable(),
  creatorAddress: EthAddressSchema,
  tasks: z.array(TaskSchema),
  actionParams: QuestActionParamsSchema.optional(),
  tags: z.array(z.string()).optional(),
})

export type Quest = z.infer<typeof QuestSchema>

// Which one of these is the correct one?
export const RewardSchema = z.object({
  amount: z.string(),
  totalAllocated: z.number(),
  type: RewardTypeSchema,
  tokenSymbol: z.string(),
  token: z.string(),
  network: NetworkNameSchema,
  s3Link: z.string(),
  ethValue: z.string().nullable(),
  tokenContractAddress: EthAddressSchema,
  decimals: z.number().nullish(),
  tokenId: z.string().nullish(),
})

// This one looks more outdated
// export const RewardSchema = z.object({
//     type: RewardTypeSchema,
//     totalAllocated: z.number(),
//     totalRedeemed: z.number(),
//     tokenSymbol: z.string().nullish(),
//     amount: z.string(),
//     token: z.string().nullish(),
//     tokenContractAddress: z.string(),
//     questId: z.string().nullish(),
//     tokenId: z.string().nullish(),
//     s3Link: z.string().nullish(),
//     network: NetworkWithChainIdSchema,
//     ethValue: z.string().nullish(),
//     decimals: z.number().nullish(),
//     nftMedia: z.string().optional(),
//     score: z.number(),
//     scoreModel: z.string(),
//   });

export type QuestReward = z.infer<typeof RewardSchema>

const QuestRewardSchema = z.object({
  quest: QuestSchema,
  reward: RewardSchema,
})
export type QuestAndReward = z.infer<typeof QuestRewardSchema>

export const GetQuestsResponseSchema = z.object({
  quests: z.array(QuestRewardSchema),
})

export type RewardType = z.infer<typeof RewardTypeSchema>

export const NetworkWithChainIdSchema = z.object({
  name: z.string(),
  chainId: z.string(),
})

export type NetworkWithChainId = z.infer<typeof NetworkWithChainIdSchema>

export type Reward = z.infer<typeof RewardSchema>

export type Task = z.infer<typeof TaskSchema>

export const QuestDetailsSchema = z
  .object({
    actionSpecId: z.string().nullish(),
    allowlistEnabled: z.boolean(),
    id: z.string(),
    appLink: z.string(),
    creatorAddress: EthAddressSchema,
    contractAddress: z.string(),
    eligibility: z.object({ eligible: z.boolean() }).optional(),
    iconOption: z.string(),
    imagePath: z.string(),
    instructionsUrl: z.string().nullable(),
    name: z.string(),
    network: NetworkNameSchema,
    disabled: z.boolean().optional(),
    questAttributes: z.array(z.string()).nullish(),
    questEnd: z.string().optional(),
    questStart: z.string().optional(),
    description: z.string(),
    status: z.string(),
    isReceiptEnabled: z.boolean(),
    allowlistId: z.string().nullish(),
    accessListId: z.string().nullish(),
    rewards: z.array(RewardSchema),
    tasks: z.array(TaskSchema),
    filters: z
      .array(
        z.object({
          name: z.string(),
          value: z.string(),
          operator: z.string(),
        }),
      )
      .nullish(),
    abiInputFilters: z
      .array(
        z.object({
          functionName: z.string(),
          name: z.string(),
          value: z.string(),
          operator: z.string(),
        }),
      )
      .optional()
      .nullable(),
    questAddress: z.string(),
    totalParticipants: z.number(),
    numberMinted: z.number(),
    receiptsMinted: z.number(),
    participants: z
      .array(
        z.object({
          account: z.string(),
          amount: z.string(),
        }),
      )
      .optional(),
    questFactoryAddress: z.string().optional(),
    queued: z.boolean(),
    isPublic: z.boolean().nullish(),
    actionParams: QuestActionParamsSchema.optional(),
  })
  .strict()

export type QuestDetails = z.infer<typeof QuestDetailsSchema>

export const GetQuestsByIdResponseSchema = QuestDetailsSchema

export const RewardWithClaimSchema = z.object({
  id: z.string(),
  iconOption: z.string(),
  name: z.string(),
  contractAddress: z.string(),
  network: z.string(),
  completedAt: z.string(),
  rewards: z.array(
    z.object({
      type: RewardTypeSchema,
      totalAllocated: z.number(),
      totalRedeemed: z.number(),
      tokenSymbol: z.string(),
      amount: z.string(),
      token: z.string(),
      tokenContractAddress: z.string(),
      questId: z.string(),
      tokenId: z.string().nullable(),
      s3Link: z.string(),
      ethValue: z.string().nullable(),
      network: NetworkWithChainIdSchema,
      decimals: z.number().nullish(),
      score: z.number(),
    }),
  ),
  questAddress: z.string(),
})

export type RewardWithClaim = z.infer<typeof RewardWithClaimSchema>

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

export const CreateQuestInputSchema = z.object({
  contractType: z.enum(['ERC20', 'ERC721']).optional(),
  networkId: NetworkNameSchema, // used to specify the network when a task supports multiple
  projectId: z.string(),
  actionId: z.string(),
  actionParams: ActionParamsFormSchema.optional(),
  allowlistId: z.string().optional(),
  rewardTokenId: z.string(),
  rewardAmount: z.string().refine((value) => {
    try {
      return parseEther(value) > 0
    } catch {
      return false
    }
  }),
  rewardDecimals: z.number(),
  participantLimit: z.number().gt(0),
  startTime: z.string().optional(),
  endTime: z.string(),
  accessList: z
    .object({
      allow: z.array(z.string()).optional(),
      deny: z.array(z.string()).optional(),
    })
    .optional(),
})

export type CreateQuestInput = z.infer<typeof CreateQuestInputSchema>
