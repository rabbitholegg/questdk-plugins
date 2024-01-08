import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { SUPPORTED_CHAINS_ARRAY, type SupportedChainId } from './chain-ids'
import { getRouterAddress } from './contract-addresses'
import { SwapYTV3_ABI } from './abi'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const { chainId } = swap

  const to = SUPPORTED_CHAINS_ARRAY.includes(chainId)
    ? getRouterAddress(chainId as SupportedChainId)
    : undefined

  return compressJson({
    chainId,
    to,
    input: {
      $abi: SwapYTV3_ABI,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return SUPPORTED_CHAINS_ARRAY
}
