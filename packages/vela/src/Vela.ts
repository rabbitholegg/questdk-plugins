import {
  type TransactionFilter,
  type OptionsActionParams,
  type StakeActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { VAULT_CONTRACT, CHAIN_TO_TOKENS, TOKENFARM_CONTRACT, VLP_CONTRACT, VELA_CONTRACT } from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { getTokenPacked, getAmountPacked, getOrderTypePacked } from './utils'
import { VAULT_ABI, TOKENFARM_ABI, TOKENFARM_ABI2 } from './abi'

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

export const mint = async (
  mint: OptionsActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, token, amount, recipient } = mint

  return compressJson({
    chainId,
    to: contractAddress ?? VAULT_CONTRACT,
    from: recipient,
    input: {
      $abi: VAULT_ABI,
      _account: recipient,
      _token: token,
      _amount: amount,
    },
  })
}

export const stake = async (
  stake: StakeActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenOne, amountOne } = stake

    if (tokenOne.toLowerCase() == VLP_CONTRACT) {
      return compressJson({
        chainId,
        to: contractAddress ?? TOKENFARM_CONTRACT,
        input: {
          $abi: TOKENFARM_ABI,
          _amount: amountOne,
        },
      })
    } else {
      return compressJson({
        chainId,
        to: contractAddress ?? TOKENFARM_CONTRACT,
        input: {
          $abi: TOKENFARM_ABI2,
          _amount: amountOne,
        },
      })
    }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
