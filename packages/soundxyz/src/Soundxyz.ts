
import { type TransactionFilter, type MintActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'

export const mint = async (mint: MintActionParams): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = mint

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: 0, // The chainId of the source chain
    to:  0x0,   // The contract address of the bridge
    input: {},  // The input object is where we'll put the ABI and the parameters
  })
}


export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  return [] // no tokenAddresses for mint action
}


export const getSupportedChainIds = async (): Promise<number[]> => {
  return []
}
