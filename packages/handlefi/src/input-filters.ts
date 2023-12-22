import { type SwapActionParams } from '@rabbitholegg/questdk'
import { getAddress, zeroAddress } from 'viem'
import { buildV2PathQueryWithCase } from './utils'
import { PARASWAP_ABI, V2_ROUTER_ABI, HPSM2_ABI } from './abi'
import { WETH } from './constants'

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
          assets: buildV2PathQueryWithCase('lower', tokenIn, tokenOut),
          fromAmount: amountIn,
          toAmount: amountOut,
          partner: '0xFa2c1bE677BE4BEc8851D1577B343F7060B51E3A',
        },
      },
    ],
  } as const
}

export function getV2RouterFilter(params: SwapActionParams) {
  const { tokenIn, tokenOut, amountIn, amountOut, recipient } = params
  const ethIn = tokenIn === zeroAddress
  const tokenInUsed = tokenIn === zeroAddress ? WETH : tokenIn
  const tokenOutUsed = tokenOut === zeroAddress ? WETH : tokenOut
  return {
    $abi: V2_ROUTER_ABI,
    _path: buildV2PathQueryWithCase('checksum', tokenInUsed, tokenOutUsed),
    _amountIn: ethIn ? undefined : amountIn,
    _minOut: amountOut,
    _receiver: recipient,
  } as const
}

export function getHPSM2Filter(params: SwapActionParams) {
  // Not using amount here since it is not possible to tell if the amount is amountIn or amountOut
  const { tokenIn, tokenOut } = params
  const tokenInAddress = tokenIn ? getAddress(tokenIn) : undefined
  const tokenOutAddress = tokenOut ? getAddress(tokenOut) : undefined

  let inputs = {}

  if (tokenIn && tokenOut) {
    inputs = {
      fxTokenAddress: { $or: [tokenInAddress, tokenOutAddress] },
      peggedTokenAddress: { $or: [tokenInAddress, tokenOutAddress] },
    }
  } else if (tokenIn || tokenOut) {
    const address = tokenInAddress || tokenOutAddress
    inputs = {
      $or: [{ fxTokenAddress: address }, { peggedTokenAddress: address }],
    }
  }

  return {
    $abi: HPSM2_ABI,
    ...inputs,
  } as const
}
