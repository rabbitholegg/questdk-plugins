import { getClient } from './client'
import {
  CLAIM_721_FRAGMENT,
  CLAIM_1155_FRAGMENT,
  GET_CLAIM_CONDITION_721_FRAGMENT,
  GET_CLAIM_CONDITION_1155_FRAGMENT,
  GET_CLAIM_ID_721_FRAGMENT,
  GET_CLAIM_ID_1155_FRAGMENT,
} from './constants'
import {
  getClaimCondition,
  getClaimConditionId,
  getContractType,
} from './utils'
import { type TransactionFilter, compressJson } from '@rabbitholegg/questdk'
import {
  Chains,
  DEFAULT_ACCOUNT,
  type MintActionParams,
  type MintIntentParams,
  formatAmountToFilterOperator,
  formatAmountToInteger,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  zeroHash,
} from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, recipient, amount } = mint

  const contractType = await getContractType(chainId, contractAddress)

  const Erc721Filter = {
    $abi: [CLAIM_721_FRAGMENT],
    _receiver: recipient,
    _quantity: formatAmountToFilterOperator(amount),
  }

  const Erc1155Filter = {
    $abi: [CLAIM_1155_FRAGMENT],
    _receiver: recipient,
    _quantity: formatAmountToFilterOperator(amount),
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
  const quantityToMint = formatAmountToInteger(amount)
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

    const { pricePerToken } = await getClaimCondition(
      client,
      contractAddress,
      [claimConditionFragment],
      claimConditionId,
      contractType === '1155' ? tokenId : undefined,
    )

    return {
      actionFee: pricePerToken * quantityToMint,
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

export const simulateMint = async (
  mint: MintIntentParams,
  value: bigint,
  account?: Address,
  _client?: PublicClient,
): Promise<SimulateContractReturnType> => {
  const { chainId, contractAddress, amount, recipient, tokenId } = mint

  const client = _client || getClient(chainId)

  const contractType = await getContractType(chainId, contractAddress, client)

  if (contractType === '1155') {
    const claimConditionId = await getClaimConditionId(
      client,
      contractAddress,
      [GET_CLAIM_ID_1155_FRAGMENT],
      tokenId ?? 0n,
    )
    const claimCondition = await getClaimCondition(
      client,
      contractAddress,
      [GET_CLAIM_CONDITION_1155_FRAGMENT],
      claimConditionId,
      tokenId ?? 0n,
    )

    const mintArgs = [
      recipient,
      tokenId ?? 0n,
      formatAmountToInteger(amount),
      claimCondition.currency,
      value,
      [
        [zeroHash],
        claimCondition.quantityLimitPerWallet,
        claimCondition.pricePerToken,
        claimCondition.currency,
      ],
      '0x',
    ]

    const result = await client.simulateContract({
      address: contractAddress,
      value,
      abi: [CLAIM_1155_FRAGMENT],
      functionName: 'claim',
      args: mintArgs,
      account: account || DEFAULT_ACCOUNT,
    })
    return result
  } else if (contractType === '721') {
    const claimConditionId = await getClaimConditionId(
      client,
      contractAddress,
      [GET_CLAIM_ID_721_FRAGMENT],
    )
    const claimCondition = await getClaimCondition(
      client,
      contractAddress,
      [GET_CLAIM_CONDITION_721_FRAGMENT],
      claimConditionId,
    )

    const mintArgs = [
      recipient,
      formatAmountToInteger(amount),
      claimCondition.currency,
      value,
      [
        [zeroHash],
        claimCondition.quantityLimitPerWallet,
        claimCondition.pricePerToken,
        claimCondition.currency,
      ],
      '0x',
    ]

    const result = await client.simulateContract({
      address: contractAddress,
      value,
      abi: [CLAIM_721_FRAGMENT],
      functionName: 'claim',
      args: mintArgs,
      account: account || DEFAULT_ACCOUNT,
    })
    return result
  }

  throw new Error('Invalid mint arguments')
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
