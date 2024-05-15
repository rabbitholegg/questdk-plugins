import { TITLES_ABI_V1, TITLES_PUBLISHER_V1 } from './constants'
import {
  type TransactionFilter,
  type CreateActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

export const create = async (
  create: CreateActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress } = create
  return compressJson({
    chainId,
    to: contractAddress ?? TITLES_PUBLISHER_V1,
    input: {
      $abi: TITLES_ABI_V1,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Not used for create action
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BASE]
}
