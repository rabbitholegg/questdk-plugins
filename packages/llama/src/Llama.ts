import { type VoteActionParams, compressJson } from '@rabbitholegg/questdk'
import { LLAMA_ABI_CAST_APPROVE, LLAMA_ABI_CAST_DISAPPROVE } from './abi.js'
import { CHAIN_ID_ARRAY } from './chain-ids.js'

export const vote = async (voteParams: VoteActionParams) => {
  // This is the information we'll use to compose the Transaction object
  const { chainId, project, proposalId, support } = voteParams

  const supportIsBoolean = support !== undefined && typeof support === 'boolean'

  let abi = []
  if (supportIsBoolean) {
    // if the support param is a boolean, we only want to use the abi that matches the boolean
    if (support) {
      abi = LLAMA_ABI_CAST_APPROVE
    } else {
      abi = LLAMA_ABI_CAST_DISAPPROVE
    }
  } else {
    // if the support param is a filter or undefined, then we can match either an approve or disapprove
    abi = LLAMA_ABI_CAST_APPROVE.concat(LLAMA_ABI_CAST_DISAPPROVE)
  }

  return compressJson({
    chainId: chainId, // The chainId of the source chain
    to: project, // The contract address of the governance platform
    input: {
      $abi: abi,
      ...(proposalId !== undefined && { actionInfo: { id: proposalId } }),
    },
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return []
}

export const getSupportedChainIds = async () => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return CHAIN_ID_ARRAY
}
