import {
  PremintActionParams,
  PremintValidationParams,
} from '@rabbitholegg/questdk-plugin-utils'
import axios from 'axios'
import { PremintResponse, PremintResponseSchema } from './types'

const API_BASE_URL = 'https://mintpool.zora.co'
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const fetchPremint = async (actor: string, actionP: PremintActionParams) => {
  const { chainId, createdAfter } = actionP
  const response = await axiosInstance.get('/list-all', {
    params: {
      chainId,
      creatorAddress: actor,
      from: createdAfter,
    },
  })

  const parsedResponse: PremintResponse = PremintResponseSchema.parse(
    response.data,
  )
  return parsedResponse
}

export const validatePremint = async (
  actionP: PremintActionParams,
  validateP: PremintValidationParams,
): Promise<boolean> => {
  const response = await fetchPremint(validateP.actor, actionP)
  return response.length > 0
}
