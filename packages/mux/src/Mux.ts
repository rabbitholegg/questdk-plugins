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
  AggregatorProxyFactory__factory,
  PositionOrderFlags,
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

  const gmxV2OrderFlag =
    orderType === OrderType.Market
      ? {
          $bitmask: {
            bitmask: '0x40', // 64
            value: PositionOrderFlags.MarketOrder,
          },
        }
      : orderType === OrderType.Limit
      ? {
          $bitmask: {
            bitmask: '0x10', // 16
            value: PositionOrderFlags.TriggerOrder,
          },
        }
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
          $abi: AggregatorProxyFactory__factory.abi,
          args: {
            tokenIn: token,
            amountIn: amount,
            flags: gmxV2OrderFlag
          },
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
