import { type FilterOperator } from '@rabbitholegg/questdk'
import { getReaderContract, getChainStorage, type Asset } from '@mux-network/mux.js'
import { CHAIN_ID_TO_PROVIDER } from './provider'
import { type Address, zeroAddress, getAddress } from 'viem'
import { Chains } from './utils'

const chainToWeth: { [chainId: number]: Address } = {
  [Chains.ARBITRUM_ONE]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  [Chains.OPTIMISM]: '0x4200000000000000000000000000000000000006',
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

export const buildSubAccountIdQuery = async (
  recipient: Address | undefined,
  tokenAddress: Address | undefined,
  chainId: number,
) => {
  const conditions: FilterOperator[] = []

  if (recipient) {
    conditions.push({ $regex: `^${recipient.toLowerCase()}` })
  }

  if (tokenAddress) {
    const tokenId = await getMuxTokenId(chainId, tokenAddress)
    const regexPattern = `0x[a-fA-F0-9]{40}${tokenId}`
    conditions.push({ $regex: regexPattern })
  }

  return {
    $and: conditions,
  }
}