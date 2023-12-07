import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address, zeroAddress } from 'viem'
import { SWAP_ABI } from './abi'
import { CHAIN_TO_ROUTER } from './contract-addresses'

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
      $or: [
        {
          fromToken,
          toToken,
          fromAmount: amountIn,
          minToAmount: amountOut,
          to: recipient,
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
}
