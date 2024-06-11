import { SUPPORTS_INTERFACE_ABI } from './abi'
import {
  GET_DUTCH_AUCTION_PRICE,
  GET_FIXED_PRICE,
  GET_FIXED_PRICE_1155,
  GET_SALE_TERMS_1155,
  REFERRAL_ADDRESS,
} from './constants'
import { type SaleTerms } from './types'
import {
  chainIdToViemChain,
  type FilterOperator,
  type MintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address, type PublicClient, createPublicClient, http } from 'viem'

export async function getFixedPriceData(
  client: PublicClient,
  address: Address,
  contractAddress: Address,
) {
  const result = await client.readContract({
    address,
    abi: [GET_FIXED_PRICE],
    functionName: 'getFixedPriceSaleV2',
    args: [contractAddress],
  })
  return {
    seller: result[0] as Address,
    actionFee: result[1] as bigint,
    projectFee: result[7] as bigint,
  }
}

export async function getDutchAuctionData(
  client: PublicClient,
  address: Address,
  contractAddress: Address,
) {
  const result = await client.readContract({
    address,
    abi: [GET_DUTCH_AUCTION_PRICE],
    functionName: 'getDutchAuctionV2',
    args: [contractAddress],
  })
  return {
    seller: result[0] as Address,
    actionFee: result[8] as bigint,
    projectFee: result[9] as bigint,
  }
}

export function calculateFees(
  pricingInfo: { actionFee: bigint; projectFee: bigint },
  quantity: bigint,
) {
  return {
    actionFee: pricingInfo.actionFee * quantity,
    projectFee: pricingInfo.projectFee * quantity,
  }
}

export async function getSaleTermsId(
  mint: MintActionParams,
  multiTokenAddress: Address,
) {
  const { chainId, contractAddress, tokenId } = mint
  if (tokenId === undefined) return undefined

  try {
    const client = createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    }) as PublicClient

    const result = (await client.readContract({
      address: multiTokenAddress,
      abi: [GET_SALE_TERMS_1155],
      functionName: 'getSaleTermsForToken',
      args: [contractAddress, tokenId],
    })) as bigint

    return result
  } catch {
    return null
  }
}

export async function getFixedPriceSaleTerms(
  client: PublicClient,
  salesTermId: bigint,
  multiTokenAddress: Address,
): Promise<SaleTerms> {
  return (await client.readContract({
    address: multiTokenAddress,
    abi: [GET_FIXED_PRICE_1155],
    functionName: 'getFixedPriceSale',
    args: [salesTermId, REFERRAL_ADDRESS],
  })) as SaleTerms
}
export async function getContractType(
  client: PublicClient,
  contractAddress: Address,
): Promise<'1155' | '721'> {
  const abi = SUPPORTS_INTERFACE_ABI
  const interfaceIds = {
    '1155': '0xd9b67a26', // ERC-1155
    '721': '0x80ac58cd', // ERC-721
  }

  for (const [type, interfaceId] of Object.entries(interfaceIds)) {
    try {
      const supportsInterface = (await client.readContract({
        address: contractAddress,
        abi,
        functionName: 'supportsInterface',
        args: [interfaceId],
      })) as boolean

      if (supportsInterface) {
        return type as '1155' | '721'
      }
    } catch {}
  }
  throw new Error('Invalid contract type')
}

export function formatAmount(amount: FilterOperator | undefined) {
  if (amount === undefined) {
    return undefined
  }
  if (amount && ['string', 'number', 'bigint'].includes(typeof amount)) {
    return { $gte: amount }
  }

  return amount
}

export function getMintAmount(amount: FilterOperator | undefined) {
  if (!amount) {
    return 1n
  }
  // If the amount is a primitive, pass that value through
  if (['number', 'bigint'].includes(typeof amount)) {
    return BigInt(amount as number | bigint)
  }
  if (typeof amount === 'string' && !isNaN(Number(amount))) {
    return BigInt(amount)
  }

  // For $gte, the minimum amount required to pass is the value of $gte
  if (typeof amount === 'object' && '$gte' in amount && amount.$gte) {
    return BigInt(amount.$gte)
  }
  // For $gt, the minimum amount required to pass is the value of $gt + 1
  if (typeof amount === 'object' && '$gt' in amount && amount.$gt) {
    return BigInt(amount.$gt) + 1n
  }
  // For $lt or $lte, the minimum amount required to pass is 1
  return 1n
}
