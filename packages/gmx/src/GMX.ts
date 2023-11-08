import { type SwapActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import axios from 'axios'
import { OrderType } from './utils.js'
import { CHAIN_ID_ARRAY } from './chain-ids.js'
import { GMX_SWAPV1_ABI, GMX_SWAPV2_ABI } from './abi.js'
import {
  DEFAULT_TOKEN_LIST_URL,
  GMX_ROUTERV1_ADDRESS,
  GMX_ROUTERV2_ADDRESS,
  ETH_ADDRESS,
  WETH_ADDRESS,
} from './contract-addresses.js'

export const swap = async (swap: SwapActionParams) => {
  const { chainId, tokenIn, tokenOut, amountIn, amountOut, recipient } = swap

  const ETH_USED = tokenIn === ETH_ADDRESS

  return compressJson({
    chainId: chainId,
    value: ETH_USED ? amountIn : undefined,
    to: {
      $or: [
        GMX_ROUTERV1_ADDRESS.toLowerCase(),
        GMX_ROUTERV2_ADDRESS.toLowerCase(),
      ],
    },
    input: {
      $abiAbstract: [...GMX_SWAPV1_ABI, ...GMX_SWAPV2_ABI],
      $or: [
        {
          _path: [ETH_USED ? WETH_ADDRESS : tokenIn, tokenOut],
          _amountIn: ETH_USED ? undefined : amountIn,
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
              swapPath: [ETH_USED ? WETH_ADDRESS : tokenIn, tokenOut],
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
      const tokenAddresses = data.map((token) => token.id) as Address[]
      tokenAddresses.push(ETH_ADDRESS)
      return tokenAddresses
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
