import {
  type MintActionParams,
  type TransactionFilter,
  type SwapActionParams,
  type StakeActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { VAULT_CONTRACT, CHAIN_TO_TOKENS, TOKENFARM_CONTRACT, VLP_CONTRACT, VELA_CONTRACT } from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { TOKENFARM_ABI, TOKENFARM_ABI2, VAULT_ABI } from './abi'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenIn, amountIn, amountOut, deadline, recipient } = swap

  return compressJson({
    chainId,
    to: contractAddress ?? VAULT_CONTRACT,
    from: recipient,
    input: {
      $abi: VAULT_ABI,
      a: amountIn,
      b: amountOut, 
      c: deadline,
    },
  })
}

export const mint = async (
  mint: SwapActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenIn, amountIn, recipient } = mint

  return compressJson({
    chainId,
    to: contractAddress ?? VAULT_CONTRACT,
    from: recipient,
    input: {
      $abi: VAULT_ABI,
      _account: recipient,
      _token: tokenIn,
      _amount: amountIn,
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
