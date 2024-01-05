import { type Address, zeroAddress } from 'viem'
import { Chains } from './utils'
import {
  GreaterThanOrEqual,
  type FilterOperator,
  LessThan,
} from '@rabbitholegg/questdk'

// Tokens
const ETHER = zeroAddress
const ARBITRUM_BTC = '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f'
const ARBITRUM_ARB = '0x912ce59144191c1204e64559fe8253a0e49e6548'
const ARBITRUM_CRV = '0x11cdb42b0eb46d95f990bedd4695a6e3fa034978'
const ARBITRUM_LINK = '0xf97f4df75117a78c1a5a0dbb814af92458539fb4'

export const VAULT_CONTRACT = '0xc4abade3a15064f9e3596943c699032748b13352'

/* 
  A list of token ids can be found here: https://docs.vela.exchange/vela-knowledge-base/developers/asset-pairs-and-velaid
  Multiplying the tokenId by 2^240 will give you the lower bound of what the packed value will be. 
  Thus we check if the value is greater than or equal to the lower bound and less than the lower bound of the next tokenId.
*/
const tokenIdMultiplier = BigInt(2 ** 240)

export const TOKEN_TO_ID: { [token: string]: FilterOperator } = {
  [ETHER]: {
    $and: [
      GreaterThanOrEqual(2n * tokenIdMultiplier),
      LessThan(3n * tokenIdMultiplier),
    ],
  },
  [ARBITRUM_BTC]: {
    $and: [
      GreaterThanOrEqual(1n * tokenIdMultiplier),
      LessThan(2n * tokenIdMultiplier),
    ],
  },
  [ARBITRUM_ARB]: {
    $and: [
      GreaterThanOrEqual(7n * tokenIdMultiplier),
      LessThan(8n * tokenIdMultiplier),
    ],
  },
  [ARBITRUM_CRV]: {
    $and: [
      GreaterThanOrEqual(36n * tokenIdMultiplier),
      LessThan(37n * tokenIdMultiplier),
    ],
  },
  [ARBITRUM_LINK]: {
    $and: [
      GreaterThanOrEqual(39n * tokenIdMultiplier),
      LessThan(40n * tokenIdMultiplier),
    ],
  },
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
