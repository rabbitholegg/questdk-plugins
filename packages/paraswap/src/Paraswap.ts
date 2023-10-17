import { type SwapActionParams, type StakeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { STAKE_CHAIN_ID_ARRAY, SWAP_CHAIN_ID_ARRAY } from './chain-ids.js'
import {
  constructGetTokens,
  constructAxiosFetcher,
  constructGetSpender,
} from '@paraswap/sdk'
import { PARASWAP_ABI } from './abi.js'
import axios from 'axios'
import { DEFAULT_TOKEN_LIST_URL } from './contract-addresses.js'
const fetcher = constructAxiosFetcher(axios) // alternatively constructFetchFetcher
// If you're implementing swap or mint, simply duplicate this function and change the name
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
  const { getAugustusSwapper } = constructGetSpender({ chainId, fetcher })
  const to = contractAddress || (await getAugustusSwapper())
  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: chainId, // The chainId of the source chain
    to: to,
    input: {
      $abiAbstract: PARASWAP_ABI,
      $or: [
        {
          assets:
            tokenIn !== undefined && tokenOut !== undefined
              ? [tokenIn, tokenOut]
              : undefined,
          funds: {
            recipient: recipient,
          },
          fromAmount: amountIn,
          expectedAmount: amountOut,
        },
        {
          assets:
            tokenIn !== undefined && tokenOut !== undefined
              ? [tokenIn, tokenOut]
              : undefined,
          funds: {
            recipient: recipient,
          },
          fromAmount: amountIn,
          expectedAmount: amountOut,
        },
        {
          fromToken: tokenIn,
          toToken: tokenOut,
          fromAmount: amountIn,
          expectedAmount: amountOut,
        },
        {
          fromToken: tokenIn,
          toToken: tokenOut,
          fromAmount: amountIn,
          toAmount: amountOut,
        },
        {
          params: {
            amountIn: amountIn,
            amountOut: amountOut,
            tokenIn: tokenIn,
            tokenOut: tokenOut,
          },
        },
        {
          params: {
            path:
              tokenIn !== undefined && tokenOut !== undefined
                ? tokenIn + tokenOut.substring(2)
                : undefined,
            amountIn: amountIn,
            amountOutMinimum: amountOut,
            recipient: recipient,
          },
        },
        {
          data: {
            fromToken: tokenIn,
            fromAmount: amountIn,
            path: {
              $last: {
                to: tokenOut,
              },
            },
          },
        },
      ],
    },
  })
}

export const stake = async (stake: StakeActionParams) => {
  const { chainId, contractAddress, tokenOne, amountOne, tokenTwo, amountTwo, duration } = stake

  // Only token combination options are WETH, ETH, and PSP

  // There are two pools and two contracts - sePSP2 and sePSP
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
  task: string,
): Promise<Address[]> => {

  const { getTokens } = constructGetTokens({ chainId: _chainId, fetcher })
  // Default list only valid for
  return getTokens
    ? (await getTokens()).map((token) => token.address as Address)
    : (DEFAULT_TOKEN_LIST_URL[_chainId] as Address[])
}

export const getSupportedChainIds = async (task: string) => {
  if(task === 'stake') {
    STAKE_CHAIN_ID_ARRAY
  }
  return SWAP_CHAIN_ID_ARRAY
}
