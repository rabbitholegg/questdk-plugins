import {
  type Address,
  type Chain,
  type Hash,
  type PublicClient,
  createPublicClient,
  http,
  isAddress,
  zeroAddress,
} from 'viem'
import {
  arbitrum,
  base,
  blast,
  mainnet,
  optimism,
  polygon,
  zkSync,
  zora,
} from 'viem/chains'
import { green, yellow } from 'picocolors'

interface Transaction {
  chainId: number
  from: Address
  hash?: Hash
  input: string
  to: Address
  value: string
}

const chains: Record<number, Chain> = {
  1: mainnet,
  10: optimism,
  137: polygon,
  324: zkSync,
  8453: base,
  42161: arbitrum,
  81457: blast,
  7777777: zora,
}

function getClient(chain: Chain): PublicClient {
  return createPublicClient({
    chain,
    transport: http(`${chain.rpcUrls.default.http[0]}`),
  })
}

export async function getTransaction(hash: Hash): Promise<Transaction | null> {
  console.log('looking for transaction...')
  for (const chain of Object.values(chains)) {
    const client = getClient(chain)
    try {
      const transaction = await client.getTransaction({ hash })
      console.log(green('transaction found!'))
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

export async function getTokenInfo(address: Address, chain: number) {
  if (isAddress(address)) {
    const client = getClient(chains[chain])
    if (address === zeroAddress) {
      return { decimals: 18, symbol: 'ETH' }
    }
    try {
      const decimals = await client.readContract({
        address,
        abi: [
          {
            inputs: [],
            name: 'decimals',
            outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'decimals',
      })
      const symbol = await client.readContract({
        address,
        abi: [
          {
            inputs: [],
            name: 'symbol',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'symbol',
      })
      return { decimals, symbol }
    } catch {
      console.log(
        yellow(`decimals for token ${address} not found... using default decimal value 18`),
      )
      return { decimals: 18 }
    }
  }
  return { decimals: 18 }
}
