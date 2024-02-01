import {
  type TransactionFilter,
    {{#each actionTypes}}
  type {{capitalize this}}ActionParams,
  {{/each}}
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

/*
 * Function templates for handling various blockchain action types.
 * It's adaptable for actions defined in ActionParams: Bridge, Swap, Stake, Mint, Delegate, Quest, Etc.
 * Duplicate and customize for each specific action type.
 * If you wish to use a different action other than swap, import one of the ActionParams types
 * from @rabbitholegg/questdk (ie: SwapActionParams) and change the function below to use
 * the action params you wish to use.
 */

  {{#each actionTypes}}
  export const {{lowercase this}} = async(_params: {{capitalize this}}ActionParams): Promise<TransactionFilter> => {

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId, 
    to: '0x0', // The to field is the address of the contract we're interacting with
    input: {}, // The input object is where we'll put the ABI and the parameters
  })

  }

  {{/each}}


export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return [{{#each chains}}Chains.{{this}}, {{/each}}]
}
