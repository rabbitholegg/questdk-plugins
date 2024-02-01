import {
  type TransactionFilter,
  type OptionsActionParams,
  type StakeActionParams,
  ActionType,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import {
  VAULT_CONTRACT,
  CHAIN_TO_TOKENS,
  TOKENFARM_CONTRACT,
  VLP_CONTRACT,
  VELA_CONTRACT,
} from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
import {
  getTokenPacked,
  getAmountPacked,
  getOrderTypePacked,
  getStakeInputs,
} from './utils'
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

export const stake = async (
  stake: StakeActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenOne, amountOne } = stake

  return compressJson({
    chainId,
    to: contractAddress ?? TOKENFARM_CONTRACT,
    input: getStakeInputs(tokenOne, amountOne),
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
  actionType?: ActionType,
): Promise<Address[]> => {
  if (actionType === undefined) return []
  if (actionType === ActionType.Stake) {
    return [VLP_CONTRACT, VELA_CONTRACT]
  }
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
