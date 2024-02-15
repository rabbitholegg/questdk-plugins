import type { MintActionParams } from './actions'
export type MintIntentParams = Required<Omit<MintActionParams, 'amount'>> & {
  amount: bigint
}
export type IntentParams = MintIntentParams
