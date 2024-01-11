import { getReaderContract, getChainStorage, type Asset } from '@mux-network/mux.js'
import { CHAIN_ID_TO_PROVIDER } from './provider'
import { type Address, zeroAddress, getAddress } from 'viem'

const chainToWeth: { [chainId: number]: Address } = {
  [42161]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  [10]: '0x4200000000000000000000000000000000000006',
}

const assetsCache = new Map()

export const getMuxTokenId = async (
  chainId: number,
  tokenAddress: Address,
): Promise<string | undefined> => {
  if (!tokenAddress) return undefined
  const provider = CHAIN_ID_TO_PROVIDER[chainId]
  if (!provider) {
    throw new Error(`No provider found for chain ${chainId}`)
  }

  // cache assets for each chain to reduce api calls
  let assets: Asset[]
  if (assetsCache.has(chainId)) {
    assets = assetsCache.get(chainId)
  } else {
    const reader = await getReaderContract(provider as any)
    const chainStorage = await getChainStorage(reader)
    assets = chainStorage.assets
    assetsCache.set(chainId, assets)
  }

  const tokenId = assets.find(
    (asset) =>
      asset.tokenAddress ===
      (tokenAddress === zeroAddress
        ? chainToWeth[chainId]
        : getAddress(tokenAddress)),
  )?.id

  if (!tokenId) return 'ff' // this value doesnt exist, using instead of error
  return tokenId.toString(16).padStart(2, '0')
}
