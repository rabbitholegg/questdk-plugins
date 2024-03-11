import {
  compressJson,
  type SwapActionParams,
  type TransactionFilter,
} from '@rabbitholegg/questdk'
import { zeroAddress as ETH_ADDRESS } from 'viem'
import {
  CHAIN_ID_ARRAY,
  V2_SWAP_EXACT_TYPES,
  V3_SWAP_EXACT_TYPES,
  EXECUTE_ABI_FRAGMENTS,
} from './constants'
import {
  buildV2PathQuery,
  buildV3PathQuery,
  getUniversalRouter,
  getWETHAddress,
} from './utils'
import { CHAIN_TO_TOKENS } from './token-addresses'

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

  const inputToken =
    tokenIn === ETH_ADDRESS ? getWETHAddress(chainId).toLowerCase() : tokenIn
  const outputToken =
    tokenOut === ETH_ADDRESS ? getWETHAddress(chainId).toLowerCase() : tokenOut

  return compressJson({
    chainId,
    to: contractAddress || getUniversalRouter(chainId),
    from: recipient,
    input: {
      $abi: EXECUTE_ABI_FRAGMENTS,
      inputs: {
        $some: {
          $or: [
            {
              $abiParams: V3_SWAP_EXACT_TYPES,
              path: buildV3PathQuery(inputToken, outputToken),
              amountIn,
              amountOut,
            },
            {
              $abiParams: V2_SWAP_EXACT_TYPES,
              path: buildV2PathQuery(inputToken, outputToken),
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
  return CHAIN_ID_ARRAY as number[]
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return CHAIN_TO_TOKENS[_chainId] ?? []
}
