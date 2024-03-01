import type { MintActionParams } from './actions'
export type MintIntentParams = Required<Omit<MintActionParams, 'amount'>> & {
  amount: bigint
  tokenId?: number
}
export type IntentParams = MintIntentParams
