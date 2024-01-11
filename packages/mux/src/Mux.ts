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
  AggregatorGmxV2Adapter__factory,
} from '@mux-network/mux.js'
import { buildSubAccountIdQuery } from './helpers'
import { buildPathQuery } from './utils'

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

  const gmxV2OrderType =
        // https://arbiscan.io/address/0xe1b50bba2255bbc60e4d4cdb4c77df61d1fddd8d#code (IOrder.sol)
    orderType === OrderType.Market
      ? 2 // MarketIncrease
      : orderType === OrderType.Limit
      ? 3 // LimitIncrease
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
            flags: gmxV2OrderFlag,
          },
        },
        {
          $abiAbstract: AggregatorGmxV2Adapter__factory.abi,
          createParams: {
            swapPath: buildPathQuery(token),
            initialCollateralAmount: amount,
            orderType: gmxV2OrderType,
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
