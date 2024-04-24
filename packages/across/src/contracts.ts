import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const CHAIN_TO_SPOKEPOOL: { [chainId: number]: Address } = {
  [Chains.ETHEREUM]: '0x5c7bcd6e7de5423a257d81b442095a1a6ced35c5',
  [Chains.POLYGON_POS]: '0x9295ee1d8c5b022be115a2ad3c30c72e34e7f096',
  [Chains.OPTIMISM]: '0x6f26bf09b1c792e3228e5467807a900a503c0281',
  [Chains.ARBITRUM_ONE]: '0xe35e9842fceaca96570b734083f4a58e8f7c5f2a',
  [Chains.ZK_SYNC_ERA]: '0xe0b015e54d54fc84a6cb9b666099c46ade9335ff',
  [Chains.BASE]: '0x09aea4b2242abc8bb4bb78d537a67a245a7bec64',
}

export const CHAIN_TO_SPOKE_VERIFIER: { [chainId: number]: Address } = {
  [Chains.ETHEREUM]: '0xb4a8d45647445ea9fc3e1058096142390683dbc2',
  [Chains.POLYGON_POS]: '0xb4a8d45647445ea9fc3e1058096142390683dbc2',
  [Chains.OPTIMISM]: '0xb4a8d45647445ea9fc3e1058096142390683dbc2',
  [Chains.ARBITRUM_ONE]: '0xb4a8d45647445ea9fc3e1058096142390683dbc2',
  [Chains.ZK_SYNC_ERA]: '0xe0b015e54d54fc84a6cb9b666099c46ade9335ff',
  [Chains.BASE]: '0xb4a8d45647445ea9fc3e1058096142390683dbc2',
}

export const CHAIN_TO_WETH: { [chainId: number]: Address } = {
  [Chains.ETHEREUM]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [Chains.POLYGON_POS]: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC
  [Chains.OPTIMISM]: '0x4200000000000000000000000000000000000006',
  [Chains.ARBITRUM_ONE]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  [Chains.ZK_SYNC_ERA]: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
  [Chains.BASE]: '0x4200000000000000000000000000000000000006',
}
