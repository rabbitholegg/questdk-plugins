import {
  type TransactionFilter,
  type BridgeActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

export const bridge = async (
  bridge: BridgeActionParams,
): Promise<TransactionFilter> => {
  const { sourceChainId, destinationChainId, tokenAddress, amount, recipient } =
    bridge

  return compressJson({
    chainId: sourceChainId,
    to: '0x0', // The to field is the address of the contract we're interacting with
    input: {}, // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BASE, Chains.ETHEREUM]
}
