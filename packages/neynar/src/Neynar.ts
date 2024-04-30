import axios from 'axios'
import {
  type FollowActionParams,
  type FollowValidationParams,
  type ActionType,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

const API_BASE_URL = 'https://api.neynar.com/v2/farcaster/followers'
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'api_key': process.env.NEYNAR_API_KEY,
  },
})

export const validate = async(actionType: ActionType, actionP: FollowActionParams, validateP: FollowValidationParams) => {
  switch(actionType) {
    case ActionType.Follow:
      return await validateFollow(actionP, validateP)
    default:
      // Implement other action types as needed
      return false
  }
}

export const validateFollow = async (actionP: FollowActionParams, validateP: FollowValidationParams): Promise<boolean> => {
  try {
    let cursor: string | null = null
    do {
      const response = await fetchFollowers(actionP.target, cursor)
      const followers = response.data.users
      const actorIsFollower = followers.some(follower => follower.custody_address === validateP.actor)
      if (actorIsFollower) {
        return true
      }
      cursor = response.data.next.cursor
    } while (cursor)
    return false
  } catch (error) {
    console.error('Failed to validate follow relationship:', error)
    return false
  }
}

const fetchFollowers = async (target: string, cursor: string | null) => {
  const response = await axiosInstance.get('', {
    params: {
      fid: target,
      cursor: cursor,
      limit: 100,  // Use maximum limit to reduce the number of requests
    },
  })
  return response.data
}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  // Implementation for fetching supported token addresses
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // Implementation for fetching supported chain IDs
  return []
}