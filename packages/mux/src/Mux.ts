import {
  type TransactionFilter,
  type OptionsActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'

export const options = async (
  trade: OptionsActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, token, amount, recipient, orderType } =
    trade

  return compressJson({
    chainId,
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return []
}
