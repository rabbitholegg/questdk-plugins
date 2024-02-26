import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  type MintIntentParams,
  chainIdToViemChain,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address, type TransactionRequest, encodeFunctionData } from 'viem'
import { http, createPublicClient } from 'viem'
import { COLLECT_ENTRY_ABI } from './abi'
import { Chains } from './utils'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, recipient } = mint

  return compressJson({
    chainId,
    to: contractAddress,
    from: recipient,
    input: {
      $abi: COLLECT_ENTRY_ABI,
      tokenRecipient: recipient,
    },
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { contractAddress, recipient } = mint

  const data = encodeFunctionData({
    abi: COLLECT_ENTRY_ABI,
    functionName: 'purchase',
    args: [recipient, mint.tokenId.toString(), recipient],
  })
  // Note: Do we need to pass back value here?
  const transaction: TransactionRequest = {
    to: contractAddress,
    from: recipient,
    data,
  }

  return transaction
}

export const getProjectFees = async (
  mint: MintActionParams,
): Promise<bigint> => {
  const { chainId, contractAddress } = mint
  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  })

  // get treasuryConfiguration address
  const treasuryConfiguration = await client.readContract({
    address: contractAddress,
    abi: [
      {
        inputs: [],
        name: 'treasuryConfiguration',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'treasuryConfiguration',
  })

  // get feeConfiguration address
  const feeConfiguration = await client.readContract({
    address: treasuryConfiguration,
    abi: [
      {
        inputs: [],
        name: 'feeConfiguration',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'feeConfiguration',
  })

  // get platform fee
  const platformFee = await client.readContract({
    address: feeConfiguration,
    abi: [
      {
        inputs: [],
        name: 'flatFeeAmount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'flatFeeAmount',
  })

  // get nft price
  const nftPrice = await client.readContract({
    address: contractAddress,
    abi: [
      {
        inputs: [],
        name: 'price',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'price',
  })

  return platformFee + nftPrice
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] // supported tokens don't apply for the mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.OPTIMISM, Chains.ZORA, Chains.BASE, Chains.LINEA]
}
