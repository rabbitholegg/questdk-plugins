import { hasAddressCollectedPost } from './validate'
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
    const hasCollected = await hasAddressCollectedPost(
      actionP.identifier,
      validateP.actor as Address,
    )
    return hasCollected
  } catch (err) {
    console.error('[lens-plugin] Error while validating collect action')
    if (err instanceof Error) {
      const error = new Error(err.message)
      error.name = 'ValidationNotValid'
      throw error
    } else {
      console.error(err)
      throw new Error('Unknown error')
    }
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
