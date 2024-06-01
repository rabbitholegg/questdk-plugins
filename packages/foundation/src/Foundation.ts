import {
  CHAIN_TO_CONTRACT_ADDRESS,
  DUTCH_AUCTION_FRAGMENT,
  FIXED_PRICE_FRAGMENTS,
} from './constants'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, amount, recipient } = mint

  const dropFactoryAddress = CHAIN_TO_CONTRACT_ADDRESS[chainId]

  return compressJson({
    chainId,
    to: dropFactoryAddress,
    input: {
      $abi: [...FIXED_PRICE_FRAGMENTS, DUTCH_AUCTION_FRAGMENT],
      count: amount ? { $gte: amount } : undefined,
      nftContract: contractAddress,
      nftRecipient: recipient,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Not used for Mint Action
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ETHEREUM, Chains.BASE]
}
