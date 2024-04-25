import { ACROSS_BRIDGE_ABI } from './abi.js'
import { CHAIN_ID_ARRAY } from './chain-ids.js'
import {
  CHAIN_TO_SPOKEPOOL,
  CHAIN_TO_SPOKE_VERIFIER,
  CHAIN_TO_WETH,
} from './contracts.js'
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { CHAIN_TO_TOKENS } from '@rabbitholegg/questdk-plugin-utils'
import { type Address, zeroAddress } from 'viem'

export const bridge = async (bridge: BridgeActionParams) => {
  const { sourceChainId, destinationChainId, tokenAddress, amount, recipient } =
    bridge

  const isNative = tokenAddress === zeroAddress
  const tokenIn = isNative ? CHAIN_TO_WETH[sourceChainId] : tokenAddress
  const bridgeContract = {
    $or: [
      CHAIN_TO_SPOKE_VERIFIER[sourceChainId]?.toLowerCase(),
      CHAIN_TO_SPOKEPOOL[sourceChainId]?.toLowerCase(),
    ],
  }

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
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}
