import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { BALANCER_ABI } from './abi'
import { CHAIN_ID_ARRAY, VAULT_CONTRACT, PATCH_CONTRACT } from './constants'
import { buildAmountQuery, buildPathQuery } from './utils'
import { CHAIN_TO_TOKENS } from './token-addresses'

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
    chainId: chainId,
    to: contractAddress ?? {
      $or: [VAULT_CONTRACT.toLowerCase(), PATCH_CONTRACT.toLowerCase()],
    },
    input: {
      $abiAbstract: BALANCER_ABI,
      $or: [
        {
          // swap
          singleSwap: {
            assetIn: tokenIn,
            assetOut: tokenOut,
            amount: amountIn,
          },
          funds: {
            recipient: recipient,
          },
        },
        {
          // batch swap
          assets: buildPathQuery(tokenIn, tokenOut),
          limits: buildAmountQuery(amountIn, amountOut),
          funds: {
            recipient: recipient,
          },
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY as number[]
}
