import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'
import {
  BOOST_PASS_CONTRACT,
  BOOST_PASS_ABI,
  DATA_ABI_PARAMS,
} from './constants'

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
