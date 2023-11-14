import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { LB_ROUTER, DEFAULT_SWAP_TOKEN_LIST } from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
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
      $and: [
        {
          to: recipient,
          path: {
            tokenPath: buildPathQuery(
              ethUsedIn ? Tokens.WETH : tokenIn,
              ethUsedOut ? Tokens.WETH : tokenOut,
            ),
          },
        },
        {
          $or: [
            {
              amountIn: ethUsedIn ? undefined : amountIn,
              amountOutMin: amountOut,
            },
            { amountOut: amountOut },
            { amountIn: amountIn, amountOutMinNATIVE: amountOut },
            { amountNATIVEOut: amountOut, amountInMax: amountIn },
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
