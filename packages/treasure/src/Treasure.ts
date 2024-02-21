import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
  type MintActionParams,
  type StakeActionParams,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import {
  MAGIC_STAKING,
  MAGICSWAP_TOKENS,
  TREASURE_TAGS_PROXY,
  V2_ROUTER,
} from './constants'
import { MINT_TREASURE_TAG_ABI, STAKE_MAGIC_ABI, V2_ROUTER_ABI } from './abi'
import { Chains, buildV2PathQuery } from './utils'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, recipient } = mint

  return compressJson({
    chainId,
    to: contractAddress || TREASURE_TAGS_PROXY,
    input: {
      $abi: MINT_TREASURE_TAG_ABI,
      _registerArgs: {
        owner: recipient,
      },
    },
  })
}

export const stake = async (stake: StakeActionParams) => {
  const { chainId, contractAddress, amountOne } = stake

  return compressJson({
    chainId,
    to: contractAddress || MAGIC_STAKING,
    input: {
      $abi: STAKE_MAGIC_ABI,
      _amount: amountOne,
    },
  })
}

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  return compressJson({
    chainId,
    to: contractAddress ?? V2_ROUTER,
    input: {
      $abi: V2_ROUTER_ABI,
      $and: [
        {
          to: recipient,
          path: buildV2PathQuery(tokenIn, tokenOut),
        },
        {
          $or: [
            { amountIn, amountOutMin: amountOut }, //exactTokensForTokens
            { amountInMax: amountIn, amountOut: amountOut }, // tokensForExactTokens
          ],
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return _chainId === Chains.ARBITRUM_ONE ? MAGICSWAP_TOKENS : []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ARBITRUM_ONE]
}
