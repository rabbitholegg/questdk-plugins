import axios from 'axios'
import {
  type FollowActionParams,
  type FollowValidationParams,
  type ActionType,
  type PluginActionValidation,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'
import { FollowersResponse, FollowersResponseSchema } from './types'
import { isAddress } from 'viem'

const API_BASE_URL = 'https://api.neynar.com/v2/farcaster'
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    api_key: process.env.NEYNAR_API_KEY,
  },
})

export const validate = async (validationPayload: PluginActionValidation) => {
  switch (validationPayload.payload.params.type) {
    case ActionType.Follow:
      return await validateFollow(
        validationPayload.payload.params,
        validationPayload.payload.validationParams,
      )
    default:
      // Implement other action types as needed
      return false
  }
}

export const validateFollow = async (
  actionP: FollowActionParams,
  validateP: FollowValidationParams,
): Promise<boolean> => {
  try {
    let cursor: string | null = null
    const actorAddress: string | null = await translateAddressToFID(
      validateP.actor,
    )
    do {
      const response = await fetchFollowers(actionP.target, cursor)
      const followers = response.users
      const actorIsFollower = followers.some(
        (follower) =>
          follower.custody_address === (actorAddress || validateP.actor),
      )
      if (actorIsFollower) {
        return true
      }
      cursor = response.next.cursor
    } while (cursor)
    return false
  } catch (error) {
    console.error('Failed to validate follow relationship:', error)
    return false
  }
}

const fetchFollowers = async (
  target: string,
  cursor: string | null,
): Promise<FollowersResponse> => {
  const response = await axiosInstance.get('/followers', {
    params: {
      fid: target,
      cursor: cursor,
      limit: 100, // Use maximum limit to reduce the number of requests
    },
  })
  console.log('response', response)

  // Validate the response data with the Zod schema
  const parsedResponse: FollowersResponse = FollowersResponseSchema.parse(
    response.data,
  )

  return parsedResponse
}

export const translateAddressToFID = async (
  address: string,
): Promise<string | null> => {
  if (isAddress(address)) {
    const response = await axiosInstance.get('/user/bulk-by-address', {
      params: {
        addresses: address,
      },
    })

    // Assuming the first user in the response is the one we're interested in
    return response.data[0]?.custody_address || null
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
