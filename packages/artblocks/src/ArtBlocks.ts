import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'

import { type Address } from 'viem'
import { Chains, Contracts, SHARED_MINTER_ABI } from './const'

type InputSchema = { $abi: typeof SHARED_MINTER_ABI; projectId?: number }

/**
 * Mint transaction filter for shared minter suite contracts.
 *
 * @remarks
 * Target "purchase" calls on V3 compatible flagship contracts.
 * Use MintActionParams.tokenId as input.projectId.
 *
 * @param mint
 * @returns TransactionFilter targeting "purchase" calls on Art Blocks V3 contracts
 */
export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, tokenId, contractAddress } = mint
  const input: InputSchema = {
    $abi: SHARED_MINTER_ABI,
  }

  if (tokenId) {
    input.projectId = tokenId
  }

  return compressJson({
    chainId,
    to: {
      // Match the supplied contract address and ensure it's a V3 flagship contract
      $and: [{ $eq: contractAddress }, { $or: Object.values(Contracts) }],
    },
    input,
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return [Chains.ETHEREUM]
}
