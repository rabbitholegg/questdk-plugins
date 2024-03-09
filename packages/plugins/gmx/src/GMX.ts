import {
  type SwapActionParams,
  type OptionsActionParams,
  type TransactionFilter,
  compressJson,
  type FilterOperator,
  OrderType as BoostOrderType,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { OrderType, Tokens, buildPathQuery } from './utils.js'
import { ARB_ONE_CHAIN_ID, CHAIN_ID_ARRAY } from './chain-ids.js'
import { GMX_SEND_TOKENS_ABI, GMX_SWAPV1_ABI, GMX_SWAPV2_ABI } from './abi.js'
import {
  DEFAULT_TOKEN_LIST,
  GMX_ROUTERV2_ADDRESS,
  ETH_ADDRESS,
  MARKET_TOKENS,
} from './contract-addresses.js'

function getMarketAddress(
  tokenIn: Address | undefined,
  tokenOut: Address | undefined,
): Address | FilterOperator | undefined {
  // return undefined if tokenOut is not provided
  if (tokenOut === undefined) {
    return tokenOut
  }
  // convert ETH to WETH address if present
  const outboundToken = tokenOut === ETH_ADDRESS ? Tokens.WETH : tokenOut

  // if tokenOut is USDC, use the marketToken for tokenIn
  if (outboundToken === Tokens.USDC) {
    // if tokenIn is "any"/undefined and tokenOut is USDC, any token will pass
    return MARKET_TOKENS[tokenIn as Address]
  }
  return MARKET_TOKENS[outboundToken]
}

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const { chainId, tokenIn, tokenOut, amountIn, amountOut, recipient } = swap
  const ETH_USED = tokenIn === ETH_ADDRESS

  return compressJson({
    chainId: chainId,
    value: ETH_USED ? amountIn : undefined,
    to: {
      $or: [GMX_ROUTERV2_ADDRESS.toLowerCase()],
    },
    input: {
      $or: [
        {
          $abi: GMX_SWAPV1_ABI,
          _path: buildPathQuery(ETH_USED ? Tokens.WETH : tokenIn, tokenOut),
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
                orderType: { $lte: OrderType.LimitSwap },
                addresses: {
                  initialCollateralToken: ETH_USED ? Tokens.WETH : tokenIn,
                  receiver: recipient,
                  swapPath: {
                    $last: getMarketAddress(
                      ETH_USED ? Tokens.WETH : tokenIn,
                      tokenOut,
                    ),
                  },
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

export const options = async (
  options: OptionsActionParams,
): Promise<TransactionFilter> => {
  const { chainId, token, amount, recipient, orderType } = options
  return compressJson({
    chainId: chainId,
    to: GMX_ROUTERV2_ADDRESS.toLowerCase(),
    $and: [
      {
        input: {
          $abiAbstract: GMX_SWAPV2_ABI,
          params: {
            ...getOrderType(orderType),
            addresses: {
              initialCollateralToken: token,
              receiver: recipient,
            },
          },
        },
      },
      {
        $or: [
          {
            input: {
              $abiAbstract: GMX_SEND_TOKENS_ABI,
              amount: amount,
            },
          },
          {
            value: amount,
          },
        ],
      },
    ],
  })
}

export const getOrderType = (orderType: BoostOrderType | undefined) => {
  switch (orderType) {
    case BoostOrderType.Market:
      return {
        $or: [
          { orderType: OrderType.MarketIncrease },
          { orderType: OrderType.MarketDecrease },
        ],
      }
    case BoostOrderType.Limit:
      return {
        $or: [
          { orderType: OrderType.LimitIncrease },
          { orderType: OrderType.LimitDecrease },
        ],
      }
    default:
      return {
        $or: [
          { orderType: OrderType.MarketIncrease },
          { orderType: OrderType.LimitIncrease },
          { orderType: OrderType.MarketDecrease },
          { orderType: OrderType.LimitDecrease },
        ],
      }
  }
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return _chainId === ARB_ONE_CHAIN_ID ? DEFAULT_TOKEN_LIST : []
}

export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}
