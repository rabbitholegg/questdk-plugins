import { ABI_MINT, ABI_MULTI, INSTANCE_ID_PARAMS } from './constants'
import {
  type FilterOperator,
  chainIdToViemChain,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type ContractFunctionReturnType,
  createPublicClient,
  http,
} from 'viem'

export interface ManifoldInput {
  $abiAbstract: typeof ABI_MULTI | typeof ABI_MINT
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

  for (const params of INSTANCE_ID_PARAMS) {
    try {
      const data: ContractFunctionReturnType<typeof params.abi> =
        await client.readContract({
          address: params.contract,
          abi: params.abi,
          functionName: 'getClaimForToken',
          args: [contractAddress, tokenId],
        })
      if (typeof data === 'object' && Array.isArray(data)) {
        return data[0]
      }
    } catch (e) {}
  }
  // no instanceId found
  return 0
}
