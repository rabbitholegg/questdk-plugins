import {
  type TransactionFilter,
  type OptionsActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { VAULT_CONTRACT, CHAIN_TO_TOKENS } from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { getTokenPacked, getAmountPacked, getOrderTypePacked } from './utils'
import { VAULT_ABI } from './abi'

export const options = async (
  trade: OptionsActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, token, amount, recipient, orderType } =
    trade

  const a =
    token && orderType
      ? { $and: [getTokenPacked(token), getOrderTypePacked(orderType)] }
      : getTokenPacked(token) || getOrderTypePacked(orderType)

  return compressJson({
    chainId,
    to: contractAddress ?? VAULT_CONTRACT,
    from: recipient,
    input: {
      $abi: VAULT_ABI,
      a,
      c: getAmountPacked(amount),
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
