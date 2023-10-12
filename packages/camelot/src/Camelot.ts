
import { type TransactionFilter, type BridgeActionParams, type SwapActionParams, type MintActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { CHAIN_ID_ARRAY, ARBITRUM_CHAIN_ID } from './chain-ids'
import { DEFAULT_TOKEN_LIST_URL } from './contract-addresses'
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

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: 0, // The chainId of the source chain
    to:  0x0,   // The contract address of the bridge
    input: {},  // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  // Only return supported tokens for ARBITRUM_CHAIN_ID
  return _chainId === ARBITRUM_CHAIN_ID ? DEFAULT_TOKEN_LIST_URL : []
}


export const getSupportedChainIds = async (): Promise<number[]> => {
 return CHAIN_ID_ARRAY
}
