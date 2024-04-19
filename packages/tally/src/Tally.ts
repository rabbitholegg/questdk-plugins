import { TALLY_ABI } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { compressJson, type DelegateActionParams } from '@rabbitholegg/questdk'

export const delegate = async (delegateParams: DelegateActionParams) => {
  // This is the information we'll use to compose the Transaction object
  const { chainId, delegate, project } = delegateParams

  if (!delegate) {
    return compressJson({
      chainId: chainId, // The chainId of the source chain
      to: project, // The contract address of the governance platform
      input: {
        $abi: TALLY_ABI, // The ABI of the contract
      }, // The input object is where we'll put the ABI
    })
  }

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: chainId, // The chainId of the source chain
    to: project, // The contract address of the governance platform
    input: {
      $abi: TALLY_ABI, // The ABI of the contract
      delegatee: delegate, // The address of the delegatee
    }, // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return []
}

export const getSupportedChainIds = async () => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return CHAIN_ID_ARRAY // only supporting ARB right now
}
