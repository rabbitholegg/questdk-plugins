import { type SwapActionParams } from '@rabbitholegg/questdk'
import { zeroAddress } from 'viem'
import { buildV2PathQuery } from './utils'
import { PARASWAP_ABI } from './abi'

export function getParaSwapFilter(params: SwapActionParams) {
  const { tokenIn, tokenOut, amountIn, amountOut } = params
  const internalEthAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
  const tokenInUsed = tokenIn === zeroAddress ? internalEthAddress : tokenIn
  const tokenOutUsed = tokenOut === zeroAddress ? internalEthAddress : tokenOut

  return {
    $abi: PARASWAP_ABI,
    $or: [
      {
        // simpleswap, directUniV3Swap, directCurveSwap
        data: {
          fromToken: tokenInUsed,
          fromAmount: amountIn,
          toAmount: amountOut,
          toToken: tokenOutUsed,
          partner: '0xFa2c1bE677BE4BEc8851D1577B343F7060B51E3A',
        },
      },
      {
        // multiswap
        data: {
          fromToken: tokenInUsed,
          fromAmount: amountIn,
          toAmount: amountOut,
          path: {
            $last: {
              to: tokenOutUsed,
            },
          },
          partner: '0xFa2c1bE677BE4BEc8851D1577B343F7060B51E3A',
        },
      },
      {
        // megaswap
        data: {
          fromToken: tokenInUsed,
          fromAmount: amountIn,
          toAmount: amountOut,
          path: {
            $last: {
              path: {
                $last: {
                  to: tokenOutUsed,
                },
              },
            },
          },
          partner: '0xFa2c1bE677BE4BEc8851D1577B343F7060B51E3A',
        },
      },
      {
        // directBalancerV2
        data: {
          assets: buildV2PathQuery(tokenIn, tokenOut),
          fromAmount: amountIn,
          toAmount: amountOut,
          partner: '0xFa2c1bE677BE4BEc8851D1577B343F7060B51E3A',
        },
      },
    ],
  } as const

}
