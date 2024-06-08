import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
  ActionType,
} from '@rabbitholegg/questdk'
import {
  Chains,
  QuestCompletionPayload,
  type PluginActionValidation,
  CompleteActionParams,
  CompleteValidationParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'
import axios from 'axios'
import {
  BOOST_PASS_CONTRACT,
  BOOST_PASS_ABI,
  DATA_ABI_PARAMS,
} from './constants'
import { CompletedBoostResponse, CompletedBoostResponseSchema } from './types'

const API_BASE_URL = 'https://api.boost.xyz'
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const validate = async (
  validationPayload: PluginActionValidation,
): Promise<QuestCompletionPayload | null> => {
  const { actor, payload } = validationPayload
  const { actionParams, validationParams, questId, taskId } = payload
  switch (actionParams.type) {
    case ActionType.Complete: {
      const isCompleteValid = await validateComplete(
        actionParams.data,
        validationParams.data as CompleteValidationParams,
      )
      if (isCompleteValid) {
        return {
          address: actor,
          questId,
          taskId,
        }
      }

      return null
    }
    default:
      throw new Error('Unsupported action type')
  }
}

const fetchCompletedBoosts = async (
  actor: string,
  actionP: CompleteActionParams,
): Promise<CompletedBoostResponse> => {
  const response = await axiosInstance.get('/quests/completed-boosts', {
    params: {
      address: actor,
      completeAfter: actionP.completeAfter,
      actionTypes: actionP.actionType,
      boostId: actionP.boostId,
      chainId: actionP.chainId,
    },
  })

  const parsedResponse: CompletedBoostResponse =
    CompletedBoostResponseSchema.parse(response.data)
  return parsedResponse
}

export const validateComplete = async (
  actionP: CompleteActionParams,
  validateP: CompleteValidationParams,
): Promise<boolean> => {
  const response = await fetchCompletedBoosts(validateP.actor, actionP)
  return response.length > 0
}

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, recipient } = mint

  return compressJson({
    chainId,
    to: contractAddress ?? BOOST_PASS_CONTRACT,
    input: {
      $abi: BOOST_PASS_ABI,
      data_: {
        $abiParams: DATA_ABI_PARAMS,
        recipient,
      },
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] // not required for mint action type
}

export const getSupportedChainIds = async (
  actionType?: ActionType,
): Promise<number[]> => {
  if (actionType === ActionType.Mint) {
    return [Chains.ARBITRUM_ONE]
  }

  return [
    Chains.ARBITRUM_ONE,
    Chains.BASE,
    Chains.BLAST,
    Chains.OPTIMISM,
    Chains.POLYGON_POS,
    Chains.ZORA,
  ]
}
