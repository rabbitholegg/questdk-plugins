import {
  ActionType,
  type CollectActionParams,
  type CollectValidationParams,
  type PluginActionValidation,
  type QuestCompletionPayload,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { apolloClient } from './apollo-client'
import { gql } from '@apollo/client'
// import assert from 'node:assert'

export const canValidate = (actionType: ActionType): boolean => {
  return actionType === ActionType.Collect
}

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
          questId: questId,
          taskId: taskId,
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

  const query = `query($request: ChallengeRequest!) {
    challenge(request: $request) {
          text
      }
    }
  `
  try {
    // call lens api or graphql endpoint to verify if actor has collected the publication
    const response = await apolloClient.query({
      query: gql(query),
      variables: {
        request: {
          for: "",
          signedBy: ""
        },
      },
    })
    
    return false
  } catch (error) {
    return false
  }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Implementation for fetching supported token addresses - not used for this plugin
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // Implementation for fetching supported chain IDs - not used for this plugin
  return []
}
