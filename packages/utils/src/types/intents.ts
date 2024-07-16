import type { MintActionParams } from './actions'
export type MintIntentParams = Required<
  Omit<MintActionParams, 'amount' | 'tokenId' | 'referral'>
> & {
  amount: bigint
  tokenId?: number
  referral?: string
}
export type IntentParams = MintIntentParams
