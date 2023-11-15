import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { LBRouterV21ABI, LB_ROUTER_V21_ADDRESS } from '@traderjoe-xyz/sdk-v2'
import { ChainId } from '@traderjoe-xyz/sdk-core'
import { DEFAULT_SWAP_TOKEN_LIST } from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
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
  const to = contractAddress ?? LB_ROUTER_V21_ADDRESS[chainId as ChainId]

  return compressJson({
    chainId,
    to,
    value: ethUsedIn ? amountIn : undefined,
    input: {
      $abi: LBRouterV21ABI,
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
