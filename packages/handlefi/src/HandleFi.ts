import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { zeroAddress, type Address } from 'viem'
import { ARBITRUM_ONE, SWAP_CONTRACTS } from './constants'
import {
  getParaSwapFilter,
  getV2RouterFilter,
  getHPSM2Filter,
} from './input-filters'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  console.log(swap.amountIn)
  return compressJson({
    chainId: ARBITRUM_ONE,
    value: swap.tokenIn === zeroAddress ? swap.amountIn : undefined,
    to: {
      $or: SWAP_CONTRACTS.map((address) => address.toLowerCase()),
    },
    input: {
      $or: [
        getParaSwapFilter(swap),
        getV2RouterFilter(swap),
        getHPSM2Filter(swap),
      ],
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
