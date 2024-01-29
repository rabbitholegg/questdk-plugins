import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'

import { type Address } from 'viem'
import { PURCHASE_ABI, PURCHASE_TO_ABI } from './abi'
import { Chains, NULL_ADDRESS } from './const'
import { Contracts } from './contracts'

/**
 * Mint transaction filter for shared minter suite contracts.
 *
 * @remarks
 * Target "purchase" and "purchaseTo" calls on V3 compatible flagship contracts.
 * Use MintActionParams.tokenId as input.projectId.
 *
 * @param mint
 * @returns TransactionFilter targeting "purchase" calls on Art Blocks V3 contracts
 */
export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, tokenId, contractAddress, recipient } = mint
  const filterBase = {
    chainId,
    to:
      contractAddress === NULL_ADDRESS
        ? contractAddress
        : { $or: Object.values(Contracts) },
  }

  const inputBase = {
    ...(tokenId ? { projectId: tokenId } : {}),
  }

  return compressJson({
    $or: [
      {
        ...filterBase,
        from: recipient,
        input: { $abi: PURCHASE_ABI, ...inputBase },
      },
      {
        ...filterBase,
        input: { $abi: PURCHASE_TO_ABI, to: recipient, ...inputBase },
      },
    ],
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
  return [Chains.ETHEREUM, Chains.ARBITRUM]
}
