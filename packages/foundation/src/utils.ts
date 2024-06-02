import { GET_DUTCH_AUCTION_PRICE, GET_FIXED_PRICE } from './constants'
import { type Address, type PublicClient } from 'viem'

export async function getFixedPriceFees(
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

export async function getDutchAuctionFees(
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
