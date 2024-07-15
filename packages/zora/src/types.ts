import {
  type FilterOperator,
  EthAddressSchema,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'
import { z } from 'zod'

export const PremintResponseSchema = z.array(
  z.object({
    zoraV2: z.object({
      collection: z.object({
        contractAdmin: EthAddressSchema,
        contractURI: z.string(),
        contractName: z.string(),
      }),
      premint: z.object({
        tokenConfig: z.object({
          tokenURI: z.string(),
          maxSupply: z.string(),
          maxTokensPerAddress: z.number(),
          pricePerToken: z.number(),
          mintStart: z.number(),
          mintDuration: z.number(),
          royaltyBPS: z.number(),
          payoutRecipient: EthAddressSchema,
          fixedPriceMinter: EthAddressSchema,
          createReferral: EthAddressSchema,
        }),
        uid: z.number(),
        version: z.number(),
        deleted: z.boolean(),
      }),
      collectionAddress: EthAddressSchema,
      chainId: z.number(),
      signature: z.string(),
    }),
  }),
)
export type PremintResponse = z.infer<typeof PremintResponseSchema>

type RecipientCondition = {
  $or: Array<{
    recipient?: string
    tokenRecipient?: string
    to?: string
  }>
}

export type AndArrayItem =
  | { quantity: string | number | bigint | FilterOperator }
  | RecipientCondition
  | { tokenId: string | number }
  | { mintReferral: Address }
  | { rewardsRecipients: { $and: [{ $first: Address }, { $last: Address }] } }
  | { $or: AndArrayItem[] }
