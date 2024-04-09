import {
  BASE_ERC20_ABI,
  BASE_ERC20_BRIDGE_ADDRESS,
  BASE_ETH_ABI,
  BASE_ETH_BRIDGE_ADDRESS,
  ETH,
  ETHEREUM_ERC20_ABI,
  ETHEREUM_ERC20_BRIDGE_ADDRESS,
  ETHEREUM_ETH_ABI,
  ETHEREUM_ETH_BRIDGE_ADDRESS,
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
  const {
    amount,
    recipient,
    destinationChainId,
    sourceChainId,
    contractAddress,
    tokenAddress,
  } = params

  if (destinationChainId !== Chains.BASE || sourceChainId !== Chains.ETHEREUM) {
    return failingFilter()
  }

  if (
    contractAddress !== undefined &&
    !ethereumContracts.includes(contractAddress)
  ) {
    return failingFilter()
  }

  if (tokenAddress === ETH) {
    if (
      contractAddress !== undefined &&
      contractAddress !== ETHEREUM_ETH_BRIDGE_ADDRESS
    ) {
      return failingFilter()
    }

    return compressJson({
      chainId: Chains.ETHEREUM,
      to: ETHEREUM_ETH_BRIDGE_ADDRESS,
      input: { $abi: ETHEREUM_ETH_ABI, _to: recipient, _value: amount },
    })
  }

  if (tokenAddress !== undefined) {
    if (
      contractAddress !== undefined &&
      contractAddress !== ETHEREUM_ERC20_BRIDGE_ADDRESS
    ) {
      return failingFilter()
    }

    return compressJson({
      chainId: Chains.ETHEREUM,
      to: ETHEREUM_ERC20_BRIDGE_ADDRESS,
      input: {
        $abi: ETHEREUM_ERC20_ABI,
        mintRecipient: recipient,
        amount,
        burnToken: tokenAddress,
      },
    })
  }

  return compressJson({
    chainId: Chains.ETHEREUM,
    to: contractAddress ?? { $or: ethereumContracts },
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
  const {
    amount,
    recipient,
    destinationChainId,
    sourceChainId,
    contractAddress,
    tokenAddress,
  } = params
  if (destinationChainId !== Chains.ETHEREUM || sourceChainId !== Chains.BASE) {
    return failingFilter()
  }

  if (
    contractAddress !== undefined &&
    !baseContracts.includes(contractAddress)
  ) {
    return failingFilter()
  }

  if (tokenAddress === ETH) {
    if (
      contractAddress !== undefined &&
      contractAddress !== BASE_ETH_BRIDGE_ADDRESS
    ) {
      return failingFilter()
    }

    return compressJson({
      chainId: Chains.BASE,
      to: BASE_ETH_BRIDGE_ADDRESS,
      value: amount,
      input: {
        $abi: BASE_ETH_ABI,
        _target: recipient,
      },
    })
  }

  if (tokenAddress !== undefined) {
    if (
      contractAddress !== undefined &&
      contractAddress !== BASE_ERC20_BRIDGE_ADDRESS
    ) {
      return failingFilter()
    }

    return compressJson({
      chainId: Chains.BASE,
      to: BASE_ERC20_BRIDGE_ADDRESS,
      input: {
        $abi: BASE_ERC20_ABI,
        mintRecipient: recipient,
        amount,
        burnToken: tokenAddress,
      },
    })
  }

  return compressJson({
    $or: [
      {
        chainId: Chains.BASE,
        to: BASE_ETH_BRIDGE_ADDRESS,
        value: amount,
        input: {
          $abi: BASE_ETH_ABI,
          _target: recipient,
        },
      },
      {
        chainId: Chains.BASE,
        to: BASE_ERC20_BRIDGE_ADDRESS,
        input: {
          $abi: BASE_ERC20_ABI,
          mintRecipient: recipient,
          amount,
          burnToken: tokenAddress,
        },
      },
    ],
  })
}

const failingFilter = async (): Promise<TransactionFilter> => {
  return compressJson({
    chainId: 99999,
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
