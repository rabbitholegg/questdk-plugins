import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { BASE_CHAIN_ID, CONTRACT_ADDRESS, MINT_ABI } from './constants'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { contractAddress, tokenId, amount } = mint

  return compressJson({
    chainId: BASE_CHAIN_ID,
    to: contractAddress, // mint contract address
    input: {
      $abi: MINT_ABI,
      day: tokenId,
      count: amount,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [CONTRACT_ADDRESS]
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [BASE_CHAIN_ID]
}
