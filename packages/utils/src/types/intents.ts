import type { MintActionParams } from './actions'
import type { Address } from 'viem'
export type MintIntentParams = Required<
  Omit<MintActionParams, 'amount' | 'tokenId' | 'referral'>
> & {
  amount: bigint
  tokenId?: number
  referral?: Address
}
export type IntentParams = MintIntentParams
