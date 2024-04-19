import {
  ETHEREUM_SPOKE,
  OPTIMISM_SPOKE,
  POLYGON_SPOKE,
  ZKSYNC_SPOKE,
  ARBITRUM_SPOKE,
  BASE_SPOKE,
} from './contract-addresses'
import {
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  ARBITRUM_CHAIN_ID,
  ZKSYNC_CHAIN_ID,
  BASE_CHAIN_ID,
} from './chain-ids'
export const CHAIN_TO_CONTRACT: { [chainId: number]: string } = {
  [ETH_CHAIN_ID]: ETHEREUM_SPOKE,
  [POLYGON_CHAIN_ID]: POLYGON_SPOKE,
  [OPTIMISM_CHAIN_ID]: OPTIMISM_SPOKE,
  [ARBITRUM_CHAIN_ID]: ARBITRUM_SPOKE,
  [ZKSYNC_CHAIN_ID]: ZKSYNC_SPOKE,
  [BASE_CHAIN_ID]: BASE_SPOKE,
} as const
