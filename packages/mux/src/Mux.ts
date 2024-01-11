import {
  type TransactionFilter,
  type OptionsActionParams,
  OrderType,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import {
  CHAIN_ID_TO_ORDER_BOOK_ADDRESS,
  OrderBook__factory,
  CHAIN_ID_TO_AGGREGATOR_FACTORY_ADDRESS,
  AggregatorGmxV2Adapter__factory,
} from '@mux-network/mux.js'
import { buildSubAccountIdQuery } from './helpers'

export const options = async (
  trade: OptionsActionParams,
): Promise<TransactionFilter> => {
  const { chainId, token, amount, recipient, orderType } = trade
  const muxContract = CHAIN_ID_TO_ORDER_BOOK_ADDRESS[chainId] ?? '0x0'
  const aggregatorContract =
    CHAIN_ID_TO_AGGREGATOR_FACTORY_ADDRESS[chainId] ?? '0x0'
  const subAccountQuery = await buildSubAccountIdQuery(
    recipient,
    token,
    chainId,
  )
  const muxDeadline =
    orderType === OrderType.Market
      ? 0
      : orderType === OrderType.Limit
      ? { $gt: '0' }
      : undefined

  return compressJson({
    chainId,
    to: {
      $or: [muxContract.toLowerCase(), aggregatorContract.toLowerCase()],
    },
    input: {
      $or: [
        {
          $abi: OrderBook__factory.abi,
          subAccountId: subAccountQuery,
          collateralAmount: amount,
          deadline: muxDeadline,
        },
        {
          $abi: AggregatorGmxV2Adapter__factory.abi,
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return []
}
