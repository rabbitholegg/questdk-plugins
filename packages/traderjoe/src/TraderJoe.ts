import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { LB_ROUTER } from './contract-addresses'
import { TRADER_JOE_SWAP_ABI } from './abi'
import { Tokens, buildPathQuery } from './utils'

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

  const ethUsedIn = tokenIn === Tokens.ETH
  const ethUsedOut = tokenOut === Tokens.ETH
  const to = contractAddress ?? LB_ROUTER

  return compressJson({
    chainId,
    to,
    value: ethUsedIn ? amountIn : undefined,
    input: {
      $abi: TRADER_JOE_SWAP_ABI,
      $or: [
        {
          amountIn: ethUsedIn ? undefined : amountIn,
          amountOutMin: amountOut,
          to: recipient,
          path: {
            tokenPath: buildPathQuery(
              ethUsedIn ? Tokens.WETH : tokenIn,
              ethUsedOut ? Tokens.WETH : tokenOut,
            ),
          },
        },
        {
          amountIn: amountIn,
          amountOutMinNATIVE: amountOut,
          to: recipient,
          path: {
            tokenPath: buildPathQuery(
              ethUsedIn ? Tokens.WETH : tokenIn,
              ethUsedOut ? Tokens.WETH : tokenOut,
            ),
          },
        },
        {
          amountOut: amountOut,
          to: recipient,
          path: {
            tokenPath: buildPathQuery(
              ethUsedIn ? Tokens.WETH : tokenIn,
              ethUsedOut ? Tokens.WETH : tokenOut,
            ),
          },
        },
        {
          amountNATIVEOut: amountOut,
          amountInMax: amountIn,
          to: recipient,
          path: {
            tokenPath: buildPathQuery(
              ethUsedIn ? Tokens.WETH : tokenIn,
              ethUsedOut ? Tokens.WETH : tokenOut,
            ),
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
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
}
