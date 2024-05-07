import { z } from 'zod'
import { isAddress, type Address } from 'viem'
export const EthAddressSchema = z.custom<`0x${string}`>((val) =>
  isAddress(val as Address),
)

export const NetworkSchema = z.object({
  name: z.string(),
  chainId: z.string(),
})
