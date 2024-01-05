import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address, zeroAddress as NATIVE_TOKEN } from 'viem'
import { LBRouterV21ABI, LB_ROUTER_V21_ADDRESS } from '@traderjoe-xyz/sdk-v2'
import { DEFAULT_SWAP_TOKEN_LIST, Tokens } from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { buildPathQuery, Chains } from './utils'
import {
  EXACT_NATIVE_FOR_TOKENS_ABI,
  EXACT_TOKENS_FOR_NATIVE_ABI,
  EXACT_TOKENS_FOR_TOKENS_ABI,
  NATIVE_FOR_EXACT_TOKENS_ABI,
  TOKENS_FOR_EXACT_NATIVE_ABI,
  TOKENS_FOR_EXACT_TOKENS_ABI,
} from './abi'

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

  const nativeIn = tokenIn === NATIVE_TOKEN
  const nativeOut = tokenOut === NATIVE_TOKEN
  const to = contractAddress ?? LB_ROUTER_V21_ADDRESS[chainId as Chains]

  const input = {
    $abi: LBRouterV21ABI,
    to: recipient,
    path: {
      tokenPath: buildPathQuery(
        nativeIn ? Tokens[chainId]?.WETH : tokenIn,
        nativeOut ? Tokens[chainId]?.WETH : tokenOut,
      ),
    },
  }

  return compressJson({
    chainId,
    to,
    value: nativeIn ? amountIn : tokenIn ? 0 : undefined,
    input: {
      $and: [
        input,
        {
          $or: [
            {
              // exactNativeforTokens
              $abi: EXACT_NATIVE_FOR_TOKENS_ABI,
              amountOutMin: amountOut,
            },
            {
              // exactNativeforTokens
              $abi: EXACT_TOKENS_FOR_TOKENS_ABI,
              amountIn,
              amountOutMin: amountOut,
            },
            { $abi: NATIVE_FOR_EXACT_TOKENS_ABI, amountOut: amountOut }, // nativeForExactTokens
            {
              $abi: TOKENS_FOR_EXACT_TOKENS_ABI,
              amountInMax: amountIn,
              amountOut: amountOut,
            }, // tokensForExactTokens
            {
              $abi: EXACT_TOKENS_FOR_NATIVE_ABI,
              amountIn: amountIn,
              amountOutMinNATIVE: amountOut,
            }, // exactTokensForNative
            {
              $abi: TOKENS_FOR_EXACT_NATIVE_ABI,
              amountInMax: amountIn,
              amountNATIVEOut: amountOut,
            }, // tokensForExactNative
          ],
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return (DEFAULT_SWAP_TOKEN_LIST[_chainId] as Address[]) ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
