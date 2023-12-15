import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { zoraUniversalMinterAddress } from '@zoralabs/universal-minter'
import { type Address } from 'viem'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { ZORA_MINTER_ABI } from './abi'
import type { Chains } from './utils'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const universalMinter = zoraUniversalMinterAddress[
    chainId as Chains
  ].toLowerCase() as Address

  const mintContract = universalMinter
    ? { $or: [contractAddress.toLowerCase(), universalMinter] }
    : contractAddress

  const andArray = []
  if (recipient) {
    andArray.push({
      $or: [{ recipient }, { tokenRecipient: recipient }, { to: recipient }],
    })
  }
  if (tokenId || amount) {
    andArray.push({
      quantity: amount,
      tokenId,
    })
  }

  return compressJson({
    chainId,
    to: mintContract,
    input: {
      $abiAbstract: ZORA_MINTER_ABI,
      $and: andArray,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] /// Supported tokens don't apply for the mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY as number[]
}
