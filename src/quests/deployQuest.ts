import contractFactoryABI from '../abi/quest-factory.json'
import { compressJson } from '../index.js'
import { QUEST_FACTORY_ADDRESS } from './constants.js'
import type { Quest } from './types.js'
import { type TransactionRequest, encodeFunctionData } from 'viem'

const assertReward = (reward: Quest['reward']) => {
  // TODO: add reward assertions
  return reward || true
}

const assertParticipants = (participants: Quest['participants']) => {
  // TODO: add reward assertions
  return participants || true
}

export const assertQuest = (quest: Quest) => {
  assertReward(quest.reward)
  assertParticipants(quest.participants)

  return !!quest.startTime && !!quest.endTime
}

export const deployQuest = (
  quest: Quest,
): Pick<TransactionRequest, 'to' | 'data'> => {
  assertQuest(quest)

  const data = encodeFunctionData({
    abi: contractFactoryABI,
    functionName: 'createQuestAndQueue',
    args: [
      quest.reward.tokenAddress,
      quest.endTime,
      quest.startTime,
      quest.participants.max,
      quest.reward.amount,
      '', // questId (deprecated)
      JSON.stringify(compressJson(quest.actions)),
      '', // discount token (not used)
    ],
  })

  return {
    to: QUEST_FACTORY_ADDRESS(quest.reward.chainId),
    data,
  }
}
