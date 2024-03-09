import {
  type TransactionFilter,
  type QuestActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { RABBITHOLE_ABI } from './abi'
import {
  DEFAULT_SWAP_TOKEN_LIST,
  RABBITHOLE_QUEST_FACTORY,
} from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
import type { Address } from 'viem'
export const quest = async (
  quest: QuestActionParams,
): Promise<TransactionFilter> => {
  // This is the information we'll use to compose the Transaction object
  const {
    chainId,
    rewardToken,
    rewardAmount,
    startTime,
    endTime,
    totalParticipants,
  } = quest

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: chainId, // The chainId of the source chain
    to: RABBITHOLE_QUEST_FACTORY, // The contract address of the bridge
    input: {
      $abi: RABBITHOLE_ABI,
      rewardTokenAddress_: rewardToken,
      endTime_: endTime,
      startTime_: startTime,
      totalParticipants_: totalParticipants,
      rewardAmount_: rewardAmount,
    }, // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return DEFAULT_SWAP_TOKEN_LIST[_chainId] as Address[]
}

export const getSupportedChainIds = async () => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return CHAIN_ID_ARRAY
}
