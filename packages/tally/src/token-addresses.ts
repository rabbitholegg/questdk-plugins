import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const TALLY_TOKENS: Record<number, Address[]> = {
  [Chains.ARBITRUM_ONE]: ['0x912ce59144191c1204e64559fe8253a0e49e6548'],
  [Chains.OPTIMISM]: ['0x4200000000000000000000000000000000000042'],
}
