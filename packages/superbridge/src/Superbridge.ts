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

export const bridge = async (
  bridge: BridgeActionParams,
): Promise<TransactionFilter> => {
  const { chainId, destinationChainId, tokenAddress, amount, recipient } =
    bridge

  if (
    chainId !== Chains.ETHEREUM &&
    destinationChainId !== Chains.ETHEREUM
  ) {
    throw new Error('Ethereum must be either the source or destination chain')
  }

  const isETH = tokenAddress === zeroAddress

  if (chainId === Chains.ETHEREUM) {
    if (!mainToL2BridgeContract[destinationChainId]) {
      throw new Error('Unsupported chainId')
    }

    return compressJson({
      chainId: chainId,
      value: isETH ? amount : undefined,
      to: mainToL2BridgeContract[destinationChainId],
      input: {
        $or: [
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
            $abi: [BRIDGE_ETH_FRAGMENT, DEPOSIT_ETH_FRAGMENT],
          },
          {
            $abi: [BRIDGE_ETH_TO_FRAGMENT, DEPOSIT_ETH_TO_FRAGMENT],
            _to: recipient,
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
        ],
      },
    })
  }

  if (!l2ToMainBridgeContract[chainId]) {
    throw new Error('Unsupported chainId')
  }

  const l2Token = isETH
    ? '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'
    : tokenAddress

  return compressJson({
    chainId: chainId,
    value: isETH ? amount : undefined,
    to: l2ToMainBridgeContract[chainId],
    input: {
      $or: [
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
      ],
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
