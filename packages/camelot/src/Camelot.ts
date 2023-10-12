import {
  type TransactionFilter,
  type BridgeActionParams,
  type SwapActionParams,
  type MintActionParams,
  compressJson,
  FilterOperator,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { CHAIN_ID_ARRAY, ARBITRUM_CHAIN_ID } from './chain-ids'
import {
  DEFAULT_TOKEN_LIST_URL,
  WETH_ADDRESS_ARBITRUM,
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
  const { chainId, contractAddress, tokenIn, tokenOut, amountOut, recipient } =
    swap
  const amountIn = tokenIn === WETH_ADDRESS_ARBITRUM ? swap.amountIn : undefined

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: chainId, // The chainId of the source chain
    to: contractAddress || CAMELOT_ROUTER, // The contract address of the bridge
    input: {
      $abi: CAMELOT_ABI, // The ABI of the bridge
      to: recipient, // The recipient of the swap
      path: buildPathQuery(tokenIn, tokenOut), // The path of the swap
      amountOutMin: amountOut, // The minimum amount of tokens to receive
      amountIn: amountIn, // The amount of tokens to send
    }, // The input object is where we'll put the ABI and the parameters
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
