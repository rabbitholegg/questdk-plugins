import {
  ABI,
  GNS_TRADING_CONTRACT,
  MARKET_ORDER_TYPE,
  tokenToId,
} from './constants'
import {
  type OptionsActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains, OrderType } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const options = async (
  params: OptionsActionParams,
): Promise<TransactionFilter> => {
  const { recipient, amount, orderType, chainId, contractAddress, token } =
    params

  // if tokenToId doesn't have the token, it will force failure
  if (token && tokenToId[token] === undefined) {
    throw new Error('Invalid token')
  }

  const tokenPair = token ? tokenToId[token] : undefined

  let typeFilter = undefined
  if (orderType === OrderType.Market) {
    typeFilter = MARKET_ORDER_TYPE
  }
  if (orderType === OrderType.Limit) {
    typeFilter = { $gt: MARKET_ORDER_TYPE }
  }

  return compressJson({
    chainId,
    to: contractAddress ?? GNS_TRADING_CONTRACT,
    input: {
      $abi: ABI,
      t: {
        trader: recipient,
        pairIndex: tokenPair,
        positionSizeDai: amount,
      },
      _type: typeFilter,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  if (_chainId !== Chains.ARBITRUM_ONE) {
    return Object.keys(tokenToId) as Address[]
  }
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ARBITRUM_ONE]
}
