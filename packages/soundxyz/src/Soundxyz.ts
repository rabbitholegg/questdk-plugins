import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { SUPERMINTER, SUPERMINTER_V2 } from './constants'
import { SUPERMINTER_ABI } from './abi'
import { Chains } from './utils'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, amount, recipient } = mint

  return compressJson({
    chainId,
    to: {
      $or: [SUPERMINTER.toLowerCase(), SUPERMINTER_V2.toLowerCase()],
    },
    input: {
      $abi: SUPERMINTER_ABI,
      p: {
        edition: contractAddress,
        quantity: amount,
        to: recipient, // Can be given as gift, so recipient will not always match sender
      },
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] // no tokenAddresses for mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ETHEREUM, Chains.OPTIMISM, Chains.BASE]
}
