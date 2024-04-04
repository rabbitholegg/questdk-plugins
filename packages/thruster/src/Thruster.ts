import {
  BLAST_WETH,
  ETH_FOR_EXACT_TOKENS_FRAGMENT,
  ETH_FOR_TOKENS_FRAGMENTS,
  THRUSTER_V2_ADDRESS,
  THRUSTER_V3_EXACT_INPUT_ABI,
  THRUSTER_V3_EXACT_OUTPUT_ABI,
  THRUSTER_V3_ADDRESS,
  TOKENS_FOR_ETH_FRAGMENTS,
  TOKENS_FOR_EXACT_ETH_FRAGMENT,
  TOKENS_FOR_EXACT_TOKENS_FRAGMENT,
  TOKENS_FOR_TOKENS_FRAGMENTS,
} from './constants'
import { buildV2PathQuery, buildV3PathQuery } from './utils'
import {
  type SwapActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { zeroAddress, type Address } from 'viem'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const { chainId, tokenIn, tokenOut, amountIn, amountOut, recipient } = swap

  const ethUsedIn = tokenIn === zeroAddress
  const ethUsedOut = tokenOut === zeroAddress
  const tokenInOrWeth = ethUsedIn ? BLAST_WETH : tokenIn
  const tokenOutOrWeth = ethUsedOut ? BLAST_WETH : tokenOut

  return compressJson({
    chainId: chainId,
    from: recipient,
    to: {
      $or: [
        THRUSTER_V2_ADDRESS.toLowerCase(),
        THRUSTER_V3_ADDRESS.toLowerCase(),
      ],
    },
    value: ethUsedIn ? amountIn : undefined,
    input: {
      $or: [
        {
          // V2 Routes
          $or: [
            {
              $abi: ETH_FOR_TOKENS_FRAGMENTS,
              path: buildV2PathQuery(BLAST_WETH, tokenOut),
              amountOutMin: amountOut,
              to: recipient,
            },
            {
              $abi: TOKENS_FOR_ETH_FRAGMENTS,
              path: buildV2PathQuery(tokenIn, BLAST_WETH),
              amountIn,
              amountOutMin: amountOut,
              to: recipient,
            },
            {
              $abi: TOKENS_FOR_TOKENS_FRAGMENTS,
              path: buildV2PathQuery(tokenIn, tokenOut),
              amountIn,
              amountOutMin: amountOut,
              to: recipient,
            },
            {
              $abi: [ETH_FOR_EXACT_TOKENS_FRAGMENT],
              path: buildV2PathQuery(BLAST_WETH, tokenOut),
              amountOut,
              to: recipient,
            },
            {
              $abi: [TOKENS_FOR_EXACT_ETH_FRAGMENT],
              path: buildV2PathQuery(tokenIn, BLAST_WETH),
              amountInMax: amountIn,
              amountOut,
              to: recipient,
            },
            {
              $abi: [TOKENS_FOR_EXACT_TOKENS_FRAGMENT],
              path: buildV2PathQuery(tokenIn, tokenOut),
              amountInMax: amountIn,
              amountOut,
              to: recipient,
            },
          ],
        },
        {
          // V3 Routes
          $or: [
            {
              $abiAbstract: THRUSTER_V3_EXACT_OUTPUT_ABI,
              params: {
                $or: [
                  {
                    tokenIn: tokenInOrWeth,
                    tokenOut: tokenOutOrWeth,
                  },
                  {
                    // exact output has the reverse structure (tokenOut first)
                    path: buildV3PathQuery(tokenOutOrWeth, tokenInOrWeth),
                  },
                ],
                amountInMaximum: amountIn,
                amountOut,
              },
            },
            {
              $abiAbstract: THRUSTER_V3_EXACT_INPUT_ABI,
              params: {
                $or: [
                  {
                    tokenIn: tokenInOrWeth,
                    tokenOut: tokenOutOrWeth,
                  },
                  {
                    path: buildV3PathQuery(tokenInOrWeth, tokenOutOrWeth),
                  },
                ],
                amountIn,
                amountOutMinimum: amountOut,
              },
            },
          ],
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BLAST]
}
