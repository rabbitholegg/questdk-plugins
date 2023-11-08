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

enum OrderType {
  MarketSwap = 0,
  LimitSwap = 1,
  MarketIncrease = 2,
  LimitIncrease = 3,
  MarketDecrease = 4,
  LimitDecrease = 5,
  StopLossDecrease = 6,
  Liquidation = 7,
}

export const swap = async (swap: SwapActionParams) => {
  const { chainId, tokenIn, tokenOut, amountIn, amountOut, recipient } = swap

  return compressJson({
    chainId: chainId,
    to: {
      $or: [getAddress(GMX_ROUTERV1_ADDRESS), getAddress(GMX_ROUTERV2_ADDRESS)],
    },
    input: {
      $abiAbstract: [...GMX_SWAPV1_ABI, ...GMX_SWAPV2_ABI],
      $or: [
        {
          _path: [tokenIn, tokenOut],
          _amountIn: amountIn,
          _minOut: amountOut,
          _receiver: recipient,
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
