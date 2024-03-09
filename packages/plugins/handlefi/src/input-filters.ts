import { type SwapActionParams } from '@rabbitholegg/questdk'
import { getAddress, zeroAddress, type Address } from 'viem'
import { buildV2PathQueryWithCase } from './utils'
import {
  PARASWAP_ABI,
  V2_ROUTER_ABI,
  HSPMHLP_ABI,
  HPSM2_ABI,
  HLP_CURVE_V2_ABI,
  HLP_BALANCER_ABI,
  CURVE_FACTORY_ABI,
} from './abi'
import { WETH } from './constants'

export function getParaSwapFilter(
  params: SwapActionParams,
  partner: Address | undefined,
) {
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
          partner,
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
          partner,
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
          partner,
        },
      },
      {
        // directBalancerV2
        data: {
          assets: buildV2PathQueryWithCase('lower', tokenIn, tokenOut),
          fromAmount: amountIn,
          toAmount: amountOut,
          partner,
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
  // amount is only for amountIn
  const { tokenIn, tokenOut, amountIn } = params
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
    amount: amountIn,
    ...inputs,
  } as const
}

export function getRouterHpsmHlpFilter(params: SwapActionParams) {
  const { tokenIn, tokenOut, amountIn, amountOut, recipient } = params
  const tokenOutUsed = tokenOut !== zeroAddress ? tokenOut : undefined

  return {
    $abi: HSPMHLP_ABI,
    peggedToken: tokenIn,
    tokenOut: tokenOutUsed,
    amountIn,
    minOut: amountOut,
    receiver: recipient,
  }
}

export function getHlpCurveV2Filter(params: SwapActionParams) {
  const { tokenIn, tokenOut, amountIn, amountOut, recipient } = params
  const minOut = tokenOut ? amountOut : undefined
  if (tokenIn === zeroAddress) {
    return {
      $abi: HLP_CURVE_V2_ABI,
      tokenOut,
      minOut,
      receiver: recipient,
    }
  }
  return {
    $abi: HLP_CURVE_V2_ABI,
    tokenOut,
    amountIn: tokenIn ? amountIn : undefined,
    minOut,
    receiver: recipient,
    $or: [
      {
        peggedToken: tokenIn,
      },
      {
        hlpToken: tokenIn,
      },
    ],
  }
}

export function getHlpBalancerFilter(params: SwapActionParams) {
  const { tokenIn, tokenOut, amountIn, amountOut, recipient } = params
  const minOut = tokenOut ? amountOut : undefined
  const ethUsedIn = tokenIn === zeroAddress
  const tokenInput = ethUsedIn ? { tokenOut } : { tokenIn }
  return {
    $abi: HLP_BALANCER_ABI,
    minOut,
    amountIn: tokenIn && !ethUsedIn ? amountIn : undefined,
    receiver: recipient,
    ...tokenInput,
  }
}

export function getCurveV2FactoryFilter(params: SwapActionParams) {
  const { tokenIn, tokenOut, amountIn, amountOut } = params

  // There isnt really a good way to tell which pool you are in without knowing the contract address of the pool
  // i will always be fxUSD (0)
  // j can either be FRAX, USDC.e, or USDT (may get false posiitves here)

  const i = !tokenIn
    ? undefined
    : tokenIn.toLowerCase() === '0x8616e8ea83f048ab9a5ec513c9412dd2993bce3f'
    ? 0 // fxUSD
    : null

  const j = !tokenOut
    ? undefined
    : tokenOut.toLowerCase() === '0x17fc002b466eec40dae837fc4be5c67993ddbd6f'
    ? 1 // FRAX
    : tokenOut.toLowerCase() === '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8' ||
      tokenOut.toLowerCase() === '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'
    ? 2 // USDC.e || USDT
    : null

  return {
    $abi: CURVE_FACTORY_ABI,
    i,
    j,
    _dx: amountIn,
    _min_dy: amountOut,
  }
}
