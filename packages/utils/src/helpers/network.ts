import { NETWORK_TO_CHAIN_ID, NETWORK_TO_NAME } from '../constants/network'
import { NetworkNameSchema } from '../types'

export function networkStringToChainId(network?: string | null) {
  const result = NetworkNameSchema.safeParse(network?.toLowerCase())
  
  if (!result.success) {
    return undefined
  }
  
  return NETWORK_TO_CHAIN_ID[result.data]
}
  
export function networkStringToName(network?: string) {
  const result = NetworkNameSchema.safeParse(network?.toLowerCase())
  
  if (!result.success) {
    return undefined
  }
  
  return NETWORK_TO_NAME[result.data]
}
  