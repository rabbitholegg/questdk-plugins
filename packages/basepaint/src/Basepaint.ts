
import { type MintActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { CONTRACT_ADDRESS, MINT_ABI } from './constants'

export const mint = async (mint: MintActionParams): Promise<TransactionFilter> => {
  const {
    address,
    tokenId,
    quantity,
  } = mint

  return compressJson({
    chainId: 8453, // base
    to:  address, // mint contract address
    input: {
      $abi: MINT_ABI,
      day: tokenId,
      count: quantity,
    },  
  })
}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
}


export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return [8453] // base
}
