import {
  CHAIN_TO_CONTRACT_ADDRESS,
  DUTCH_AUCTION_FRAGMENT,
  FIXED_PRICE_FRAGMENTS,
} from './constants'
import { calculateFees, getDutchAuctionFees, getFixedPriceFees } from './utils'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains, chainIdToViemChain } from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type PublicClient,
  createPublicClient,
  http,
  parseEther,
  zeroAddress,
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
  const { chainId, contractAddress, amount } = mint
  const quantityToMint = typeof amount === 'number' ? BigInt(amount) : BigInt(1)

  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  }) as PublicClient
  const dropFactoryAddress = CHAIN_TO_CONTRACT_ADDRESS[chainId]

  try {
    const fixedPriceResult = await getFixedPriceFees(
      client,
      dropFactoryAddress,
      contractAddress,
    )

    if (fixedPriceResult.seller === zeroAddress) {
      const dutchAuctionResult = await getDutchAuctionFees(
        client,
        dropFactoryAddress,
        contractAddress,
      )
      return calculateFees(dutchAuctionResult, quantityToMint)
    }

    return calculateFees(fixedPriceResult, quantityToMint)
  } catch (error) {
    // return fallback if any error
    return {
      actionFee: parseEther('0'),
      projectFee: parseEther('0.0008') * quantityToMint,
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
