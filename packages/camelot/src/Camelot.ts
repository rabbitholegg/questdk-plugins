import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
  type FilterOperator,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { CHAIN_ID_ARRAY, ARBITRUM_CHAIN_ID } from './chain-ids'
import {
  DEFAULT_TOKEN_LIST_URL,
  ETH_ADDRESS,
  WETH_ADDRESS,
} from './contract-addresses'
import { CAMELOT_ABI } from './abi'
import { CAMELOT_ROUTER } from './contract-addresses'

export const buildPathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v2 paths are formatted as [<token>, <token>]
  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $first: tokenIn })
  }

  if (tokenOut) {
    conditions.push({ $last: tokenOut })
  }

  return {
    $and: conditions,
  }
}

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  const ethUsed = tokenIn === ETH_ADDRESS

  return compressJson({
    chainId: chainId,
    to: contractAddress || CAMELOT_ROUTER,
    value: ethUsed ? amountIn : undefined,
    input: {
      $abi: CAMELOT_ABI,
      to: recipient,
      path: buildPathQuery(ethUsed ? WETH_ADDRESS : tokenIn, tokenOut), // The path of the swap
      amountOutMin: amountOut, // The minimum amount of tokens to receive
      amountIn: ethUsed ? undefined : amountIn, // The amount of tokens to send
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Only return supported tokens for ARBITRUM_CHAIN_ID
  return _chainId === ARBITRUM_CHAIN_ID ? DEFAULT_TOKEN_LIST_URL : []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
