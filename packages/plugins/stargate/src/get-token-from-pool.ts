import { createPublicClient, http, type Address, type Chain } from 'viem'

// The only way to get the token is to lookup the factory, lookup the pool, then lookup the token
export const getTokenFromPool = async (
  poolId: bigint,
  chainId: number,
  addr: Address,
) => {
  const client = createPublicClient({
    chain: {
      id: chainId,
    } as Chain,
    transport: http(),
  })
  //Get Factory from Router
  const factory = await client.readContract({
    address: addr,
    abi: [
      {
        inputs: [],
        name: 'factory',
        outputs: [
          { internalType: 'contract Factory', name: '', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'factory',
  })
  // Get the pool from the factory
  const pool = await client.readContract({
    address: factory as Address,
    abi: [
      {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'getPool',
        outputs: [{ internalType: 'contract Pool', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'getPool',
    args: [poolId],
  })
  // Get the token from the pool
  return await client.readContract({
    address: pool as Address,
    abi: [
      {
        inputs: [],
        name: 'token',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'token',
  })
}
