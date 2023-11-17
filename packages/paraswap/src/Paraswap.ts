import {
  type SwapActionParams,
  type StakeActionParams,
  compressJson,
  type ActionType,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { STAKE_CHAIN_ID_ARRAY, SWAP_CHAIN_ID_ARRAY } from './chain-ids.js'
import { Tokens, buildPathQuery, filterTokenList } from './utils.js'
import {
  constructGetTokens,
  constructAxiosFetcher,
  constructGetSpender,
} from '@paraswap/sdk'
import { PARASWAP_STAKE_ABI, PARASWAP_SWAP_ABI } from './abi.js'
import axios from 'axios'
import {
  DEFAULT_STAKE_TOKEN_LIST,
  DEFAULT_SWAP_TOKEN_LIST,
  INTERNAL_ETH_ADDRESS,
  MAINNET_SEPSP1_ADDRESS,
  MAINNET_SEPSP2_ADDRESS,
  OPTIMISM_SEPSP1_ADDRESS,
  OPTIMISM_SEPSP2_ADDRESS,
} from './contract-addresses.js'
const fetcher = constructAxiosFetcher(axios) // alternatively constructFetchFetcher

export const swap = async (swap: SwapActionParams) => {
  const { chainId, contractAddress, tokenIn, tokenOut, amountIn, amountOut } =
    swap
  const { getAugustusSwapper } = constructGetSpender({ chainId, fetcher })
  const to = contractAddress || (await getAugustusSwapper())
  const tokenInUsed = tokenIn === Tokens.ETH ? INTERNAL_ETH_ADDRESS : tokenIn
  const tokenOutUsed = tokenOut === Tokens.ETH ? INTERNAL_ETH_ADDRESS : tokenOut

  return compressJson({
    chainId: chainId,
    to: to,
    input: {
      $abi: PARASWAP_SWAP_ABI,
      $or: [
        {
          // simpleswap, directUniV3Swap, directCurveSwap
          data: {
            fromToken: tokenInUsed,
            fromAmount: amountIn,
            toAmount: amountOut,
            toToken: tokenOutUsed,
          },
        },
        {
          // multiswap
          data: {
            fromToken: tokenInUsed,
            fromAmount: amountIn,
            toAmount: amountOut,
            path: {
              $last: {
                to: tokenOutUsed,
              },
            },
          },
        },
        {
          // megaswap
          data: {
            fromToken: tokenInUsed,
            fromAmount: amountIn,
            toAmount: amountOut,
            path: {
              $last: {
                path: {
                  $last: {
                    to: tokenOutUsed,
                  },
                },
              },
            },
          },
        },
        {
          // directBalancerV2
          data: {
            assets: buildPathQuery(tokenIn, tokenOut),
            fromAmount: amountIn,
            toAmount: amountOut,
          },
        },
      ],
    },
  })
}

export const stake = async (stake: StakeActionParams) => {
  const { chainId, tokenOne, amountOne, tokenTwo } = stake
  if (tokenOne !== undefined && tokenTwo !== undefined) {
    const addressArray =
      chainId === 1 ? [MAINNET_SEPSP2_ADDRESS] : [OPTIMISM_SEPSP2_ADDRESS]
    return compressJson({
      chainId: chainId,
      // check which address format to use. LowerCase or CheckSummed
      to: {
        $or: addressArray, // If both tokens are defined it has to be sePSP2
      },
      input: {
        $abi: PARASWAP_STAKE_ABI,
        $or: [
          {
            pspAmount: amountOne,
          },
          {
            _assetAmount: amountOne,
          },
        ],
      },
    })
  } else {
    return compressJson({
      chainId: chainId,
      to: {
        $or: [
          OPTIMISM_SEPSP2_ADDRESS,
          MAINNET_SEPSP2_ADDRESS,
          OPTIMISM_SEPSP1_ADDRESS,
          MAINNET_SEPSP1_ADDRESS,
        ],
      },
      input: {
        $abi: PARASWAP_STAKE_ABI,
        $or: [
          {
            pspAmount: amountOne,
          },
          {
            _assetAmount: amountOne,
          },
        ],
      },
    })
  }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
  actionType?: ActionType,
): Promise<Address[]> => {
  if (actionType === undefined) return []
  if (actionType === 'stake') {
    return DEFAULT_STAKE_TOKEN_LIST[_chainId] as Address[]
  }
  if (_chainId === 1) {
    return DEFAULT_SWAP_TOKEN_LIST[_chainId] as Address[]
  }
  const { getTokens } = constructGetTokens({ chainId: _chainId, fetcher })

  try {
    const tokenList = await getTokens()
    if (!tokenList || tokenList.length === 0) {
      return DEFAULT_STAKE_TOKEN_LIST[_chainId] as Address[]
    }
    return filterTokenList(tokenList)
  } catch {
    return DEFAULT_SWAP_TOKEN_LIST[_chainId] as Address[]
  }
}

export const getSupportedChainIds = async (actionType?: ActionType) => {
  if (actionType === 'stake') {
    return STAKE_CHAIN_ID_ARRAY
  } else if (actionType === 'swap') {
    return SWAP_CHAIN_ID_ARRAY
  }
  return []
}
