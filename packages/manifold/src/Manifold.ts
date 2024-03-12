import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { Chains, type FilterOperator } from '@rabbitholegg/questdk-plugin-utils'
import {
  ERC721_CONTRACT,
  ERC1155_CONTRACT,
  ABI_MINT,
  ABI_MULTI,
} from './constants'

interface ManifoldInput {
  $abi: typeof ABI_MULTI | typeof ABI_MINT
  creatorContractAddress: string
  instanceId?: number | string
  mintCount?: FilterOperator | undefined
  mintFor?: string
}

// Function to evaluate if the ABI_MINT should not be included
const shouldIncludeAbiMint = (amount: FilterOperator | undefined): boolean => {
  if (amount == null) return true
  if (typeof amount === 'object') {
    if ('$gte' in amount && (amount.$gte as bigint) >= 2) return false
    if ('$gt' in amount && (amount.$gt as bigint) >= 1) return false
    if ('$eq' in amount && (amount.$eq as bigint) >= 2) return false
    if ('$lt' in amount && (amount.$lt as bigint) <= 1) return false // This might need special handling
  } else {
    return Number(amount) === 1
  }
  return true
}

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const inputConditions: ManifoldInput[] = [
    {
      $abi: ABI_MULTI,
      creatorContractAddress: contractAddress,
      instanceId: undefined,
      mintCount: amount,
      mintFor: recipient,
    },
  ]

  if (shouldIncludeAbiMint(amount)) {
    inputConditions.push({
      $abi: ABI_MINT,
      creatorContractAddress: contractAddress,
      instanceId: undefined,
      mintFor: recipient,
    })
  }

  return compressJson({
    chainId,
    to: {
      $or: [ERC721_CONTRACT.toLowerCase(), ERC1155_CONTRACT.toLowerCase()],
    },
    input: {
      $or: inputConditions,
    },
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
  return [Chains.OPTIMISM, Chains.BASE]
}
