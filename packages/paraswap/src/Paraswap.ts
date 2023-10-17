import { type SwapActionParams, type StakeActionParams, compressJson, type ActionType } from '@rabbitholegg/questdk'
import { getIndexedContracts } from '@rabbitholegg/questdk-plugin-registry'
import { type Address } from 'viem'
import { STAKE_CHAIN_ID_ARRAY, SWAP_CHAIN_ID_ARRAY } from './chain-ids.js'
import {
  constructGetTokens,
  constructAxiosFetcher,
  constructGetSpender,
} from '@paraswap/sdk'
import { PARASWAP_SWAP_ABI } from './abi.js'
import axios from 'axios'
import { DEFAULT_STAKE_TOKEN_LIST, DEFAULT_SWAP_TOKEN_LIST, MAINNET_SEPSP1_ADDRESS, MAINNET_SEPSP2_ADDRESS, OPTIMISM_SEPSP1_ADDRESS, OPTIMISM_SEPSP2_ADDRESS } from './contract-addresses.js'
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
      $abiAbstract: PARASWAP_SWAP_ABI,
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
  const { chainId, tokenOne, amountOne, tokenTwo } = stake
  if(tokenOne !== undefined && tokenTwo !== undefined) {
    const addressArray = chainId === 1 ? [MAINNET_SEPSP2_ADDRESS] : [OPTIMISM_SEPSP2_ADDRESS]
    return compressJson({
      chainId: chainId,
      to: addressArray.concat(getIndexedContracts(chainId ?? 1)), // If both tokens are defined it has to be sePSP2
      $abiAbstract: PARASWAP_SWAP_ABI,
      $or: [
        {
          pspAmount: amountOne,
        },
        {
          _assetAmount: amountOne,
        }
      ]
  })}
  else {
    return compressJson({
      chainId: chainId,
      to: {
        $or: [
          OPTIMISM_SEPSP2_ADDRESS,
          MAINNET_SEPSP2_ADDRESS,
          OPTIMISM_SEPSP1_ADDRESS,
          MAINNET_SEPSP1_ADDRESS,
        ].concat(getIndexedContracts(chainId ?? 1)),
      },
      $abiAbstract: PARASWAP_SWAP_ABI,
      $or: [
        {
          pspAmount: amountOne,
        },
        {
          _assetAmount: amountOne,
        }
      ]
  })
  }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
  actionType: ActionType
): Promise<Address[]> => {
  if(actionType === 'stake') {
    return DEFAULT_STAKE_TOKEN_LIST[_chainId] as Address[]
  }
  const { getTokens } = constructGetTokens({ chainId: _chainId, fetcher })
  // Default list only valid for
  return getTokens
    ? (await getTokens()).map((token) => token.address as Address)
    : (DEFAULT_SWAP_TOKEN_LIST[_chainId] as Address[])
}
export const getSupportedChainIds = async (actionType: ActionType) => {
  if(actionType === 'stake') {
    STAKE_CHAIN_ID_ARRAY
  }
  return SWAP_CHAIN_ID_ARRAY
}
