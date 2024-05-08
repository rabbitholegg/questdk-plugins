import { ABI } from './abi.js'
import { CHAIN_TO_CONTRACT } from './chain-to-contract'
import { CHAIN_TO_TOKENS } from './chain-to-tokens'
import {
  type BridgeActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address, zeroAddress } from 'viem'

export const bridge = async (
  bridge: BridgeActionParams,
): Promise<TransactionFilter> => {
  const {
    chainId,
    destinationChainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  const bridgeContract = contractAddress ?? CHAIN_TO_CONTRACT[chainId]
  const isNative = tokenAddress === zeroAddress
  const tokenAmount = tokenAddress && !isNative ? amount : undefined
  const token = tokenAddress && !isNative ? tokenAddress : undefined

  return compressJson({
    chainId: chainId,
    to: bridgeContract,
    value: isNative ? amount : undefined,
    input: {
      $abi: ABI,
      toChainId: destinationChainId,
      receiver: recipient,
      tokenAddress: token,
      amount: tokenAmount,
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
