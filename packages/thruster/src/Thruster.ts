import {
  type SwapActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const swap = async (
  _params: SwapActionParams,
): Promise<TransactionFilter> => {
  return compressJson({
    chainId: '0x0',
    to: '0x0',
    input: {},
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BLAST]
}
