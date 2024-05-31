import axios from 'axios'
import {
  type FollowActionParams,
  type FollowValidationParams,
  type RecastActionParams,
  type RecastValidationParams,
  ActionType,
  type PluginActionValidation,
  type QuestCompletionPayload,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'
import {
  ChannelsResponse,
  ChannelsResponseSchema,
  ConversationResponse,
  ConversationResponseSchema,
  User,
  UsersResponse,
  UsersResponseSchema,
  UserSearch,
  UserSearchSchema,
} from './types'
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
    case ActionType.Recast: {
      const isRecastValid = await validateRecast(
        actionParams.data,
        validationParams.data,
      )
      if (isRecastValid) {
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

    if(typeof actionP.target === 'string' && actionP.type === 'channel') {
      const channelResponse = await fetchChannel(actionP.target, actorFid)
      const channel = channelResponse.channels.at(0)
      if(!channel) return false
      return channel.viewer_context.following || false
    }

    if(typeof actionP.target === 'string' && actionP.type === 'user') {
      const userResponse = await fetchUser(actionP.target, actorFid)
      return userResponse?.viewer_context.following || false
    }

    return false
  } catch (error) {
    return false
  }
}

export const validateRecast = async (
  actionP: RecastActionParams,
  validateP: RecastValidationParams,
): Promise<boolean> => {
  try {
    const actorFid: number | null =
      (await translateAddressToFID(validateP.actor)) || Number(validateP.actor)

    const response = await fetchConversation(actionP.identifier, actorFid)
    return response.conversation.cast.viewer_context.recasted === true
  } catch (error) {
    return false
  }
}

const fetchChannel = async (
  target: string,
  actorFid: number,
): Promise<ChannelsResponse> => {
  const response = await axiosInstance.get('/channel/bulk', {
    params: {
      ids: target,
      type: 'id',
      viewer_fid: actorFid,
    },
  })

  // Validate the response data with the Zod schema
  const parsedResponse: ChannelsResponse = ChannelsResponseSchema.parse(
    response.data,
  )
  return parsedResponse
}

const fetchUser = async (
  target: string | number,
  actorFid: number,
): Promise<User | undefined> => {
  // if we're searching with an FID, use the bulk endpoint
  if (typeof target === 'number') {
    const response = await axiosInstance.get('/user/bulk', {
      params: {
        fids: target,
        viewer_fid: actorFid,
      },
    })

    // Validate the response data with the Zod schema
    const parsedResponse: UsersResponse = UsersResponseSchema.parse(
      response.data,
    )
    return parsedResponse?.users?.at(0)
  }

  // otherwise search by username, there should only be one if the username is correct
  const response = await axiosInstance.get('/user/search', {
    params: {
      q: target,
      viewer_fid: actorFid,
      limit: '1',
    },
  })

  // Validate the response data with the Zod schema
  const parsedResponse: UserSearch = UserSearchSchema.parse(response.data)
  return parsedResponse.result.users.at(0)
}

const fetchConversation = async (
  identifier: string,
  actorFid: number,
): Promise<ConversationResponse> => {
  // fallback if on old node version < 18.17.0
  const isUrl = URL.canParse
    ? URL.canParse(identifier)
    : identifier.startsWith('http')
  const response = await axiosInstance.get('/cast/conversation', {
    params: {
      identifier,
      type: isUrl ? 'url' : 'hash',
      reply_depth: 0,
      include_chronological_parent_casts: false,
      viewer_fid: actorFid,
    },
  })

  // Validate the response data with the Zod schema
  const parsedResponse: ConversationResponse = ConversationResponseSchema.parse(
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
