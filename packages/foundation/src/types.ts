import { type Address } from 'viem'

export interface SaleTerms {
  multiTokenContract: Address
  tokenId: bigint
  pricePerQuantity: bigint
  quantityAvailableToMint: bigint
  creatorPaymentAddress: Address
  generalAvailabilityStartTime: bigint
  mintEndTime: bigint
  creatorRevenuePerQuantity: bigint
  referrerRewardPerQuantity: bigint
  worldCuratorRevenuePerQuantity: bigint
  protocolFeePerQuantity: bigint
}
