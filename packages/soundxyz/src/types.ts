export type MintInfoList = Array<MintInfo>

type MintInfo = {
  edition: string
  tier: number
  scheduleNum: number
  platform: string
  price: bigint
  startTime: number
  endTime: number
  maxMintablePerAccount: number
  maxMintable: number
  minted: number
  affiliateFeeBPS: number
  mode: number
  paused: boolean
  hasMints: boolean
  affiliateMerkleRoot: string
  merkleRoot: string
  signer: string
}

export type TotalPriceAndFees = {
  total: bigint
  subTotal: bigint
  unitPrice: bigint
  finalArtistFee: bigint
  finalAffiliateFee: bigint
  finalPlatformFee: bigint
}

/*
  https://github.com/soundxyz/sound-protocol/blob/f91f87739c1626b8d2d4e9f02ba573671c627698/contracts/modules/interfaces/ISuperMinterV2.sol#L111C1-L126C6
  struct TotalPriceAndFees {
    uint256 total: (`subTotal + platformTxFlatFee + artistReward + affiliateReward + platformReward`).
    uint256 subTotal: The total price before any additive fees.
    uint256 unitPrice: The price per token.
    uint256 finalArtistFee: The final artist fee (inclusive of `finalArtistReward`).
    uint256 finalAffiliateFee: The total affiliate fee (inclusive of `finalAffiliateReward`).
    uint256 finalPlatformFee: The final platform fee (inclusive of `finalPlatformReward`, `perTxFlat`, sum of `perMintBPS`).
  }
*/
