import {
  BASE_ERC20_ABI,
  BASE_ETH_ABI,
  ETH,
  ETHEREUM_ERC20_ABI,
  ETHEREUM_ETH_ABI,
  baseContracts,
  ethereumContracts,
} from './constants'
import {
  type BridgeActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { CHAIN_TO_TOKENS, Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const bridge = async (
  params: BridgeActionParams,
): Promise<TransactionFilter> => {
  const { sourceChainId } = params

  return sourceChainId === Chains.ETHEREUM
    ? bridgeFromEthereum(params)
    : bridgeFromBase(params)
}

const bridgeFromEthereum = async (
  params: BridgeActionParams,
): Promise<TransactionFilter> => {
  const { amount, contractAddress, recipient, sourceChainId, tokenAddress } =
    params

  const contracts = contractAddress ? [contractAddress] : ethereumContracts

  return compressJson({
    chainId: sourceChainId,
    to: { $or: contracts.map((c) => c.toLowerCase()) },
    input: {
      $or: [
        { $abi: ETHEREUM_ETH_ABI, _to: recipient, _value: amount },
        {
          $abi: ETHEREUM_ERC20_ABI,
          mintRecipient: recipient,
          amount,
          burnToken: tokenAddress,
        },
      ],
    },
  })
}

const bridgeFromBase = async (
  params: BridgeActionParams,
): Promise<TransactionFilter> => {
  const { amount, contractAddress, recipient, sourceChainId, tokenAddress } =
    params

  const contracts = contractAddress ? [contractAddress] : baseContracts

  const isETH = tokenAddress === ETH
  return compressJson({
    chainId: sourceChainId,
    to: { $or: contracts.map((c) => c.toLowerCase()) },
    value: isETH ? amount : undefined,
    input: {
      $or: [
        { $abi: BASE_ETH_ABI, _target: recipient },
        {
          $abi: BASE_ERC20_ABI,
          mintRecipient: recipient,
          amount,
          burnToken: tokenAddress,
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  chainId: number,
): Promise<Address[]> => {
  return CHAIN_TO_TOKENS[chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BASE, Chains.ETHEREUM]
}
