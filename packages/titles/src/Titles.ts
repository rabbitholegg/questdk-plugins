import { getClient } from './client'
import {
  MINT_FEE_ABI,
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
  DEFAULT_ACCOUNT,
  DEFAULT_REFERRAL,
  MintActionParams,
  MintIntentParams,
  formatAmount,
  getMintAmount,
} from '@rabbitholegg/questdk-plugin-utils'
import { parseEther, type Address, type PublicClient, type SimulateContractReturnType, zeroHash } from 'viem'

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

export const simulateMint = async (
  mint: MintIntentParams,
  value: bigint,
  account?: Address,
  _client?: PublicClient,
): Promise<SimulateContractReturnType> => {
  const { chainId, contractAddress, amount, recipient, tokenId, referral } = mint

  const client = _client || getClient(chainId)

  if (tokenId == null) {
    throw new Error('Token ID is required')
  }

  const mintArgs = [
    recipient,
    tokenId,
    getMintAmount(amount),
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

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Not used for create action
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BASE]
}
