import { JsonRpcProvider } from '@ethersproject/providers'

export const CHAIN_ID_TO_PROVIDER: { [chainId: number]: JsonRpcProvider } = {
  [42161]: new JsonRpcProvider('https://arbitrum-mainnet.infura.io/v3/6b31e45e4c9b456383e5ea5d8c0add97'),
  [10]: new JsonRpcProvider('https://optimism-mainnet.infura.io/v3/6b31e45e4c9b456383e5ea5d8c0add97'),
}