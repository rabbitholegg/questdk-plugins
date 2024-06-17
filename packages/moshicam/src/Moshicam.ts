import {
  type TransactionFilter,
  type MintActionParams,
  GreaterThanOrEqual,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address, type TransactionRequest, encodeFunctionData } from 'viem'
import {
  Chains,
  type MintIntentParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { IMOSHI_PIC1155_ABI } from './abi'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint
  return compressJson({
    chainId: chainId,
    to: contractAddress,
    input: {
      $abi: IMOSHI_PIC1155_ABI,
      to: recipient,
      id: tokenId,
      quantity: amount,
    },
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const data = encodeFunctionData({
    abi: IMOSHI_PIC1155_ABI,
    functionName: 'collect',
    args: [recipient, tokenId, 1],
  })

  return {
    from: recipient,
    to: contractAddress,
    data,
  }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BASE]
}
