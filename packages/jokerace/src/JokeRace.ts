import {
  type TransactionFilter,
  type VoteActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { JOKERACE_CAST_VOTE_WITHOUT_PROOF_ABI } from './abi'

export const vote = async (
  vote: VoteActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, support, proposalId, numVotes } = vote
  return compressJson({
    chainId,
    to: contractAddress,
    input: {
      $abi: JOKERACE_CAST_VOTE_WITHOUT_PROOF_ABI,
      proposalId: proposalId,
      support: support,
      numVotes: numVotes,
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
