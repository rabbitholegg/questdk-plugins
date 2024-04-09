import {
  type TransactionFilter,
  type StakeActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { CREATE_LOCK_ABI, VE_ORBIT_CONTRACT } from './constants'
import { getUnlockTime } from './utils'
import { type Address } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

export const stake = async (
  params: StakeActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, amountOne: amount, duration } = params

  return compressJson({
    chainId,
    to: contractAddress ?? VE_ORBIT_CONTRACT,
    input: {
      $abi: CREATE_LOCK_ABI,
      _value: amount,
      _unlock_time: getUnlockTime(duration),
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  if (_chainId !== Chains.BLAST) {
    return []
  }
  return ['0x42E12D42b3d6C4A74a88A61063856756Ea2DB357'] // ORBIT
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BLAST]
}


