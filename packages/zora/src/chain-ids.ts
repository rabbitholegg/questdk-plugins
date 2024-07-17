import { Chains } from '@rabbitholegg/questdk-plugin-utils'

export const CHAIN_ID_ARRAY = [
  Chains.ARBITRUM_ONE,
  Chains.BASE,
  Chains.BLAST,
  Chains.ETHEREUM,
  Chains.OPTIMISM,
  Chains.ZORA,
]

export const CHAIN_ID_TO_ZORA_SLUG: Record<number, string> = {
  [Chains.ARBITRUM_ONE]: 'arb',
  [Chains.BASE]: 'base',
  [Chains.BLAST]: 'blast',
  [Chains.ETHEREUM]: 'eth',
  [Chains.OPTIMISM]: 'oeth',
  [Chains.ZORA]: 'zora',
}
