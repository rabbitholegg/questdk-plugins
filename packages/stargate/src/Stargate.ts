import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { STARGATE_BRIDGE_ABI } from './abi.js'
import {
  CHAIN_ID_ARRAY,
  LAYER_ZERO_TO_LAYER_ONE_CHAIN_ID,
} from './chain-ids.js'
import {
  CHAIN_AND_POOL_TO_TOKEN_ADDRESS,
  CHAIN_ID_TO_ROUTER_ADDRESS,
  CHAIN_ID_TO_ETH_ROUTER_ADDRESS,
} from './contract-addresses.js'

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
  const layerOneChainId = LAYER_ZERO_TO_LAYER_ONE_CHAIN_ID[sourceChainId]
  const sourcePool = tokenAddress
    ? CHAIN_AND_POOL_TO_TOKEN_ADDRESS[sourceChainId][tokenAddress]
    : 0

  if (sourcePool === 13) {
    const targetContractAddress = CHAIN_ID_TO_ETH_ROUTER_ADDRESS[sourceChainId]
    return compressJson({
      chainId: layerOneChainId, // The chainId of the source chain
      to: contractAddress || targetContractAddress, // The contract address of the bridge
      input: {
        $abi: STARGATE_BRIDGE_ABI, // The ABI of the bridge contract
        _amountLD: amount, // The amount of tokens to send
        _toAddress: recipient, // The recipient of the tokens
        _dstChainId: destinationChainId, // The chainId of the destination chain
      }, // The input object is where we'll put the ABI and the parameters
    })
  }
  const targetContractAddress = CHAIN_ID_TO_ROUTER_ADDRESS[sourceChainId]

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: layerOneChainId, // The chainId of the source chain
    to: contractAddress || targetContractAddress, // The contract address of the bridge
    input: {
      $abi: STARGATE_BRIDGE_ABI, // The ABI of the bridge contract
      _srcPoolId: sourcePool, // The source poolId
      _amountLD: amount, // The amount of tokens to send
      _to: recipient, // The recipient of the tokens
      _dstChainId: destinationChainId, // The chainId of the destination chain
    }, // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return []
}

export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY as number[]
}
