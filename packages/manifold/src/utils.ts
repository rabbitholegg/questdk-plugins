import {
  chainIdToViemChain,
  type FilterOperator,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  ERC1155_CONTRACT,
  INSTANCEID_ABI,
  ABI_MINT,
  ABI_MULTI,
} from './constants'
import {
  createPublicClient,
  http,
  type Address,
  type ContractFunctionReturnType,
} from 'viem'

export interface ManifoldInput {
  $abi: typeof ABI_MULTI | typeof ABI_MINT
  creatorContractAddress: string
  instanceId?: number | string
  mintCount?: FilterOperator | undefined
  mintFor?: string
}

export const shouldIncludeAbiMint = (
  amount: FilterOperator | undefined,
): boolean => {
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

export async function getInstanceId(
  chainId: number,
  contractAddress: Address,
  tokenId?: number,
): Promise<number | undefined> {
  if (tokenId == null) return undefined

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
      return data[0]
    }
  } catch (e) {
    // instanceId not found, return a value that is expected to fail
    return 0
  }
  return undefined
}
