import { type PublicClient, createPublicClient, http } from 'viem'
import { chainIdToViemChain } from '@rabbitholegg/questdk-plugin-utils'

export function getClient(chainId: number) {
  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  }) as PublicClient

  return client
}
