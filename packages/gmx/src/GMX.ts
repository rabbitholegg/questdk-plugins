
import { type SwapActionParams, compressJson, type FilterOperator } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import {
  CHAIN_ID_ARRAY
} from './chain-ids.js'
import { GMX_SWAP_ABI } from './abi.js'
const buildPathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v3 paths are formatted as 0x<token><fee><token>

  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $regex: `^${tokenIn}` })
  }

  if (tokenOut) {
    // Chop the 0x prefix before comparing
    conditions.push({ $regex: `${tokenOut.slice(2)}$` })
  }

  return {
    $and: conditions,
  }
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
  return compressJson({
    to:  contractAddress,   // The contract address of the swap
    chain: chainId,         // The chain id of the swap
    input: {
      $abi:GMX_SWAP_ABI,
      _path: buildPathQuery(tokenIn, tokenOut), // The path of the swap
      _amountIn: amountIn,                     // The amount of the input token
      _minOut: amountOut,                      // The minimum amount of the output token
      _receiver: recipient,                    // The recipient of the output token
    },  // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return []
}


export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}
