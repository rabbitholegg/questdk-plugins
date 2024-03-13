import {
  compressJson,
  type MintActionParams,
  type TransactionFilter,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'
import {
  ABI_MINT,
  ABI_MULTI,
  ERC1155_CONTRACT,
  ERC721_CONTRACT,
} from './constants'
import {
  shouldIncludeAbiMint,
  getInstanceId,
  type ManifoldInput,
} from './utils'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  let instanceId: number | undefined = undefined

  if (tokenId) {
    instanceId = await getInstanceId(chainId, contractAddress, tokenId)
  }

  const inputConditions: ManifoldInput[] = [
    {
      $abi: ABI_MULTI,
      creatorContractAddress: contractAddress,
      instanceId,
      mintCount: amount,
      mintFor: recipient,
    },
  ]

  if (shouldIncludeAbiMint(amount)) {
    inputConditions.push({
      $abi: ABI_MINT,
      creatorContractAddress: contractAddress,
      instanceId,
      mintFor: recipient,
    })
  }

  return compressJson({
    chainId,
    to: {
      $or: [ERC721_CONTRACT.toLowerCase(), ERC1155_CONTRACT.toLowerCase()],
    },
    input: {
      $or: inputConditions,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.OPTIMISM, Chains.BASE]
}
