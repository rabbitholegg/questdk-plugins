import { getClient } from './client'
import { SUPPORTS_INTERFACE_FRAGMENT } from './constants'
import { ClaimCondition } from './types'
import { type FilterOperator } from '@rabbitholegg/questdk-plugin-utils'
import { type Abi, type Address, type PublicClient } from 'viem'

export async function getClaimConditionId(
  client: PublicClient,
  contractAddress: Address,
  abi: Abi,
  _tokenId?: number | string | bigint,
): Promise<bigint> {
  const claimConditionId = (await client.readContract({
    address: contractAddress,
    abi,
    functionName: 'getActiveClaimConditionId',
    args: _tokenId != null ? [_tokenId] : [],
  })) as bigint
  return claimConditionId
}

export async function getContractType(
  chainId: number,
  contractAddress: Address,
): Promise<'1155' | '721'> {
  const client = getClient(chainId)

  const abi = [SUPPORTS_INTERFACE_FRAGMENT]
  const interfaceIds = {
    '1155': '0xd9b67a26', // ERC-1155
    '721': '0x80ac58cd', // ERC-721
  }

  for (const [type, interfaceId] of Object.entries(interfaceIds)) {
    try {
      const supportsInterface = (await client.readContract({
        address: contractAddress,
        abi,
        functionName: 'supportsInterface',
        args: [interfaceId],
      })) as boolean

      if (supportsInterface) {
        return type as '1155' | '721'
      }
    } catch {}
  }
  throw new Error('Invalid contract type')
}

export function formatAmount(amount: FilterOperator | undefined) {
  if (amount === undefined) {
    return undefined
  }
  if (amount && ['string', 'number', 'bigint'].includes(typeof amount)) {
    return { $gte: amount }
  }

  return amount
}

export function getMintAmount(amount: FilterOperator | undefined) {
  if (!amount) {
    return 1n
  }
  // If the amount is a primitive, pass that value through
  if (['number', 'bigint'].includes(typeof amount)) {
    return BigInt(amount as number | bigint)
  }
  if (typeof amount === 'string' && !isNaN(Number(amount))) {
    return BigInt(amount)
  }

  // For $gte, the minimum amount required to pass is the value of $gte
  if (typeof amount === 'object' && '$gte' in amount && amount.$gte) {
    return BigInt(amount.$gte)
  }
  // For $gt, the minimum amount required to pass is the value of $gt + 1
  if (typeof amount === 'object' && '$gt' in amount && amount.$gt) {
    return BigInt(amount.$gt) + 1n
  }
  // For $lt or $lte, the minimum amount required to pass is 1
  return 1n
}

export async function getMintFee(
  client: PublicClient,
  contractAddress: Address,
  abi: Abi,
  claimConditionId: bigint,
  _tokenId?: number | string | bigint,
): Promise<bigint> {
  const claimCondition = (await client.readContract({
    address: contractAddress,
    abi,
    functionName: 'getClaimConditionById',
    args: _tokenId != null ? [_tokenId, claimConditionId] : [claimConditionId],
  })) as ClaimCondition

  return claimCondition.pricePerToken
}
