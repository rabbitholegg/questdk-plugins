import { type Address } from 'viem'
import { ARBITRUM_ONE, BASE, ETHEREUM, OPTIMISM, POLYGON } from './chain-ids'

export const LLAMA_TOKENS: Record<number, Address[]> = {
  // These are the Llama factory addresses for now - we don't need to track a token with this project
  [OPTIMISM]: ['0xFf5d4E226D9A3496EECE31083a8F493edd79AbEB'],
  [POLYGON]: ['0xFf5d4E226D9A3496EECE31083a8F493edd79AbEB'],
  [ETHEREUM]: ['0xFf5d4E226D9A3496EECE31083a8F493edd79AbEB'],
  [ARBITRUM_ONE]: ['0xFf5d4E226D9A3496EECE31083a8F493edd79AbEB'],
  [BASE]: ['0xFf5d4E226D9A3496EECE31083a8F493edd79AbEB'],
}
