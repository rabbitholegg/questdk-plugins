
import { type TransactionFilter, type BridgeActionParams, type SwapActionParams, type MintActionParams, compressJson } from '@rabbitholegg/questdk'
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

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: 0, // The chainId of the source chain
    to:  0x0,   // The contract address of the bridge
    input: {},  // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
}


export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating

}
