import {
  hasAddressCollectedPost,
} from './graphql'
import {
  ActionType,
  type CollectActionParams,
  type CollectValidationParams,
  type PluginActionValidation,
  type QuestCompletionPayload,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const validate = async (
  validationPayload: PluginActionValidation,
): Promise<QuestCompletionPayload | null> => {
  const { actor, payload } = validationPayload
  const { actionParams, validationParams, questId, taskId } = payload
  switch (actionParams.type) {
    case ActionType.Collect: {
      const isCollectValid = await validateCollect(
        actionParams.data,
        validationParams.data,
      )
      if (isCollectValid) {
        return {
          address: actor,
          questId,
          taskId,
        }
      } else {
        return null
      }
    }
    default:
      throw new Error('Unsupported action type')
  }
}

export const validateCollect = async (
  actionP: CollectActionParams,
  validateP: CollectValidationParams,
): Promise<boolean> => {
  try {
    // call lens graphql endpoint to verify if actor has collected the publication
    const hasCollected = await hasAddressCollectedPost(
      actionP.identifier,
      validateP.actor,
    )
    return hasCollected
  } catch {
    return false
  }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return []
}
