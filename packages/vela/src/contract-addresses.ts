import { type Address, zeroAddress } from 'viem'
import { Chains } from './utils'

// Tokens
const ETHER = zeroAddress
const ARBITRUM_BTC = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'
const ARBITRUM_ARB = '0x912CE59144191C1204E64559FE8253a0e49E6548'
const ARBITRUM_CRV = '0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978'
const ARBITRUM_LINK = '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4'

export const VAULT_CONTRACT = '0xc4abade3a15064f9e3596943c699032748b13352'

export const TOKEN_TO_ID: { [token: string]: number } = {
  ETHER: 2, // ETH
  ARBITRUM_BTC: 1, // wBTC
  ARBITRUM_ARB: 7, // ARB
  ARBITRUM_CRV: 36, // CRV
  ARBITRUM_LINK: 39, // LINK
}

export const CHAIN_TO_TOKENS: { [chainId: number]: Address[] } = {
  [Chains.ARBITRUM_ONE]: [
    ETHER,
    ARBITRUM_ARB,
    ARBITRUM_BTC,
    ARBITRUM_CRV,
    ARBITRUM_LINK,
  ],
}
