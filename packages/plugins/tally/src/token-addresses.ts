import { type Address } from 'viem'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'

// This is just the Arbitrum token address since we only support that token right now
export const TALLY_TOKENS: Record<number, Address[]> = {
  [ARB_ONE_CHAIN_ID]: ['0xc4ed0a9ea70d5bcc69f748547650d32cc219d882'],
}
