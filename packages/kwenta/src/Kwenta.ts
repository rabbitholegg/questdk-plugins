import {
  SMART_MARGIN_V3,
  SMART_MARGIN_V3_COMMIT_ORDER_ABI,
  TOKEN_TO_MARKET,
  WBTC,
  WETH,
} from './constants.js'
import {
  type OptionsActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const options = async (
  options: OptionsActionParams,
): Promise<TransactionFilter> => {
  const { chainId, recipient, amount, token } = options
  const marketId = token !== undefined ? TOKEN_TO_MARKET[token] : undefined

  return compressJson({
    chainId,
    to: SMART_MARGIN_V3,
    from: recipient,
    input: {
      $abiAbstract: SMART_MARGIN_V3_COMMIT_ORDER_ABI,
      _sizeDelta: amount,
      _perpsMarketId: marketId,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [WETH, WBTC]
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BASE]
}
