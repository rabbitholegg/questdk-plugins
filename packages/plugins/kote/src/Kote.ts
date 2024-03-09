import {
  type TransactionFilter,
  compressJson,
  type MintActionParams,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { VILLAGER_MINT_ADDRESS, VILLAGER_MINT_ABI } from './constants'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, recipient } = mint

  return compressJson({
    chainId,
    from: recipient,
    to: contractAddress ?? VILLAGER_MINT_ADDRESS,
    input: {
      $abi: VILLAGER_MINT_ABI,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] // not needed for mint plugin
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ARBITRUM_ONE]
}
