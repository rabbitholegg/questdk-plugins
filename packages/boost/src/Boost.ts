import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    recipient,
  } = mint

  return compressJson({
    chainId,
    from: recipient,
    to: contractAddress,
    input: {}, 
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] // not required for mint action type
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ARBITRUM_ONE]
}
