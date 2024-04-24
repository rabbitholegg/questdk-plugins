import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { zeroAddress, type Address } from 'viem'
import { ACROSS_BRIDGE_ABI } from './abi.js'
import { CHAIN_ID_ARRAY } from './chain-ids.js'
import {
  CHAIN_TO_SPOKEPOOL,
  CHAIN_TO_SPOKE_VERIFIER,
  CHAIN_TO_WETH,
} from './contracts.js'
export const bridge = async (bridge: BridgeActionParams) => {
  const { sourceChainId, destinationChainId, tokenAddress, amount, recipient } =
    bridge

  const isNative = tokenAddress === zeroAddress
  const tokenIn = isNative ? CHAIN_TO_WETH[sourceChainId] : tokenAddress
  const bridgeContract = isNative
    ? CHAIN_TO_SPOKE_VERIFIER[sourceChainId]
    : CHAIN_TO_SPOKEPOOL[sourceChainId]

  return compressJson({
    chainId: sourceChainId,
    to: bridgeContract,
    input: {
      $abi: ACROSS_BRIDGE_ABI,
      recipient: recipient,
      destinationChainId: destinationChainId,
      amount: amount,
      originToken: tokenIn,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}
