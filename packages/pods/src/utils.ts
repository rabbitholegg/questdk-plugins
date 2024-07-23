import { ZORA_MINTER_ABI_1155 } from './abi'
import { type Address, type PublicClient, createPublicClient, http } from 'viem'
import { chainIdToViemChain } from '@rabbitholegg/questdk-plugin-utils'

export async function getLatestTokenId(
  contractAddress: Address,
  chainId: number,
  _client?: PublicClient,
): Promise<number> {
  try {
    const client =
      _client ??
      createPublicClient({
        chain: chainIdToViemChain(chainId),
        transport: http(),
      })

    const result = (await client.readContract({
      address: contractAddress,
      abi: ZORA_MINTER_ABI_1155,
      functionName: 'nextTokenId',
    })) as bigint

    return Number(result) - 1
  } catch {
    // fallback in case of error
    return 1
  }
}
