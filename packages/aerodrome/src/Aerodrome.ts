import {
  AERODROME_ROUTER,
  ETH_FOR_TOKENS_FRAGMENTS,
  EXECUTE_ABI_FRAGMENTS,
  TOKENS_FOR_ETH_FRAGMENTS,
  TOKENS_FOR_TOKENS_FRAGMENTS,
  UNIVERSAL_ROUTER,
  V2_SWAP_EXACT_TYPES,
  V3_SWAP_EXACT_TYPES,
  WETH_ADDRESS,
} from './constants'
import { buildPathQuery, buildV2PathQuery, buildV3PathQuery } from './utils'
import {
  type SwapActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { CHAIN_TO_TOKENS, Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address, zeroAddress } from 'viem'

export const swap = async (
  _params: SwapActionParams,
): Promise<TransactionFilter> => {
  const { chainId, tokenIn, tokenOut, amountIn, amountOut, recipient } = _params

  const inputToken = tokenIn === zeroAddress ? WETH_ADDRESS : tokenIn
  const outputToken = tokenOut === zeroAddress ? WETH_ADDRESS : tokenOut

  return compressJson({
    chainId,
    value: tokenIn === zeroAddress ? amountIn : undefined,
    to: { $or: [AERODROME_ROUTER, UNIVERSAL_ROUTER] },
    input: {
      $or: [
        {
          // swapExactETHForTokens
          $abi: ETH_FOR_TOKENS_FRAGMENTS,
          amountOutMin: amountOut,
          routes: buildPathQuery(WETH_ADDRESS, tokenOut),
          to: recipient,
        },
        {
          // swapExactTokensForETH
          $abi: TOKENS_FOR_ETH_FRAGMENTS,
          amountIn: amountIn,
          amountOutMin: amountOut,
          routes: buildPathQuery(tokenIn, WETH_ADDRESS),
          to: recipient,
        },
        {
          // swapExactTokensForTokens
          $abi: TOKENS_FOR_TOKENS_FRAGMENTS,
          amountIn: amountIn,
          amountOutMin: amountOut,
          routes: buildPathQuery(tokenIn, tokenOut),
          to: recipient,
        },
        {
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
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return [Chains.BASE]
}
