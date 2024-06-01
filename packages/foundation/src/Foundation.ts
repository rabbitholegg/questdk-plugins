import {
  CHAIN_TO_CONTRACT_ADDRESS,
  DUTCH_AUCTION_FRAGMENT,
  FIXED_PRICE_FRAGMENTS,
} from './constants'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  Chains,
  DEFAULT_ACCOUNT,
  type MintIntentParams,
  chainIdToViemChain,
  getExitAddresses,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  http,
  pad,
  parseEther,
} from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, amount, recipient } = mint

  const dropFactoryAddress = CHAIN_TO_CONTRACT_ADDRESS[chainId]

  return compressJson({
    chainId,
    to: dropFactoryAddress,
    input: {
      $abi: [...FIXED_PRICE_FRAGMENTS, DUTCH_AUCTION_FRAGMENT],
      count: amount ? { $gte: amount } : undefined,
      nftContract: contractAddress,
      nftRecipient: recipient,
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
  const { chainId, contractAddress, tokenId, amount } = mint
  const quantityToMint = typeof amount === 'number' ? BigInt(amount) : BigInt(1)
  try {
    const client = createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })
    const fixedPriceSaleStratAddress = FIXED_PRICE_SALE_STRATS[chainId]
    const _tokenId = tokenId ?? 1

    const { pricePerToken } = (await client.readContract({
      address: fixedPriceSaleStratAddress,
      abi: FEES_ABI,
      functionName: 'sale',
      args: [contractAddress, _tokenId],
    })) as { pricePerToken: bigint }

    const mintFee = (await client.readContract({
      address: contractAddress,
      abi: FEES_ABI,
      functionName: 'mintFee',
    })) as bigint

    return {
      actionFee: pricePerToken * quantityToMint,
      projectFee: mintFee * quantityToMint,
    }
  } catch {
    return {
      actionFee: parseEther('0'),
      projectFee: parseEther('0.0007') * quantityToMint,
    }
  }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Not used for Mint Action
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ETHEREUM, Chains.BASE]
}
