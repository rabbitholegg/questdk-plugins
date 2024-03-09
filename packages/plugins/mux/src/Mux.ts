import {
  type TransactionFilter,
  type OptionsActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import {
  CHAIN_ID_TO_ORDER_BOOK_ADDRESS,
  OrderBook__factory,
  CHAIN_ID_TO_AGGREGATOR_FACTORY_ADDRESS,
  AggregatorProxyFactory__factory,
  AggregatorGmxV2Adapter__factory,
} from '@mux-network/mux.js'
import { GNS_ABI } from './abi'
import { CHAIN_ID_TO_TOKENS, GNS_CONTRACT, GNS_REF_ADDRESS } from './constants'
import {
  buildSubAccountIdQuery,
  getTokenIn,
  getOrderTypeValue,
  getGmxV2OrderFlag,
  getGmxV2OrderType,
} from './helpers'
import { Chains, buildPathQuery } from './utils'

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

  const tokenIn = getTokenIn(token, chainId)
  const orderTypeValue = getOrderTypeValue(orderType)
  const gmxV2OrderFlag = getGmxV2OrderFlag(orderType)
  const gmxV2OrderType = getGmxV2OrderType(orderType)

  return compressJson({
    chainId,
    to: {
      $or: [
        muxContract.toLowerCase(),
        aggregatorContract.toLowerCase(),
        GNS_CONTRACT.toLowerCase(),
      ],
    },
    input: {
      $or: [
        {
          // mux contract
          $abi: OrderBook__factory.abi,
          subAccountId: subAccountQuery,
          collateralAmount: amount,
          deadline: orderTypeValue,
        },
        {
          // aggregator contract gmx V2
          $abi: AggregatorProxyFactory__factory.abi,
          args: {
            tokenIn: tokenIn,
            amountIn: amount,
            flags: gmxV2OrderFlag,
          },
        },
        {
          // aggregator contract gmx V2 multicall
          $abiAbstract: AggregatorGmxV2Adapter__factory.abi,
          createParams: {
            swapPath: buildPathQuery(tokenIn),
            initialCollateralAmount: amount,
            orderType: gmxV2OrderType,
          },
        },
        {
          // gns contract
          $abi: GNS_ABI,
          t: {
            // only DAI is used as collateral
            trader: recipient,
            positionSizeDai: amount,
          },
          orderType: orderTypeValue,
          referrer: GNS_REF_ADDRESS,
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return CHAIN_ID_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ARBITRUM_ONE]
}
