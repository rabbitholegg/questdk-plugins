import {
  type TransactionFilter,
  compressJson,
  type MintActionParams,
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

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  // This is the information we'll use to compose the Transaction object
  const { chainId, contractAddress } = mint

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId,
    to: contractAddress,
    input: [{
      "inputs": [],
      "name": "mintNormal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }],
  })
}



export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {

  return ["0x292ff0f0c19373dd9c50fabba574aaaf6e1bc11b"]
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [42161]
}
