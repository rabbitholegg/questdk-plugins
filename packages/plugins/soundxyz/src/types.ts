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
