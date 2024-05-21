import {
  BRIDGE_ERC20_FRAGMENT,
  BRIDGE_ERC20_TO_FRAGMENT,
  BRIDGE_ETH_FRAGMENT,
  BRIDGE_ETH_TO_FRAGMENT,
  CHAIN_TO_TOKENS,
  DEPOSIT_ERC20_FRAGMENT,
  DEPOSIT_ERC20_TO_FRAGMENT,
  DEPOSIT_ETH_FRAGMENT,
  DEPOSIT_ETH_TO_FRAGMENT,
  WITHDRAW_FRAGMENT,
  WITHDRAW_TO_FRAGMENT,
  l2ToMainBridgeContract,
  mainToL2BridgeContract,
} from './constants'
import {
  type BridgeActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address, zeroAddress } from 'viem'

function getInputsFromEthereum(params: BridgeActionParams) {
  const { tokenAddress, amount, recipient } = params
  const ercInputs = [
    {
      $abi: [BRIDGE_ERC20_FRAGMENT],
      _localToken: tokenAddress,
      _amount: amount,
    },
    {
      $abi: [BRIDGE_ERC20_TO_FRAGMENT],
      _localToken: tokenAddress,
      _to: recipient,
      _amount: amount,
    },
    {
      $abi: [DEPOSIT_ERC20_FRAGMENT],
      _l1Token: tokenAddress,
      _amount: amount,
    },
    {
      $abi: [DEPOSIT_ERC20_TO_FRAGMENT],
      _l1Token: tokenAddress,
      _amount: amount,
      _to: recipient,
    },
  ]
  const ethInputs = [
    {
      $abi: [BRIDGE_ETH_FRAGMENT, DEPOSIT_ETH_FRAGMENT],
    },
    {
      $abi: [BRIDGE_ETH_TO_FRAGMENT, DEPOSIT_ETH_TO_FRAGMENT],
      _to: recipient,
    },
  ]

  if (!tokenAddress) {
    return [...ercInputs, ...ethInputs]
  }
  if (tokenAddress === zeroAddress) {
    return ethInputs
  }
  return ercInputs
}

function getInputsToEthereum(params: BridgeActionParams) {
  const { tokenAddress, amount, recipient } = params

  const l2Token =
    tokenAddress === zeroAddress
      ? '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'
      : tokenAddress

  const ercInputs = [
    {
      $abi: [WITHDRAW_FRAGMENT],
      _l2Token: l2Token,
      _amount: amount,
    },
    {
      $abi: [WITHDRAW_TO_FRAGMENT],
      _l2Token: l2Token,
      _amount: amount,
      _to: recipient,
    },
    {
      $abi: [BRIDGE_ERC20_FRAGMENT],
      _localToken: tokenAddress,
      _amount: amount,
    },
    {
      $abi: [BRIDGE_ERC20_TO_FRAGMENT],
      _localToken: tokenAddress,
      _amount: amount,
      _to: recipient,
    },
  ]
  const ethInputs = [
    {
      $abi: [WITHDRAW_FRAGMENT],
      _l2Token: l2Token,
      _amount: amount,
    },
    {
      $abi: [WITHDRAW_TO_FRAGMENT],
      _l2Token: l2Token,
      _amount: amount,
      _to: recipient,
    },
    {
      $abi: [BRIDGE_ETH_FRAGMENT],
    },
    {
      $abi: [BRIDGE_ETH_TO_FRAGMENT],
      _to: recipient,
    },
  ]

  if (!tokenAddress) {
    return [...ercInputs, ...ethInputs]
  }
  if (tokenAddress === zeroAddress) {
    return ethInputs
  }
  return ercInputs
}

export const bridge = async (
  bridge: BridgeActionParams,
): Promise<TransactionFilter> => {
  const { sourceChainId, destinationChainId, tokenAddress, amount } = bridge

  if (
    sourceChainId !== Chains.ETHEREUM &&
    destinationChainId !== Chains.ETHEREUM
  ) {
    throw new Error('Ethereum must be either the source or destination chain')
  }

  const isETH = tokenAddress === zeroAddress

  if (sourceChainId === Chains.ETHEREUM) {
    if (!mainToL2BridgeContract[destinationChainId]) {
      throw new Error('Unsupported chainId')
    }

    const inputs = getInputsFromEthereum(bridge)

    return compressJson({
      chainId: sourceChainId,
      value: isETH ? amount : undefined,
      to: mainToL2BridgeContract[destinationChainId],
      input: {
        $or: inputs,
      },
    })
  }

  if (!l2ToMainBridgeContract[sourceChainId]) {
    throw new Error('Unsupported chainId')
  }

  const inputs = getInputsToEthereum(bridge)

  return compressJson({
    chainId: sourceChainId,
    value: isETH ? amount : undefined,
    to: l2ToMainBridgeContract[sourceChainId],
    input: {
      $or: inputs,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BASE, Chains.ETHEREUM]
}
