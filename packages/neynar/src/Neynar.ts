import axios from 'axios'
import {
  type FollowActionParams,
  type FollowValidationParams,
  ActionType,
  type PluginActionValidation,
  type QuestCompletionPayload,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'
import { FollowersResponse, FollowersResponseSchema } from './types'
import { isAddress } from 'viem'
import assert from 'node:assert'

const API_BASE_URL = 'https://api.neynar.com/v2/farcaster'
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    api_key: process.env.NEYNAR_API_KEY,
  },
})

export const canValidate = (actionType: ActionType): boolean => {
  return actionType === ActionType.Follow
}

export const validate = async (
  validationPayload: PluginActionValidation,
): Promise<QuestCompletionPayload | null> => {
  const { actor, payload } = validationPayload
  const { actionParams, validationParams, questId, taskId } = payload
  assert.ok(process.env.NEYNAR_API_KEY, 'Neynar API key not found')
  switch (actionParams.type) {
    case ActionType.Follow: {
      const isFollowValid = await validateFollow(
        actionParams.data,
        validationParams.data,
      )
      if (isFollowValid) {
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

export const validateFollow = async (
  actionP: FollowActionParams,
  validateP: FollowValidationParams,
): Promise<boolean> => {
  try {
    const actorFid: number | null =
      (await translateAddressToFID(validateP.actor)) || Number(validateP.actor)

    const response = await fetchUser(actionP.target, actorFid)
    if (response.users[0].viewer_context.following)
      return response.users[0].viewer_context.following

    return false
  } catch (error) {
    return false
  }
}

const fetchUser = async (
  target: string,
  actorFid: number,
): Promise<FollowersResponse> => {
  const response = await axiosInstance.get('/user/bulk', {
    params: {
      fids: target,
      viewer_fid: actorFid,
    },
  })

  // Validate the response data with the Zod schema
  const parsedResponse: FollowersResponse = FollowersResponseSchema.parse(
    response.data,
  )
  return parsedResponse
}

export const translateAddressToFID = async (
  address: string,
): Promise<number | null> => {
  if (isAddress(address)) {
    const response = await axiosInstance.get('/user/bulk-by-address', {
      params: {
        addresses: address,
      },
    })
    if (
      response &&
      response.data &&
      response.data[address] &&
      response.data[address][0]
    )
      // Assuming the first user in the response is the one we're interested in
      return response.data[address][0]?.fid || null
  }
  return null
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
