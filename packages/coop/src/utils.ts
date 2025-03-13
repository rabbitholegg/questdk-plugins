import { type Address, type PublicClient } from 'viem'
import { FilterOperator } from '@rabbitholegg/questdk-plugin-utils'

export type AndArrayItem =
  | { quantity: string | number | bigint | FilterOperator }
  | { minterArguments: { $regex: string } }
  | { tokenId: number | string }
  | { mintReferral: Address }
  | { rewardsRecipients: Address[] }
  | { $or: AndArrayItem[] }

export async function getUri(
  client: PublicClient,
  contractAddress: Address,
  tokenId: number,
): Promise<string> {
  return (await client.readContract({
    address: contractAddress,
    abi: [
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'uri',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'uri',
    args: [BigInt(tokenId)],
  })) as string
}
