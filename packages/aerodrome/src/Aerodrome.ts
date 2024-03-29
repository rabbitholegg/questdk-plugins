import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address, zeroAddress } from 'viem'
import { Chains, CHAIN_TO_TOKENS } from '@rabbitholegg/questdk-plugin-utils'
import { buildPathQuery } from './utils'
import {
  AERODROME_ROUTER,
  ETH_FOR_TOKENS_FRAGMENTS,
  TOKENS_FOR_ETH_FRAGMENTS,
  TOKENS_FOR_TOKENS_FRAGMENTS,
  WETH_ADDRESS,
} from './constants'

export const swap = async (
  _params: SwapActionParams,
): Promise<TransactionFilter> => {
  const { chainId, tokenIn, tokenOut, amountIn, amountOut, recipient } = _params

  return compressJson({
    chainId,
    value: tokenIn === zeroAddress ? amountIn : undefined,
    to: AERODROME_ROUTER,
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
