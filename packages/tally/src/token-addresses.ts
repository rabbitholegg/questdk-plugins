import { type Address } from 'viem'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'

// For now we're mainly supported the highest traffic Arbitrum tokens
// Support for USDC seems like it might be non-trivial
// https://docs.arbitrum.io/bridge-tokens/concepts/usdc-concept
// [DAI]
export const TALLY_TOKENS: Record<number, Address[]> = {
  [ARB_ONE_CHAIN_ID]: ['0xc4ed0a9ea70d5bcc69f748547650d32cc219d882'],
}
