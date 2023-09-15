import { ETH_CHAIN_ID, OP_CHAIN_ID } from './chain-ids'

export const ETH_TOKEN_ADDRESS = '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'
export const USDC_TOKEN_ADDRESS = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607'
export const TETHER_TOKEN_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
export const TETHER_OPTIMISM_ADDRESS =
  '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58' // Only Tether has it's own address on Optimism

export const CHAIN_ID_TO_TOKENS: { [chainId: number]: readonly string[] } = {
  [ETH_CHAIN_ID]: [ETH_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS, TETHER_TOKEN_ADDRESS],
  [OP_CHAIN_ID]: [
    ETH_TOKEN_ADDRESS,
    USDC_TOKEN_ADDRESS,
    TETHER_OPTIMISM_ADDRESS,
  ],
} as const
