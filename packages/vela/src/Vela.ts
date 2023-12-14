import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { VAULT_CONTRACT } from './contract-addresses'
import { getTokenPacked, getAmountPacked } from './utils'
import { VAULT_ABI } from './abi'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    amountIn,
    recipient,
  } = swap

  return compressJson({
    chainId,
    to: contractAddress ?? VAULT_CONTRACT,
    from: recipient,
    input: {
      $abi: VAULT_ABI,
      a: getTokenPacked(tokenIn),
      c: getAmountPacked(amountIn)
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return []
}
