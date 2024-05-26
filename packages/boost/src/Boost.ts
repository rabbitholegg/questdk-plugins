import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
  ActionType
} from '@rabbitholegg/questdk'
import { Chains, QuestCompletionPayload, type PluginActionValidation, CompleteActionParams, CompleteValidationParams } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'
import {
  BOOST_PASS_CONTRACT,
  BOOST_PASS_ABI,
  DATA_ABI_PARAMS,
} from './constants'

export const validate = async (validationPayload: PluginActionValidation): Promise<QuestCompletionPayload | null> => {
  const { actor, payload } = validationPayload
  const { actionParams, validationParams, questId, taskId } = payload
  switch (actionParams.type) {
    case ActionType.Complete: {
      const isCompleteValid = await validateComplete(actionParams.data, validationParams.data)
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

export const validateComplete = async (
  actionP: CompleteActionParams,
  validateP: CompleteValidationParams,
): Promise<boolean> => {
  console.log({ actionP, validateP })
  // TODO: Check against API here and only return true if valid
  return false
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

export const getSupportedChainIds = async (actionType?: ActionType): Promise<number[]> => {
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
