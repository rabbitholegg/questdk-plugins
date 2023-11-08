import { type SwapActionParams, compressJson } from '@rabbitholegg/questdk'
import { CHAIN_ID_ARRAY } from './chain-ids.js'
import { GMX_SWAPV1_ABI, GMX_SWAPV2_ABI } from './abi.js'
import {
  DEFAULT_TOKEN_LIST_URL,
  GMX_ROUTERV1_ADDRESS,
  GMX_ROUTERV2_ADDRESS,
} from './contract-addresses.js'
import axios from 'axios'
import { type Address, getAddress } from 'viem'

// Need fix type error "This enum declaration contains members that are implicitly initialized."

enum OrderType {
  // @dev MarketSwap: swap token A to token B at the current market price
  // the order will be cancelled if the minOutputAmount cannot be fulfilled
  MarketSwap,
  // @dev LimitSwap: swap token A to token B if the minOutputAmount can be fulfilled
  LimitSwap,
  // @dev MarketIncrease: increase position at the current market price
  // the order will be cancelled if the position cannot be increased at the acceptablePrice
  MarketIncrease,
  // @dev LimitIncrease: increase position if the triggerPrice is reached and the acceptablePrice can be fulfilled
  LimitIncrease,
  // @dev MarketDecrease: decrease position at the current market price
  // the order will be cancelled if the position cannot be decreased at the acceptablePrice
  MarketDecrease,
  // @dev LimitDecrease: decrease position if the triggerPrice is reached and the acceptablePrice can be fulfilled
  LimitDecrease,
  // @dev StopLossDecrease: decrease position if the triggerPrice is reached and the acceptablePrice can be fulfilled
  StopLossDecrease,
  // @dev Liquidation: allows liquidation of positions if the criteria for liquidation are met
  Liquidation,
}

export const swap = async (swap: SwapActionParams) => {
  // This is the information we'll use to compose the Transaction object
  const {
    chainId,
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  // What do about invalid contract addresses?

  return compressJson({
    chainId: chainId,
    to: {
      $or: [getAddress(GMX_ROUTERV1_ADDRESS), getAddress(GMX_ROUTERV2_ADDRESS)],
    },
    input: {
      $abiAbstract: [...GMX_SWAPV1_ABI, ...GMX_SWAPV2_ABI],
      $or: [
        {
          _path: [tokenIn, tokenOut], // The path of the swap
          _amountIn: amountIn, // The amount of the input token
          _minOut: amountOut, // The minimum amount of the output token
          _receiver: recipient, // The recipient of the output token
        },
        {
          params: {
            numbers: {
              minOutputAmount: amountOut,
            },
            orderType: OrderType.MarketSwap,
            addresses: {
              receiver: recipient,
              swapPath: [tokenIn, tokenOut],
            },
          },
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  try {
    // Send a GET request to the specified URL using the fetch API
    const response = await axios.get('https://api.gmx.io/tokens')

    // Check if the request was successful (status code 200)
    if (response.statusText === 'OK') {
      // Parse the JSON response into a JavaScript object
      const data = response.data as Array<{ data: any; id: string }>
      return data.map((token) => token.id) as Address[]
    } else {
      console.error(`Request failed with status code: ${response.status}`)
      return []
    }
  } catch (error) {
    console.error(
      `An error occurred: ${(error as { message: string }).message}`,
    )
    return DEFAULT_TOKEN_LIST_URL
  }
}

export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}
