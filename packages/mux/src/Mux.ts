import {
  type TransactionFilter,
  type OptionsActionParams,
  OrderType,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { CHAIN_ID_TO_ORDER_BOOK_ADDRESS } from '@mux-network/mux.js'
import { MUX_ORDERBOOK_ABI } from './abi'
import { buildSubAccountIdQuery } from './utils'

export const options = async (
  trade: OptionsActionParams,
): Promise<TransactionFilter> => {
  const { chainId, token, amount, recipient, orderType } =
    trade

  const muxContract = CHAIN_ID_TO_ORDER_BOOK_ADDRESS[chainId] ?? '0x0'
  const subAccountQuery = await buildSubAccountIdQuery(recipient, token, chainId)

  return compressJson({
    chainId,
    to: {
      $or: [muxContract.toLowerCase()],
    },
    input: {
      $or: [
        {
          $abi: MUX_ORDERBOOK_ABI,
          subAccountId: subAccountQuery,
          collateralAmount: amount,
          deadline: orderType === OrderType.Market ? 0 : { $gte: '0' },
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
