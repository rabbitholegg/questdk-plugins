import {
  type TransactionFilter,
  type ProposeActionParams,
  type ProposeWithoutProofActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { JOKERACE_ABI } from './abi'

export const propose = async (
  propose: ProposeActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, proposal, proof } = propose
  return compressJson({
    chainId,
    to: contractAddress,
    input: {
      $abi: JOKERACE_ABI,
      proposal: proposal,
      proof: proof,
    },
  })
}

export const proposeWithoutProof = async (
  proposeWithoutProof: ProposeWithoutProofActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, proposal } = proposeWithoutProof
  return compressJson({
    chainId,
    to: contractAddress,
    input: {
      $abi: JOKERACE_ABI,
      proposal: proposal,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ETHEREUM, Chains.OPTIMISM, Chains.GNOSIS, Chains.POLYGON_POS, Chains.POLYGON_ZK, Chains.MANTLE, Chains.BASE, Chains.MODE, Chains.ARBITRUM_ONE, Chains.AVALANCHE, Chains.BLAST, Chains.LINEA, Chains.SCROLL, Chains.ZORA, Chains.SEPOLIA]
}
