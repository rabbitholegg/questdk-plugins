import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { CHAIN_ID_ARRAY, ETH_CHAIN_ID, ARB_NOVA_CHAIN_ID } from './chain-ids'
import {
  UNIVERSAL_ARBSYS_PRECOMPILE,
  ARB_ONE_DELAYED_INBOX,
  ARB_NOVA_DELAYED_INBOX,
} from './contract-addresses'
import { ArbitrumTokens } from './supported-token-addresses'
import { findL1TokenForL2Token, getContractAddressFromChainId } from './utils'
import {
  ARBSYS_WITHDRAW_ETH_FRAG,
  INBOX_DEPOSIT_ETH_FRAG,
  OUTBOUND_TRANSFER_L2_TO_L1,
  OUTBOUND_TRANSFER_L1_TO_L2,
} from './abi'
const ETH_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'

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

  const isBridgingToken = tokenAddress !== ETH_TOKEN_ADDRESS

  if (isBridgingToken) {
    const bridgeContract =
      contractAddress ||
      getContractAddressFromChainId(sourceChainId, destinationChainId)

    if (sourceChainId !== ETH_CHAIN_ID) {
      return compressJson({
        chainId: sourceChainId, // The chainId of the source chain
        to: bridgeContract ? bridgeContract : undefined,
        input: {
          $abi: OUTBOUND_TRANSFER_L2_TO_L1,
          _to: recipient,
          _amount: amount,
          _l1Token: findL1TokenForL2Token(tokenAddress),
        },
      })
    }

    // We're targeting a gateway contract
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to: bridgeContract, // The contract address of the bridge
      input: {
        $abi: OUTBOUND_TRANSFER_L1_TO_L2,
        _to: recipient,
        _amount: amount,
        _token: tokenAddress,
      },
    })
  }

  if (sourceChainId === ETH_CHAIN_ID) {
    const networkInbox =
      destinationChainId === ARB_NOVA_CHAIN_ID
        ? ARB_NOVA_DELAYED_INBOX
        : ARB_ONE_DELAYED_INBOX
    // We're targeting the Delayed Inbox
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to: contractAddress || networkInbox, // The contract address of the bridge
      from: recipient,
      value: amount,
      input: {
        $abi: INBOX_DEPOSIT_ETH_FRAG,
      },
    })
  }
  // Otherwise we're targeting the chain specific precompile
  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: sourceChainId, // The chainId of the source chain
    value: amount,
    to: contractAddress || UNIVERSAL_ARBSYS_PRECOMPILE, // The contract address of the bridge
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
