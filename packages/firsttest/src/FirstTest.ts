import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'

  export const mint = async(_params: MintActionParams): Promise<TransactionFilter> => {
  return compressJson({
    chainId: '0x0', 
    to: '0x0', // The to field is the address of the contract we're interacting with
    input: {}, // The input object is where we'll put the ABI and the parameters
  })

  }

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return []
}
