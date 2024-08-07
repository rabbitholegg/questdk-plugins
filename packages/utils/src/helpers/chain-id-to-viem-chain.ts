import {
  arbitrum,
  base,
  baseSepolia,
  blast,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'viem/chains'

export const chainIdToViemChain = (chainId: number) => {
  switch (chainId) {
    case arbitrum.id:
      return arbitrum
    case base.id:
      return base
    case baseSepolia.id:
      return baseSepolia
    case blast.id:
      return blast
    case mainnet.id:
      return mainnet
    case optimism.id:
      return optimism
    case polygon.id:
      return polygon
    case sepolia.id:
      return sepolia
    case zora.id:
      return zora
    default:
      throw new Error(`Chain ID ${chainId} is not supported`)
  }
}
