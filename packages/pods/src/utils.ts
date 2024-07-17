import { ZORA_MINTER_ABI_1155 } from './abi'
import { type Address, type PublicClient, createPublicClient, http } from 'viem'
import {
  FilterOperator,
  chainIdToViemChain,
} from '@rabbitholegg/questdk-plugin-utils'

export type AndArrayItem =
  | { quantity: string | number | bigint | FilterOperator }
  | { minterArguments: { $regex: string } }
  | { tokenId: number | string }
  | { mintReferral: Address }
  | { rewardsRecipients: Address[] }
  | { $or: AndArrayItem[] }

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

export async function getUri(
  client: PublicClient,
  contractAddress: Address,
  tokenId?: number,
): Promise<string> {
  if (tokenId == null) {
    return (await client.readContract({
      address: contractAddress,
      abi: [
        {
          inputs: [],
          name: 'contractURI',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      functionName: 'contractURI',
    })) as string
  }

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
