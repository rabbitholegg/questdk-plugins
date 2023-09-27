
import { type DelegateActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { TALLY_ABI } from './abi.js'
// If you're implementing swap or mint, simply duplicate this function and change the name
export const delegate = async (delegate: DelegateActionParams): Promise<TransactionFilter> => {
  // This is the information we'll use to compose the Transaction object
  const {
    chainId,
    delegatee,
    project
  } = delegate

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: chainId, // The chainId of the source chain
    to:  project,   // The contract address of the governance platform
    input: {
      $abi: TALLY_ABI, // The ABI of the contract
      delegatee: delegatee, // The address of the delegatee
    },  // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
}


export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating

}
