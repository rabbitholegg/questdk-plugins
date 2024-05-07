import { NetworkName } from '../types/'

export const NETWORK_TO_CHAIN_ID: Record<NetworkName, number> = {
  ethereum: 0x1,
  'eth-mainnet': 0x1,
  'eth-goerli': 0x5,
  optimism: 0xa,
  'opt-mainnet': 0xa,
  'opt-goerli': 0x1a4,
  arbitrum: 0xa4b1,
  'arb-mainnet': 0xa4b1,
  'arb-goerli': 0x66eed,
  polygon: 0x89,
  'polygon-mainnet': 0x89,
  'polygon-mumbai': 0x13881,
  'eth-sepolia': 0xaa36a7,
  'zora-mainnet': 0x76adf1,
  'base-sepolia': 0x14a34,
  'zksync-mainnet': 0x144,
  zksync: 0x144,
  base: 0x2105,
  'base-mainnet': 0x2105,
  mantle: 0x1388,
  'mantle-mainnet': 0x1388,
  blast: 0x13e31,
  'blast-mainnet': 0x13e31,
  degen: 0x27bc86aa,
  'degen-mainnet': 0x27bc86aa,
} as const
  
export const NETWORK_TO_NAME: Record<NetworkName, string> = {
  ethereum: 'Ethereum',
  'eth-mainnet': 'Ethereum',
  'eth-goerli': 'Goerli',
  optimism: 'Optimism',
  'opt-mainnet': 'Optimism',
  'opt-goerli': 'Optimism Goerli',
  arbitrum: 'Arbitrum',
  'arb-mainnet': 'Arbitrum',
  'arb-goerli': 'Arbitrum Goerli',
  polygon: 'Polygon',
  'polygon-mainnet': 'Polygon',
  'polygon-mumbai': 'Polygon Mumbai',
  'eth-sepolia': 'Sepolia',
  'base-sepolia': 'Base Sepolia',
  'zora-mainnet': 'Zora',
  'zksync-mainnet': 'zkSync Era',
  zksync: 'zkSync Era',
  base: 'Base',
  'base-mainnet': 'Base',
  mantle: 'Mantle',
  'mantle-mainnet': 'Mantle',
  'blast-mainnet': 'Blast',
  blast: 'Blast',
  degen: 'Degen',
  'degen-mainnet': 'Degen',
} as const
  
export const CHAIN_ID_TO_NETWORK: Record<string, NetworkName> = Object.keys(
  NETWORK_TO_CHAIN_ID,
).reduce((acc, network) => {
  const chainId = NETWORK_TO_CHAIN_ID[network as NetworkName]
  return {
    ...acc,
    [chainId]: network,
  }
}, {})