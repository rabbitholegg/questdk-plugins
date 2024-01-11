import { getReaderContract, getChainStorage } from '@mux-network/mux.js'
import { CHAIN_ID_TO_PROVIDER } from './provider'
import { type Address, zeroAddress, getAddress } from 'viem'

const chainToWeth: { [chainId: number]: Address } = {
  [42161]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  [10]: '0x4200000000000000000000000000000000000006',
}

// need to cache this

export const getMuxTokenId = async (chainId: number, tokenAddress: Address) => {
  if (!tokenAddress) return undefined
  const provider = CHAIN_ID_TO_PROVIDER[chainId]
  if (!provider) return 'ff' // will fail since this value is not possible
  const reader = await getReaderContract(provider as any)
  const chainStorage = await getChainStorage(reader)
  const assets = chainStorage.assets
  const tokenId = assets.find(
    (asset) =>
      asset.tokenAddress ===
      (tokenAddress === zeroAddress
        ? chainToWeth[chainId]
        : getAddress(tokenAddress)),
  )?.id
  if (!tokenId) return 'ff'
  return tokenId.toString(16).padStart(2, '0')
}
