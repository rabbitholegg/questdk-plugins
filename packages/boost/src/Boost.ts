import {
  type TransactionFilter,
  type MintActionParams,
  type CompleteActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'
import {
  BOOST_PASS_CONTRACT,
  BOOST_PASS_ABI,
  COMPLETE_BOOST_ABI,
  DATA_ABI_PARAMS,
  QUEST_FACTORY_CONTRACT,
} from './constants'

export const complete = async (
  complete: CompleteActionParams,
): Promise<TransactionFilter> => {
  const { chainId, boostId, actionType } = complete

  return compressJson({
    chainId,
    to: QUEST_FACTORY_CONTRACT,
    input: {
      $abi: COMPLETE_BOOST_ABI,
      compressedData_: {
        $and: [
          // decompress data and compare to incoming value
          {$compareCompressed: { value: boostId }},
          {$compareCompressed: { value: actionType }},
        ],
      },
    },
  })
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

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ARBITRUM_ONE]
}
