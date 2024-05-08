import { z } from 'zod'
import { EthAddressSchema } from './common'
import { Address, parseEther } from 'viem'
import { ActionParamsFormSchema, QuestActionParamsSchema } from './actions'
import { RewardTypeSchema } from './rewards'
import { UUID } from 'crypto'
import { NetworkNameSchema } from './'
const NetworkSchema = z.object({
  name: z.string(),
  chainId: z.string(),
})

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
export type QuestActionParamsByType = z.infer<typeof QuestActionParamsSchema>
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

export type QuestCompletionPayload = {
  address: Address
  questId: UUID
  taskId: UUID
  transactionHash?: string
  chainId?: number
}
