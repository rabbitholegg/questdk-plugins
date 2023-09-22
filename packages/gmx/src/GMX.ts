import { type SwapActionParams, compressJson } from '@rabbitholegg/questdk'
import { CHAIN_ID_ARRAY } from './chain-ids.js'
import { GMX_SWAPV1_ABI, GMX_SWAPV2_ABI } from './abi.js'
import {
  DEFAULT_TOKEN_LIST_URL,
  GMX_ROUTERV1_ADDRESS,
} from './contract-addresses.js'
import axios from 'axios'
import { type Address } from 'viem'

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

  // Fortunatly even though there are two different functions the parameters are the same
  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  if (contractAddress === GMX_ROUTERV1_ADDRESS) {
    return compressJson({
      to: contractAddress, // The contract address of the swap
      chainId: chainId, // The chain id of the swap
      input: {
        $abi: GMX_SWAPV1_ABI,
        _path: [tokenIn, tokenOut], // The path of the swap
        _amountIn: amountIn, // The amount of the input token
        _minOut: amountOut, // The minimum amount of the output token
        _receiver: recipient, // The recipient of the output token
      }, // The input object is where we'll put the ABI and the parameters
    })
  }
  return compressJson({
    to: contractAddress, // The contract address of the swap
    chainId: chainId, // The chain id of the swap
    input: {
      $abi: GMX_SWAPV2_ABI,
      data: {
        $some: {
          $abi: GMX_SWAPV2_ABI,
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
      },
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
