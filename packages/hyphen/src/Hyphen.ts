import {
  type BridgeActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { zeroAddress, type Address } from 'viem'
import { ABI } from './abi.js'
import { CHAIN_TO_TOKENS } from './chain-to-tokens'
import { CHAIN_TO_CONTRACT } from './chain-to-contract'

export const bridge = async (
  bridge: BridgeActionParams,
): Promise<TransactionFilter> => {
  const {
    sourceChainId,
    destinationChainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  const bridgeContract = contractAddress ?? CHAIN_TO_CONTRACT[sourceChainId]
  const isNative = tokenAddress === zeroAddress

  return compressJson({
    chainId: sourceChainId,
    to: bridgeContract,
    value: isNative ? amount : undefined,
    input: {
      $abi: ABI,
      toChainId: destinationChainId,
      receiver: recipient,
      tokenAddress: isNative ? undefined : tokenAddress,
      amount: isNative ? undefined : amount,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [
    Chains.ETHEREUM,
    Chains.OPTIMISM,
    Chains.BINANCE_SMART_CHAIN,
    Chains.POLYGON_POS,
    Chains.ARBITRUM_ONE,
    Chains.AVALANCHE,
  ]
}
