import { getClient } from './client'
import { SUPPORTS_INTERFACE_FRAGMENT } from './constants'
import { ClaimCondition } from './types'
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
  _client?: PublicClient,
): Promise<'1155' | '721'> {
  const client = _client || getClient(chainId)

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

export async function getClaimCondition(
  client: PublicClient,
  contractAddress: Address,
  abi: Abi,
  claimConditionId: bigint,
  _tokenId?: number | string | bigint,
): Promise<ClaimCondition> {
  const claimCondition = (await client.readContract({
    address: contractAddress,
    abi,
    functionName: 'getClaimConditionById',
    args: _tokenId != null ? [_tokenId, claimConditionId] : [claimConditionId],
  })) as ClaimCondition

  return claimCondition
}
