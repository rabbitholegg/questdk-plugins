import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address, zeroAddress as ETH_TOKEN_ADDRESS } from 'viem'
import { CHAIN_ID_ARRAY, ETH_CHAIN_ID, ARB_NOVA_CHAIN_ID } from './chain-ids'
import {
  UNIVERSAL_ARBSYS_PRECOMPILE,
  ARB_ONE_DELAYED_INBOX,
  ARB_NOVA_DELAYED_INBOX,
  ARB_NOVA_TO_MAINNET_GATEWAY,
  ARB_ONE_TO_MAINNET_GATEWAY,
  MAINNET_TO_ARB_NOVA_GATEWAY,
  MAINNET_TO_ARB_ONE_GATEWAY,
} from './contract-addresses'
import { ArbitrumTokens } from './supported-token-addresses'
import { findL1TokenForL2Token, getContractAddressFromChainId } from './utils'
import {
  ARBSYS_WITHDRAW_ETH_FRAG,
  INBOX_DEPOSIT_ETH_FRAG,
  OUTBOUND_TRANSFER_L2_TO_L1,
  OUTBOUND_TRANSFER_L1_TO_L2,
} from './abi'

export const bridge = async (bridge: BridgeActionParams) => {
  // This is the information we'll use to compose the Transaction object
  const {
    sourceChainId,
    destinationChainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  if (!tokenAddress) {
    // If token address is undefined, determining the exact bridge contract is not possible
    const contracts =
      sourceChainId === ETH_CHAIN_ID
        ? [
            MAINNET_TO_ARB_NOVA_GATEWAY,
            MAINNET_TO_ARB_ONE_GATEWAY,
            ARB_ONE_DELAYED_INBOX,
            ARB_NOVA_DELAYED_INBOX,
          ]
        : [
            ARB_ONE_TO_MAINNET_GATEWAY,
            ARB_NOVA_TO_MAINNET_GATEWAY,
            UNIVERSAL_ARBSYS_PRECOMPILE,
          ]

    const abiFrags =
      sourceChainId === ETH_CHAIN_ID
        ? [...OUTBOUND_TRANSFER_L1_TO_L2, ...INBOX_DEPOSIT_ETH_FRAG]
        : [...OUTBOUND_TRANSFER_L2_TO_L1, ...ARBSYS_WITHDRAW_ETH_FRAG]

    return compressJson({
      chainId: sourceChainId,
      from: recipient,
      to: {
        $or: contracts,
      },
      input: {
        $abi: abiFrags,
      },
    })
  }

  const isBridgingToken = tokenAddress !== ETH_TOKEN_ADDRESS

  if (isBridgingToken) {
    const bridgeContract =
      contractAddress ||
      getContractAddressFromChainId(sourceChainId, destinationChainId)

    if (sourceChainId !== ETH_CHAIN_ID) {
      return compressJson({
        // L2 to L1 Token Transfer
        chainId: sourceChainId,
        to: bridgeContract
          ? bridgeContract
          : {
              $or: [ARB_ONE_TO_MAINNET_GATEWAY, ARB_NOVA_TO_MAINNET_GATEWAY],
            },
        input: {
          $abi: OUTBOUND_TRANSFER_L2_TO_L1,
          _to: recipient,
          _amount: amount,
          _l1Token: findL1TokenForL2Token(tokenAddress),
        },
      })
    }

    // L1 to L2 Token Transfer
    return compressJson({
      chainId: sourceChainId,
      to: bridgeContract
        ? bridgeContract
        : {
            $or: [MAINNET_TO_ARB_NOVA_GATEWAY, MAINNET_TO_ARB_ONE_GATEWAY],
          },
      input: {
        $abi: OUTBOUND_TRANSFER_L1_TO_L2,
        _to: recipient,
        _amount: amount,
        _token: tokenAddress,
      },
    })
  }

  if (sourceChainId === ETH_CHAIN_ID) {
    let networkInbox: Address | undefined
    if (destinationChainId) {
      networkInbox =
        destinationChainId === ARB_NOVA_CHAIN_ID
          ? ARB_NOVA_DELAYED_INBOX
          : ARB_ONE_DELAYED_INBOX
    }

    // L1 to L2 ETH Transfer
    return compressJson({
      chainId: sourceChainId,
      to: contractAddress || networkInbox,
      from: recipient,
      value: amount,
      input: {
        $abi: INBOX_DEPOSIT_ETH_FRAG,
      },
    })
  }
  // L2 to L1 ETH Transfer
  return compressJson({
    chainId: sourceChainId,
    value: amount,
    to: contractAddress || UNIVERSAL_ARBSYS_PRECOMPILE,
    input: {
      $abi: ARBSYS_WITHDRAW_ETH_FRAG,
      destination: recipient,
    },
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return ArbitrumTokens[_chainId] as Address[]
}

export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY as number[]
}
