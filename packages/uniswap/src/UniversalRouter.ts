import type { SwapActionParams } from '@rabbitholegg/questdk'
import { compressJson } from '@rabbitholegg/questdk'
import {
  UNIVERSAL_ROUTER_ADDRESS,
  WETH_ADDRESS,
} from '@uniswap/universal-router-sdk'
import { zeroAddress as ETH_ADDRESS } from 'viem'
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

  const inputToken = tokenIn === ETH_ADDRESS ? WETH_ADDRESS(chainId) : tokenIn

  return compressJson({
    chainId,
    to: contractAddress || UNIVERSAL_ROUTER_ADDRESS(chainId),
    from: recipient,
    input: {
      $abi: EXECUTE_ABI_FRAGMENTS,
      inputs: {
        $some: {
          $or: [
            {
              $abiParams: V3_SWAP_EXACT_TYPES,
              path: buildV3PathQuery(inputToken, tokenOut),
              amountIn,
              amountOut,
            },
            {
              $abiParams: V2_SWAP_EXACT_TYPES,
              path: buildV2PathQuery(inputToken, tokenOut),
              amountIn,
              amountOut,
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
