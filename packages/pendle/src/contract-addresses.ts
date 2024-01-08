import { SUPPORTED_CHAINS, type SupportedChainId } from './chain-ids'
import { type Address } from 'viem'
import ethereum from '@pendle/core-v2/deployments/1-core.json'
import optimism from '@pendle/core-v2/deployments/10-core.json'
import bsc from '@pendle/core-v2/deployments/56-core.json'
import arbitrum from '@pendle/core-v2/deployments/42161-core.json'

export function toAddress(rawAddress: string): Address {
  return rawAddress.toLowerCase() as Address
}

const CHAIN_TO_ROUTER_ADDRESS: Record<SupportedChainId, Address> = {
  [SUPPORTED_CHAINS.ETHEREUM]: toAddress(ethereum.router),
  [SUPPORTED_CHAINS.OPTIMISM]: toAddress(optimism.router),
  [SUPPORTED_CHAINS.BSC]: toAddress(bsc.router),
  [SUPPORTED_CHAINS.ARBITRUM]: toAddress(arbitrum.router),
}

export const getRouterAddress = (chainId: SupportedChainId): Address => {
  return CHAIN_TO_ROUTER_ADDRESS[chainId]
}
