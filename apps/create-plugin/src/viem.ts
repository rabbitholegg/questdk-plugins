import {
  createPublicClient,
  http,
  type Hash,
  type PublicClient,
  type Address,
  type Chain,
} from 'viem'
import {
  mainnet,
  base,
  optimism,
  arbitrum,
  polygon,
  zkSync,
  zora,
} from 'viem/chains'

interface Transaction {
  chainId: number
  from: Address
  hash?: Hash
  input: string
  to: Address
  value: string
}

const chainsArray = [mainnet, base, optimism, arbitrum, polygon, zkSync, zora]

function getClient(chain: Chain): PublicClient {
  return createPublicClient({
    chain,
    transport: http(`${chain.rpcUrls.default.http[0]}`),
  })
}

export async function getTransaction(hash: Hash): Promise<Transaction | null>{
  for (const chain of chainsArray) {
    const client = getClient(chain)
    try {
      const transaction = await client.getTransaction({ hash })
      return {
        chainId: transaction.chainId,
        from: transaction.from.toLowerCase(),
        to: transaction.to?.toLowerCase(),
        hash: transaction.hash as string,
        input: transaction.input,
        value: transaction.value.toString(),
      } as Transaction
    } catch {}
  }
  return null
}
