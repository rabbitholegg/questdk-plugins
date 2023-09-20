
import { type SwapActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import {
  CHAIN_ID_ARRAY,
  ARB_ONE_CHAIN_ID,
} from './chain-ids.js'
export const swap = async (swap: SwapActionParams): Promise<TransactionFilter> => {
  // This is the information we'll use to compose the Transaction object
  const {
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: 0, // The chainId of the source chain
    to:  0x0,   // The contract address of the swap
    input: {},  // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {

}


export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}
