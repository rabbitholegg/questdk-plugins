import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { SUPPORTED_CHAINS_ARRAY, type SupportedChainId } from './chain-ids'
import { getRouterAddress } from './contract-addresses'
import * as abi from './abi'
import { getTokenAddresses } from './pendle-backend'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const { chainId, tokenIn, amountIn } = swap

  const to = SUPPORTED_CHAINS_ARRAY.includes(chainId)
    ? getRouterAddress(chainId as SupportedChainId)
    : undefined

  return compressJson({
    chainId,
    to,
    input: {
      $abi: abi.SWAP_EXACT_TOKEN_FOR_YT,
      input: {
        tokenIn: tokenIn,
        netTokenIn: amountIn,
      },
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return getTokenAddresses(_chainId as SupportedChainId)
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return SUPPORTED_CHAINS_ARRAY
}
