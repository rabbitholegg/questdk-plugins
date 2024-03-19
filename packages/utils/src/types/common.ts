import { z } from 'zod'
import { isAddress, type Address } from 'viem'
export const EthAddressSchema = z.custom<`0x${string}`>((val) =>
  isAddress(val as Address),
)

export const NetworkSchema = z.object({
  name: z.string(),
  chainId: z.string(),
})

export const TargetMetadataSchema = z.object({
  targetAddress: EthAddressSchema,
})

export const SafeMetadataSchema = z.object({
  signers: z.array(EthAddressSchema),
  threshold: z.number(),
})

export const ProposalCoreSchema = z.object({
  author: EthAddressSchema,
  exists: z.boolean(),
  description: z.string(),
  targetMetadata: TargetMetadataSchema,
  safeMetadata: SafeMetadataSchema,
})

export type NetworkName = z.infer<typeof NetworkNameSchema>

export const NetworkNameSchema = z.union([
  z.literal('ethereum'),
  z.literal('eth-mainnet'),
  z.literal('eth-goerli'),
  z.literal('opt-mainnet'),
  z.literal('optimism'),
  z.literal('opt-goerli'),
  z.literal('arbitrum'),
  z.literal('arb-mainnet'),
  z.literal('arb-goerli'),
  z.literal('polygon'),
  z.literal('polygon-mainnet'),
  z.literal('polygon-mumbai'),
  z.literal('eth-sepolia'),
  z.literal('zora-mainnet'),
  z.literal('zksync-mainnet'),
  z.literal('zksync'),
  z.literal('base'),
  z.literal('base-mainnet'),
  z.literal('mantle'),
  z.literal('mantle-mainnet'),
])
