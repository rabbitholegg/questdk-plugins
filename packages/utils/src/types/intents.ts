import type { MintActionParams } from './actions'
export type MintIntentParams = Required<
  Omit<MintActionParams, 'amount' | 'tokenId'>
> & {
  amount: bigint
  tokenId?: number
}
export type IntentParams = MintIntentParams
