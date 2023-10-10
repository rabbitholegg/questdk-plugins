
import { type SwapActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { CHAIN_ID_ARRAY } from './chain-ids.js'
import { constructGetTokens, constructAxiosFetcher, constructGetSpender } from '@paraswap/sdk';
import { PARASWAP_ABI } from './abi.js';
import axios from 'axios';
const fetcher = constructAxiosFetcher(axios); // alternatively constructFetchFetcher
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
  const {getAugustusSwapper} = constructGetSpender({chainId, fetcher});
  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: chainId, // The chainId of the source chain
    to:  contractAddress || getAugustusSwapper(),   // The contract address of the bridge
    input: {
      $abiAbstract: PARASWAP_ABI,
      $or: [
        {
          assets: [tokenIn, tokenOut],
          funds: {
            recipient: recipient,
          },
          fromAmount: amountIn,
          expectedAmount: amountOut,
        },
        {
          assets: [tokenIn, tokenOut],
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
          }
        },
        {
          params: {
            path: tokenIn + tokenOut.substring(2),
            amountIn: amountIn,
            amountOutMinimum: amountOut,
            recipient: recipient,
          }
        },
        {
          data: {
            fromToken: tokenIn,
            fromAmount: amountIn,
            path: {
              $last: 
              {
                to: tokenOut,
              }
            }
          }
        }
      ]
    },
  })
}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  // TODO: should we build this function for all chains? Might save a little compute having it pre-built once
  const {getTokens} = constructGetTokens({chainId: _chainId, fetcher});
  return (await getTokens()).map(token => (token.address as Address));
}


export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}
