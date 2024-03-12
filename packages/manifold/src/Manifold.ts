import {
  compressJson,
  type MintActionParams,
  type TransactionFilter,
} from '@rabbitholegg/questdk'
import {
  chainIdToViemChain,
  Chains,
  type FilterOperator,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  createPublicClient,
  http,
  type Address,
  type ContractFunctionReturnType,
} from 'viem'
import {
  ABI_MINT,
  ABI_MULTI,
  ERC1155_CONTRACT,
  ERC721_CONTRACT,
  INSTANCEID_ABI,
} from './constants'

interface ManifoldInput {
  $abi: typeof ABI_MULTI | typeof ABI_MINT
  creatorContractAddress: string
  instanceId?: number | string
  mintCount?: FilterOperator | undefined
  mintFor?: string
}

const shouldIncludeAbiMint = (amount: FilterOperator | undefined): boolean => {
  if (amount == null) return true
  if (typeof amount === 'object') {
    if ('$gte' in amount && (amount.$gte as bigint) >= 2) return false
    if ('$gt' in amount && (amount.$gt as bigint) >= 1) return false
    if ('$eq' in amount && (amount.$eq as bigint) >= 2) return false
    if ('$lt' in amount && (amount.$lt as bigint) <= 1) return false
  } else {
    return Number(amount) === 1
  }
  return true
}

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  let instanceId: number | undefined = undefined

  if (tokenId) {
    const client = createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })

    try {
      const data: ContractFunctionReturnType<typeof INSTANCEID_ABI> =
        await client.readContract({
          address: ERC1155_CONTRACT, // ERC-721 should not use tokenId
          abi: INSTANCEID_ABI,
          functionName: 'getClaimForToken',
          args: [contractAddress, tokenId],
        })

      if (typeof data === 'object' && Array.isArray(data)) {
        instanceId = data[0]
      }
    } catch (e) {
      // no instanceId can be found for this tokenId
      // we should fail the transaction
      instanceId = 0
    }
  }

  const inputConditions: ManifoldInput[] = [
    {
      $abi: ABI_MULTI,
      creatorContractAddress: contractAddress,
      instanceId,
      mintCount: amount,
      mintFor: recipient,
    },
  ]

  if (shouldIncludeAbiMint(amount)) {
    inputConditions.push({
      $abi: ABI_MINT,
      creatorContractAddress: contractAddress,
      instanceId,
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
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.OPTIMISM, Chains.BASE]
}
