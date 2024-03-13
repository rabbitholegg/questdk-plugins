import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

export const mint = async (
  mint: MintActionParams,
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
  return [Chains.OPTIMISM, Chains.POLYGON_POS, Chains.BASE, Chains.ZORA]
}
