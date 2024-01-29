import { type Address } from 'viem'
import { OPTIMISM } from './chain-ids'

export const LLAMA_TOKENS: Record<number, Address[]> = {
  // TODO arguably we should support any token here?  it's a governance token right that's arbitrary
  [OPTIMISM]: ['0xeccb99806ce0738918f20253f304a373ff197cdd'],
}
