import {
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

export const SUPPORTED_REWARD_CHAINS = {
  [optimism.id]: optimism,
  [mainnet.id]: mainnet,
  [polygon.id]: polygon,
  [arbitrum.id]: arbitrum,
}

export const SUPPORTED_TASK_CHAINS = {
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
