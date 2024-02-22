import type { Address } from 'viem'

import {
  MAIN_SPOKE, // mainnet, polygon, avalanche
  LAYER2_SPOKE, // arbitrum, optimism
  BINANCE_SPOKE,
} from './contract-addresses.js'

import {
  type ChainIds,
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  BINANCE_CHAIN_ID,
  POLYGON_CHAIN_ID,
  ARBITRUM_CHAIN_ID,
  AVALANCHE_CHAIN_ID,
} from './chain-ids.js'

export const CHAIN_TO_CONTRACT: { [chainId in ChainIds]: Address } = {
  [ETH_CHAIN_ID]: MAIN_SPOKE,
  [OPTIMISM_CHAIN_ID]: LAYER2_SPOKE,
  [BINANCE_CHAIN_ID]: BINANCE_SPOKE,
  [POLYGON_CHAIN_ID]: MAIN_SPOKE,
  [ARBITRUM_CHAIN_ID]: LAYER2_SPOKE,
  [AVALANCHE_CHAIN_ID]: MAIN_SPOKE,
} as const
