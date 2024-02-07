import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'

import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address, zeroAddress } from 'viem'
import { purchaseABISet, purchaseToABISet } from './abi'
import { Contracts, LEGACY_CONTRACT_SET } from './contracts'

const legacyContracts = LEGACY_CONTRACT_SET.map((c) => c.toLowerCase())

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
      contractAddress === zeroAddress
        ? contractAddress
        : { $or: Object.values(Contracts).map((c) => c.toLowerCase()) },
  }

  const inputBase = {
    ...(tokenId !== undefined
      ? {
          // Support legacy minting contract input keys
          [legacyContracts.includes(contractAddress)
            ? '_projectId'
            : 'projectId']: tokenId,
        }
      : {}),
  }

  return compressJson({
    $or: [
      ...purchaseABISet.map((abi) => {
        return {
          ...filterBase,
          from: recipient,
          input: { $abi: abi, ...inputBase },
        }
      }),
      ...purchaseToABISet.map((abi) => {
        return {
          ...filterBase,
          input: {
            $abi: abi,
            // Support legacy minting contract input keys
            [legacyContracts.includes(contractAddress) ? '_to' : 'to']:
              recipient,
            ...inputBase,
          },
        }
      }),
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
  return [Chains.ETHEREUM, Chains.ARBITRUM_ONE]
}
