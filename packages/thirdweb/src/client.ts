import { chainIdToViemChain } from '@rabbitholegg/questdk-plugin-utils'
import { type PublicClient, createPublicClient, http } from 'viem'

export function getClient(chainId: number) {
  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  }) as PublicClient

  return client
}
