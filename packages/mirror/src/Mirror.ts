import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
  ActionType,
} from '@rabbitholegg/questdk'
import { type Address, encodeFunctionData, type TransactionRequest } from 'viem'
import { COLLECT_ENTRY_ABI } from './abi'
import { Chains } from './utils'
import type {
  MintIntentParams,
  DisctriminatedActionParams,
} from '@rabbitholegg/questdk-plugin-utils'

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

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] // supported tokens don't apply for the mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.OPTIMISM, Chains.ZORA, Chains.BASE, Chains.LINEA]
}

export const getDynamicNameParams = async (
  params: DisctriminatedActionParams,
): Promise<{ messages: Record<string, Record<string, string>>; values: Record<string, unknown>; }> => {
  
  if (params.type !== ActionType.Mint) {
    throw new Error(`Invalid action type "${params.type}"`)
  }
  const data = params.data
  const values: Record<string, unknown> = {
    actionType: 'Mint',
    originQuantity: data.amount ?? 1,
    originTargetImage: '', // NFT Image
    originTarget: '',      // NFT Name
    originAuthor: '',      // NFT Author/Artist
    originCollection: '',  // NFT Collection
    originNetwork: data.chainId,
    projectImage: '',
    project: 'Mirror',
  };
  const messages = {
    en: {
      'boost.mint':
        '{actionType} {originQuantity} {originTarget} {originCollection} {projectImage} {project} {originNetwork}',
      'mint.from': 'from the {collection} collection',
      'mint.anything': 'anything',
      exactly: 'exactly {amount}',
      'on.network': 'using {network}',
    },
  };
  return { messages, values }
}


