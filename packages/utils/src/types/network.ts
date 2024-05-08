import { z } from 'zod'

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
  z.literal('base-sepolia'),
  z.literal('zksync-mainnet'),
  z.literal('zksync'),
  z.literal('base'),
  z.literal('base-mainnet'),
  z.literal('mantle'),
  z.literal('mantle-mainnet'),
  z.literal('blast'),
  z.literal('blast-mainnet'),
  z.literal('degen'),
  z.literal('degen-mainnet'),
])

export type NetworkName = z.infer<typeof NetworkNameSchema>
