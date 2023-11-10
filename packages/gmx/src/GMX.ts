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

function getMarketAddress(
  tokenIn: Address | undefined,
  tokenOut: Address | undefined,
): Address | undefined {
  if (tokenOut === undefined) return undefined
  if (tokenOut === ETH_ADDRESS) {
    return MARKET_TOKENS[WETH_ADDRESS]
  }
  if (tokenOut === Tokens.USDC) {
    // This will wildcard (return undefined) if tokenIn is not provided
    return MARKET_TOKENS[tokenIn as Address]
  }
  return MARKET_TOKENS[tokenOut]
}

export const swap = async (swap: SwapActionParams) => {
  const { chainId, tokenIn, tokenOut, amountIn, amountOut, recipient } = swap

  const ETH_USED = tokenIn === ETH_ADDRESS

  /* 
  NOTES
  -----
  Logic for returning market tokens 
  - If tokenOut === ETH_ADDRESS is true, we want to return MARKET_TOKENS[WETH_ADDRESS]
  - If USDC_OUT is true, we want to return MARKET_TOKENS[TokenIn]
  - Everyother token outside of ETH and USDC will return MARKET_TOKENS[TokenOut]

  Unintended Behaviour
  - If amountIn is specified, only tokens will work if input token is set to any (ETH will not pass)
  - If tokenIn is any, and tokenOut is USDC, any token will pass the check. (see getMarketAddress)

  ToDO:
  - More tests
  - Check behavior when swap ETH -> USDC and vice-versa
  - Check behavior of token -> ETH 
  */

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
                  swapPath: { $last: getMarketAddress(tokenIn, tokenOut) },
                },
                shouldUnwrapNativeToken: tokenOut
                  ? tokenOut === ETH_ADDRESS
                  : undefined,
              },
            },
            {
              $abiAbstract: GMX_SWAPV2_ABI,
              amount: ETH_USED ? undefined : amountIn,
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
