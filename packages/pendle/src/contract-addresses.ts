import { SUPPORTED_CHAINS, type SupportedChainId } from './chain-ids'
import { type Address } from 'viem'

export function toAddress(rawAddress: string): Address {
  return rawAddress.toLowerCase() as Address
}

const CHAIN_TO_ROUTER_ADDRESS: Record<SupportedChainId, Address> = {
  [SUPPORTED_CHAINS.ETHEREUM]: toAddress(
    '0x00000000005BBB0EF59571E58418F9a4357b68A0',
  ),
  [SUPPORTED_CHAINS.OPTIMISM]: toAddress(
    '0x00000000005BBB0EF59571E58418F9a4357b68A0',
  ),
  [SUPPORTED_CHAINS.BSC]: toAddress(
    '0x00000000005BBB0EF59571E58418F9a4357b68A0',
  ),
  [SUPPORTED_CHAINS.ARBITRUM]: toAddress(
    '0x00000000005BBB0EF59571E58418F9a4357b68A0',
  ),
}

export const getRouterAddress = (chainId: SupportedChainId): Address => {
  return CHAIN_TO_ROUTER_ADDRESS[chainId]
}
