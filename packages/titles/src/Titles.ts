import { getClient } from './client'
import {
  MINT_FEE_ABI,
  TITLES_ABI_V1,
  TITLES_PUBLISHER_V1,
  TITLES_COLLECTION_ABI_V2,
  CHAIN_ID_TO_SLUG,
} from './constants'
import {
  type CreateActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  Chains,
  DEFAULT_ACCOUNT,
  DEFAULT_REFERRAL,
  MintActionParams,
  MintIntentParams,
  formatAmountToFilterOperator,
  formatAmountToInteger,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type PublicClient,
  type TransactionRequest,
  type SimulateContractReturnType,
  encodeFunctionData,
  parseEther,
  zeroHash,
} from 'viem'

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
      amount_: formatAmountToFilterOperator(amount),
      referrer_: referral,
    },
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

  if (tokenId == null) {
    throw new Error('Token ID is required')
  }

  try {
    const client = getClient(chainId)
    const mintFee = (await client.readContract({
      address: contractAddress,
      abi: MINT_FEE_ABI,
      functionName: 'mintFee',
      args: [tokenId],
    })) as bigint

    return {
      actionFee: 0n,
      projectFee: mintFee * quantityToMint,
    }
  } catch (error) {
    // return fallback if any errors occur
    // default mint fee is 0.0005 ETH
    console.error(error)
    return {
      actionFee: 0n,
      projectFee: parseEther('0.0005') * quantityToMint,
    }
  }
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { contractAddress, recipient, tokenId, amount, referral } = mint
  const quantity = formatAmountToInteger(amount)

  const mintArgs = [
    recipient,
    tokenId,
    quantity,
    referral ?? DEFAULT_REFERRAL,
    zeroHash,
  ]

  const data = encodeFunctionData({
    abi: TITLES_COLLECTION_ABI_V2,
    functionName: 'mint',
    args: mintArgs,
  })

  return {
    from: recipient,
    to: contractAddress,
    data,
  }
}

export const simulateMint = async (
  mint: MintIntentParams,
  value: bigint,
  account?: Address,
  _client?: PublicClient,
): Promise<SimulateContractReturnType> => {
  const { chainId, contractAddress, amount, recipient, tokenId, referral } =
    mint

  const client = _client || getClient(chainId)

  if (tokenId == null) {
    throw new Error('Token ID is required')
  }

  const mintArgs = [
    recipient,
    tokenId,
    formatAmountToInteger(amount),
    referral ?? DEFAULT_REFERRAL,
    zeroHash,
  ]

  const result = await client.simulateContract({
    address: contractAddress,
    value,
    abi: TITLES_COLLECTION_ABI_V2,
    functionName: 'mint',
    args: mintArgs,
    account: account ?? DEFAULT_ACCOUNT,
  })
  return result
}

export function getExternalUrl(params: MintActionParams): string {
  const { chainId, contractAddress, tokenId } = params
  const slug = CHAIN_ID_TO_SLUG[chainId]

  if (!slug || !contractAddress || !tokenId) {
    return 'https://titles.xyz'
  }
  return `https://titles.xyz/collect/${slug}/${contractAddress}/${tokenId}`
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
