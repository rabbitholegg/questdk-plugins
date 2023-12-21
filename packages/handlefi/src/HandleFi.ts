import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { ARBITRUM_ONE, SWAP_CONTRACTS } from './constants'
import { getParaSwapFilter } from './input-filters'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {

  return compressJson({
    chainId: ARBITRUM_ONE,
    to: {
      $or: SWAP_CONTRACTS.map((address) => address.toLowerCase()),
    },
    input: {
      $or: [getParaSwapFilter(swap)],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return []
}
