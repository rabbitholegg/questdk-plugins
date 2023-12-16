
import { type TransactionFilter, type SwapActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'

export const swap = async (swap: SwapActionParams): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  return compressJson({
    chainId,
    to:  0x0,   // Use lowercase if using array
    input: {},
  })
}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  return []
}


export const getSupportedChainIds = async (): Promise<number[]> => {
  return []
}
