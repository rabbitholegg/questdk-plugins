import { ChainId, SUPPORTED_CHAINS } from '@uniswap/sdk-core'

const TESTNETS = [
  ChainId.GOERLI,
  ChainId.SEPOLIA,
  ChainId.OPTIMISM_GOERLI,
  ChainId.ARBITRUM_GOERLI,
  ChainId.POLYGON_MUMBAI,
  ChainId.CELO_ALFAJORES,
  ChainId.BASE_GOERLI,
]

export const CHAIN_ID_ARRAY = SUPPORTED_CHAINS.filter(
  (chainId) => !TESTNETS.includes(chainId),
)
