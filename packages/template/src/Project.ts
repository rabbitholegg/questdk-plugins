import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'

/*
 * Function template for handling various blockchain action types.
 * It's adaptable for actions defined in ActionParams: Bridge, Swap, Stake, Mint, Delegate, Quest, Etc.
 * Duplicate and customize for each specific action type.
 * If you wish to use a different action other than swap, import one of the ActionParams types
 * from @rabbitholegg/questdk (ie: SwapActionParams) and change the function below to use
 * the action params you wish to use.
 */

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  // This is the information we'll use to compose the Transaction object
  const { chainId, contractAddress, tokenIn } = swap

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId, 
    to: '0x0',
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
