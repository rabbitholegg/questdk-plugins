import {
  SMART_MARGIN_V3,
  SMART_MARGIN_V3_COMMIT_ORDER_ABI,
  USDC,
} from './constants.js'

import {
  type TransactionFilter,
  type OptionsActionParams,
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

export const options = async (
  _params: OptionsActionParams,
): Promise<TransactionFilter> => {
  // the ActionParams for this function are populated in the Boost Manager when the actual Boost is launched.

  // In this function you should load the ABI, and translate any ActionParams into the input object defined below
  // which should match the parameter names in the transaction

  // You can also use the boostdk filter system to support operators on parameters, for example, greater than

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  const { chainId, recipient, amount } = _params

  return compressJson({
    chainId,
    to: SMART_MARGIN_V3,
    from: recipient,
    input: {
      $abiAbstract: SMART_MARGIN_V3_COMMIT_ORDER_ABI,
      _sizeDelta: amount,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [USDC]
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BASE]
}
