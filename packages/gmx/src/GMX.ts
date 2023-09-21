
import { type SwapActionParams, compressJson} from '@rabbitholegg/questdk'
import {
  CHAIN_ID_ARRAY
} from './chain-ids.js'
import { GMX_SWAP_ABI } from './abi.js'
import fetch from 'node-fetch'
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
  return compressJson({
    to:  contractAddress,   // The contract address of the swap
    chainId: chainId,         // The chain id of the swap
    input: {
      $abi:GMX_SWAP_ABI,
      _path: [tokenIn, tokenOut], // The path of the swap
      _amountIn: amountIn,                     // The amount of the input token
      _minOut: amountOut,                      // The minimum amount of the output token
      _receiver: recipient,                    // The recipient of the output token
    },  // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  try {
    // Send a GET request to the specified URL using the fetch API
    const response = await fetch('https://api.gmx.io/tokens');

    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Parse the JSON response into a JavaScript object
      const data = await response.json() as Array<{ data: any, id: string }>;
      return data.map((token) => token.id);
    } else {
      console.error(`Request failed with status code: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error(`An error occurred: ${(error as { message: string }).message}`);
    return [];
  }
}


export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}
