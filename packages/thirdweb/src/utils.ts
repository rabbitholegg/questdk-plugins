import { SUPPORTS_INTERFACE_FRAGMENT } from './constants'
import {
  chainIdToViemChain,
  type FilterOperator,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address, type PublicClient, createPublicClient, http } from 'viem'

export function getAmount(amount: FilterOperator | undefined) {
  if (amount === undefined) {
    return undefined
  }
  if (amount && ['string', 'number', 'bigint'].includes(typeof amount)) {
    return { $gte: amount }
  }

  return amount
}

export async function getContractType(
  chainId: number,
  contractAddress: Address,
): Promise<'1155' | '721'> {
  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  }) as PublicClient

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
