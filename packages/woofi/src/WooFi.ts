import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address, zeroAddress } from 'viem'
import { SWAP_ABI } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { CHAIN_TO_TOKENS, CHAIN_TO_ROUTER } from './contract-addresses'

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

  const swapContract = contractAddress ?? CHAIN_TO_ROUTER[chainId]

  if (swapContract === undefined) {
    throw new Error('contract address is not valid')
  }

  const fromToken =
    tokenIn === zeroAddress
      ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      : tokenIn
  const toToken =
    tokenOut === zeroAddress
      ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      : tokenOut

  return compressJson({
    chainId,
    to: swapContract,
    input: {
      $abi: SWAP_ABI,
      fromToken,
      toToken,
      fromAmount: amountIn,
      minToAmount: amountOut,
      to: recipient,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
