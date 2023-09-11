import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import {
  CHAIN_ID_ARRAY,
  ETH_CHAIN_ID,
  ARB_ONE_CHAIN_ID,
  ARB_NOVA_CHAIN_ID,
} from './chain-ids.js'
import {
  MAINNET_TO_ARB_NOVA_GATEWAY,
  MAINNET_TO_ARB_ONE_GATEWAY,
  ARB_NOVA_TO_MAINNET_GATEWAY,
  ARB_ONE_TO_MAINNET_GATEWAY,
  UNIVERSAL_ARBSYS_PRECOMPILE,
  ARB_ONE_DELAYED_INBOX,
  ARB_NOVA_DELAYED_INBOX,
} from './contract-addresses.js'
import { ArbitrumTokens } from './supported-token-addresses.js'
import {
  GATEWAY_OUTBOUND_TRANSFER_FRAG,
  ARBSYS_WITHDRAW_ETH_FRAG,
  INBOX_DEPOSIT_ETH_FRAG,
} from './abi.js'
// If you're implementing swap or mint, simply duplicate this function and change the name
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
    const networkGateway = getContractAddressFromChainId(
      sourceChainId,
      destinationChainId,
    )
    // We're targeting a gateway contract
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to:  contractAddress || networkGateway,   // The contract address of the bridge
      input: {
        $abi: GATEWAY_OUTBOUND_TRANSFER_FRAG,
        _token: tokenAddress,
        _to: recipient,
        _amount: amount,
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
      to:  contractAddress || networkInbox,   // The contract address of the bridge
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
    to:  contractAddress || UNIVERSAL_ARBSYS_PRECOMPILE,   // The contract address of the bridge
    input: {
      $abi: ARBSYS_WITHDRAW_ETH_FRAG,
      destination: recipient,
    },
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return ArbitrumTokens[_chainId]
}

export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}

const getContractAddressFromChainId = (
  sourceChainId: number,
  destinationChainId: number,
): Address => {
  // This is klunky but the alternative is some sort of convoluted 2D mapping
  if (sourceChainId === ARB_NOVA_CHAIN_ID) return ARB_NOVA_TO_MAINNET_GATEWAY
  if (sourceChainId === ARB_ONE_CHAIN_ID) return ARB_ONE_TO_MAINNET_GATEWAY
  if (sourceChainId === ETH_CHAIN_ID) {
    if (destinationChainId === ARB_NOVA_CHAIN_ID)
      return MAINNET_TO_ARB_NOVA_GATEWAY
    if (destinationChainId === ARB_ONE_CHAIN_ID)
      return MAINNET_TO_ARB_ONE_GATEWAY
  }
  return '0x0'
}
