import {
  BINANCE_SPOKE,
  LAYER2_SPOKE, // arbitrum, optimism
  MAIN_SPOKE, // mainnet, polygon, avalanche
} from './contract-addresses.js'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import type { Address } from 'viem'

export const CHAIN_TO_CONTRACT: { [chainId: number]: Address } = {
  [Chains.ETHEREUM]: MAIN_SPOKE,
  [Chains.OPTIMISM]: LAYER2_SPOKE,
  [Chains.BINANCE_SMART_CHAIN]: BINANCE_SPOKE,
  [Chains.POLYGON_POS]: MAIN_SPOKE,
  [Chains.ARBITRUM_ONE]: LAYER2_SPOKE,
  [Chains.AVALANCHE]: MAIN_SPOKE,
}
