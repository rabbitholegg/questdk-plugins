
import { type TransactionFilter, type BridgeActionParams, type SwapActionParams, type MintActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'



export const mint = async (mint: MintActionParams): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = mint

  return compressJson({
    chainId: 0, 
    to:  0x0,  
    input: {}, 
  })
}


export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
}


export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating

}
