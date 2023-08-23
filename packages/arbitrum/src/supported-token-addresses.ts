import { type Address } from 'viem'
import { ETH_CHAIN_ID, ARB_ONE_CHAIN_ID, ARB_NOVA_CHAIN_ID } from './chain-ids'

// For now we're mainly supported the highest traffic Arbitrum tokens
// Support for USDC seems like it might be non-trivial
// https://docs.arbitrum.io/bridge-tokens/concepts/usdc-concept
// [DAI]
export const ArbitrumTokens: Record<number, Address[]> = {
  [ETH_CHAIN_ID]: [0x6b175474e89094c44da98b954eedeac495271d0f],
  [ARB_ONE_CHAIN_ID]: [0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1],
  [ARB_NOVA_CHAIN_ID]: [0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1],
}
