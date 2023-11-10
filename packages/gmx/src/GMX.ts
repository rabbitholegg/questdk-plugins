import { type SwapActionParams, compressJson } from '@rabbitholegg/questdk'
import { getAddress, type Address } from 'viem'
import { OrderType, Tokens } from './utils.js'
import { ARB_ONE_CHAIN_ID, CHAIN_ID_ARRAY } from './chain-ids.js'
import { GMX_SWAPV1_ABI, GMX_SWAPV2_ABI } from './abi.js'
import {
  DEFAULT_TOKEN_LIST_URL,
  GMX_ROUTERV1_ADDRESS,
  GMX_ROUTERV2_ADDRESS,
  ETH_ADDRESS,
  WETH_ADDRESS,
  MARKET_TOKENS,
} from './contract-addresses.js'

export const swap = async (swap: SwapActionParams) => {
  const { chainId, tokenIn, tokenOut, amountIn, amountOut, recipient } = swap

  const ETH_USED = tokenIn === ETH_ADDRESS
  const USDC_OUT = tokenOut === Tokens.USDC

  const marketToken =
    MARKET_TOKENS[
      ETH_USED
        ? WETH_ADDRESS
        : USDC_OUT
        ? (tokenIn as Address)
        : (tokenOut as Address)
    ]

  return compressJson({
    chainId: chainId,
    value: ETH_USED ? amountIn : undefined,
    to: {
      $or: [getAddress(GMX_ROUTERV1_ADDRESS), getAddress(GMX_ROUTERV2_ADDRESS)],
    },
    input: {
      $or: [
        {
          $abi: GMX_SWAPV1_ABI,
          _path: [ETH_USED ? WETH_ADDRESS : tokenIn, tokenOut],
          _amountIn: ETH_USED ? undefined : amountIn,
          _minOut: amountOut,
          _receiver: recipient,
        },
        {
          $and: [
            {
              $abiAbstract: GMX_SWAPV2_ABI,
              params: {
                numbers: {
                  minOutputAmount: amountOut,
                },
                orderType: OrderType.MarketSwap,
                addresses: {
                  initialCollateralToken: ETH_USED ? WETH_ADDRESS : tokenIn,
                  receiver: recipient,
                  swapPath: { $last: marketToken },
                },
                shouldUnwrapNativeToken: tokenOut === ETH_ADDRESS,
              },
            },
            {
              $abiAbstract: GMX_SWAPV2_ABI,
              amount: amountIn,
            },
          ],
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return _chainId === ARB_ONE_CHAIN_ID ? DEFAULT_TOKEN_LIST_URL : []
}

export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}
