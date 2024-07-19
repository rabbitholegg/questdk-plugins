import {
  TITLES_ABI_V1,
  TITLES_PUBLISHER_V1,
  TITLES_COLLECTION_ABI_V2,
} from './constants'
import {
  type CreateActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  Chains,
  MintActionParams,
  formatAmount,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const create = async (
  create: CreateActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress } = create
  return compressJson({
    chainId,
    to: contractAddress ?? TITLES_PUBLISHER_V1,
    input: {
      $abi: TITLES_ABI_V1,
    },
  })
}

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, amount, tokenId, recipient, referral } =
    mint

  return compressJson({
    chainId,
    to: contractAddress,
    input: {
      $abi: TITLES_COLLECTION_ABI_V2,
      to_: recipient,
      tokenId_: tokenId,
      amount_: formatAmount(amount),
      referrer_: referral,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Not used for create action
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BASE]
}
