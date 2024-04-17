import {
  ABI,
  CONTRACTS,
  MARKET_ORDER_TYPE,
  PAIRS,
  TOKENS,
  TOKEN_PAIRS,
} from './constants'
import {
  type FilterOperator,
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

  if (contractAddress !== undefined && !CONTRACTS.includes(contractAddress)) {
    throw new Error(
      "Unsupported 'contractAddress', use one of supported contracts: ${CONTRACTS}",
    )
  }
  const to = contractAddress ?? { $or: CONTRACTS }

  if (token !== undefined && !(token in TOKEN_PAIRS)) {
    throw new Error(
      "Unsupported 'token', use one of supported tokens: ${TOKENS}",
    )
  }
  const pairFilter: FilterOperator = token ? TOKEN_PAIRS[token] : { $or: PAIRS }

  let typeFilter = undefined
  if (orderType === OrderType.Market) {
    typeFilter = MARKET_ORDER_TYPE
  }
  if (orderType === OrderType.Limit) {
    typeFilter = { $gt: MARKET_ORDER_TYPE }
  }

  return compressJson({
    chainId,
    to,
    input: {
      $abi: ABI,
      t: {
        trader: recipient,
        pairIndex: pairFilter,
        positionSizeDai: amount,
      },
      _type: typeFilter,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return TOKENS
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ARBITRUM_ONE]
}
