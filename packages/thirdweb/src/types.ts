export interface ClaimCondition {
  startTimestamp: bigint
  maxClaimableSupply: bigint
  supplyClaimed: bigint
  quantityLimitPerWallet: bigint
  merkleRoot: string
  pricePerToken: bigint
  currency: string
  metadata: string
}
