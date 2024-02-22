export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  OPTIMISM: 10,
  BSC: 56,
  ARBITRUM: 42161,
} as const

export const SUPPORTED_CHAINS_ARRAY: number[] = Object.values(SUPPORTED_CHAINS)

export type SupportedChainId =
  typeof SUPPORTED_CHAINS[keyof typeof SUPPORTED_CHAINS]
