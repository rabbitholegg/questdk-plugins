import { getClient } from './client'
import {
  CLAIM_1155_FRAGMENT,
  CLAIM_721_FRAGMENT,
  GET_CLAIM_ID_1155_FRAGMENT,
  GET_CLAIM_CONDITION_1155_FRAGMENT,
  GET_CLAIM_CONDITION_721_FRAGMENT,
  GET_CLAIM_ID_721_FRAGMENT,
} from './constants'
import {
  getContractType,
  getMintAmount,
  formatAmount,
  getClaimConditionId,
  getMintFee,
} from './utils'
import { type Address } from 'viem'
import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, recipient, amount } = mint

  const contractType = await getContractType(chainId, contractAddress)

  const Erc721Filter = {
    $abi: [CLAIM_721_FRAGMENT],
    _receiver: recipient,
    _quantity: formatAmount(amount),
  }

  const Erc1155Filter = {
    $abi: [CLAIM_1155_FRAGMENT],
    _receiver: recipient,
    _quantity: formatAmount(amount),
    _tokenId: tokenId,
  }

  return compressJson({
    chainId,
    to: contractAddress,
    input: contractType === '721' ? Erc721Filter : Erc1155Filter,
  })
}

export const getProjectFees = async (
  mint: MintActionParams,
): Promise<bigint> => {
  const fees = await getFees(mint)
  return fees.projectFee + fees.actionFee
}

export const getFees = async (
  mint: MintActionParams,
): Promise<{ actionFee: bigint; projectFee: bigint }> => {
  const { chainId, contractAddress, amount, tokenId } = mint
  const quantityToMint = getMintAmount(amount)
  const client = getClient(chainId)

  try {
    const contractType = await getContractType(chainId, contractAddress)
    const claimIdFragment =
      contractType === '721'
        ? GET_CLAIM_ID_721_FRAGMENT
        : GET_CLAIM_ID_1155_FRAGMENT
    const claimConditionFragment =
      contractType === '721'
        ? GET_CLAIM_CONDITION_721_FRAGMENT
        : GET_CLAIM_CONDITION_1155_FRAGMENT

    const claimConditionId = await getClaimConditionId(
      client,
      contractAddress,
      [claimIdFragment],
      contractType === '1155' ? tokenId : undefined,
    )

    const mintFee = await getMintFee(
      client,
      contractAddress,
      [claimConditionFragment],
      claimConditionId,
      contractType === '1155' ? tokenId : undefined,
    )

    return {
      actionFee: mintFee * quantityToMint,
      projectFee: 0n,
    }
  } catch (error) {
    // return fallback if any errors occur
    return {
      actionFee: 0n,
      projectFee: 0n,
    }
  }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [
    Chains.ETHEREUM,
    Chains.OPTIMISM,
    Chains.POLYGON_POS,
    Chains.BASE,
    Chains.ARBITRUM_ONE,
  ]
}
