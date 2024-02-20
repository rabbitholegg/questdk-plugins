import {
  createPublicClient,
  http,
  type Hash,
  type PublicClient,
  type Address,
  type Chain,
  zeroAddress,
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

const chains: Record<number, Chain> = {
  1: mainnet,
  10: optimism,
  42161: arbitrum,
  8453: base,
  137: polygon,
  324: zkSync,
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
      console.log('transaction found!')
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

const tokenAddressTypes = [
  'tokenIn',
  'tokenOut',
  'token',
  'tokenOne',
  'tokenTwo',
]

export async function getDecimals(response: any, chain: number) {
  console.log('getting token info...')
  const client = getClient(chains[chain])
  for (const key of Object.keys(response)) {
    if (tokenAddressTypes.includes(key)) {
      const address = response[key]
      if (address === zeroAddress) {
        return 18
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
        return decimals
      } catch {
        console.log('token address not found')
      }
    }
  }
  return 18
}
