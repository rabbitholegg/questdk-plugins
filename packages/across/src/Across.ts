import { ACROSS_BRIDGE_ABI } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import {
  CHAIN_TO_SPOKEPOOL,
  CHAIN_TO_SPOKE_VERIFIER,
  CHAIN_TO_WETH,
} from './contracts'
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { CHAIN_TO_TOKENS } from '@rabbitholegg/questdk-plugin-utils'
import { type Address, zeroAddress } from 'viem'

export const bridge = async (bridge: BridgeActionParams) => {
  const { chainId, destinationChainId, tokenAddress, amount, recipient } =
    bridge

  const isNative = tokenAddress === zeroAddress
  const tokenIn = isNative ? CHAIN_TO_WETH[chainId] : tokenAddress
  const bridgeContract = {
    $or: [
      CHAIN_TO_SPOKE_VERIFIER[chainId]?.toLowerCase(),
      CHAIN_TO_SPOKEPOOL[chainId]?.toLowerCase(),
    ],
  }

  return compressJson({
    chainId: chainId,
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
