import {
  type Chain,
  arbitrum,
  arbitrumGoerli,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  scrollTestnet,
  zkSync,
  zora,
} from 'viem/chains'

export type ChainMap = {
  [key: string]: Chain
}

export const SUPPORTED_REWARD_CHAINS: ChainMap = {
  [optimism.id]: optimism,
  [mainnet.id]: mainnet,
  [polygon.id]: polygon,
  [arbitrum.id]: arbitrum,
}

export const SUPPORTED_TASK_CHAINS: ChainMap = {
  [optimism.id]: optimism,
  [optimismGoerli.id]: optimismGoerli,
  [mainnet.id]: mainnet,
  [goerli.id]: goerli,
  [polygon.id]: polygon,
  [polygonMumbai.id]: polygonMumbai,
  [arbitrum.id]: arbitrum,
  [arbitrumGoerli.id]: arbitrumGoerli,
  [zora.id]: zora,
  [zkSync.id]: zkSync,
  [scrollTestnet.id]: scrollTestnet,
}
