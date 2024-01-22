import { JsonRpcProvider } from '@ethersproject/providers'
import { Chains } from './utils'

export const CHAIN_ID_TO_PROVIDER: { [chainId: number]: JsonRpcProvider } = {
  [Chains.ARBITRUM_ONE]: new JsonRpcProvider(
    'https://arbitrum-mainnet.infura.io/v3/6b31e45e4c9b456383e5ea5d8c0add97',
  ),
  [Chains.OPTIMISM]: new JsonRpcProvider(
    'https://optimism-mainnet.infura.io/v3/6b31e45e4c9b456383e5ea5d8c0add97',
  ),
}
