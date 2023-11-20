import type { SwapActionParams } from '@rabbitholegg/questdk'
import { compressJson } from '@rabbitholegg/questdk'
import { UNIVERSAL_ROUTER_ADDRESS } from '@uniswap/universal-router-sdk'
import {
  V2_SWAP_EXACT_TYPES,
  V3_SWAP_EXACT_TYPES,
  EXECUTE_ABI_FRAGMENTS,
} from './constants'
import { buildV2PathQuery, buildV3PathQuery } from './utils'

export const swap = async (swap: SwapActionParams) => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  return compressJson({
    chainId,
    to: contractAddress || UNIVERSAL_ROUTER_ADDRESS(chainId),
    input: {
      $abi: EXECUTE_ABI_FRAGMENTS,
      inputs: {
        $some: {
          $or: [
            {
              $abiParams: V3_SWAP_EXACT_TYPES,
              path: buildV3PathQuery(tokenIn, tokenOut),
              amountIn,
              amountOut,
              recipient,
            },
            {
              $abiParams: V2_SWAP_EXACT_TYPES,
              path: buildV2PathQuery(tokenIn, tokenOut),
              amountIn,
              amountOut,
              recipient,
            },
          ],
        },
      },
    },
  })
}

export const getSupportedChainIds = async () => {
  return []
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return []
}
