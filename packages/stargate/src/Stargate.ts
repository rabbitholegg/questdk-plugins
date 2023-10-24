import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { STARGATE_BRIDGE_ABI } from './abi.js'
import {
  ARBITRUM_CHAIN_ID,
  NATIVE_CHAIN_ID_ARRAY,
  ETH_CHAIN_ID,
  LAYER_ONE_TO_LAYER_ZERO_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  BASE_CHAIN_ID,
} from './chain-ids.js'
import {
  NATIVE_CHAIN_AND_POOL_TO_TOKEN_ADDRESS,
  NATIVE_TOKEN_ADDRESS,
  CHAIN_ID_TO_ETH_ROUTER_ADDRESS,
  CHAIN_ID_TO_ROUTER_ADDRESS,
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

  const layerZeroDestination =
    LAYER_ONE_TO_LAYER_ZERO_CHAIN_ID[destinationChainId]

  // throw error if destinationChainId is specified, but doesnt map to layerZeroDestination
  if (typeof layerZeroDestination === 'undefined') {
    throw new Error(`Invalid destinationChainId: ${destinationChainId}`)
  }

  if (typeof tokenAddress === 'undefined') {
    throw new Error(
      'tokenAddress is undefined. Please provide a valid token address.',
    )
  }

  const sourcePool =
    tokenAddress === NATIVE_TOKEN_ADDRESS
      ? 13
      : NATIVE_CHAIN_AND_POOL_TO_TOKEN_ADDRESS[sourceChainId][
          tokenAddress.toLowerCase()
        ]

  if (typeof sourcePool === 'undefined') {
    throw new Error(`No pool found for provided tokenAddress: ${tokenAddress}`)
  }

  if (sourcePool === 13) {
    const targetContractAddress =
      CHAIN_ID_TO_ETH_ROUTER_ADDRESS[
        LAYER_ONE_TO_LAYER_ZERO_CHAIN_ID[sourceChainId]
      ]

    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to: contractAddress || targetContractAddress, // The contract address of the bridge
      input: {
        $abi: STARGATE_BRIDGE_ABI, // The ABI of the bridge contract
        _amountLD: amount, // The amount of tokens to send
        _toAddress: recipient, // The recipient of the tokens
        _dstChainId: layerZeroDestination, // The chainId of the destination chain
      }, // The input object is where we'll put the ABI and the parameters
    })
  }

  const targetContractAddress =
    CHAIN_ID_TO_ROUTER_ADDRESS[LAYER_ONE_TO_LAYER_ZERO_CHAIN_ID[sourceChainId]]

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: sourceChainId, // The chainId of the source chain
    to: contractAddress || targetContractAddress, // The contract address of the bridge
    input: {
      $abi: STARGATE_BRIDGE_ABI, // The ABI of the bridge contract
      _srcPoolId: sourcePool, // The source poolId
      _amountLD: amount, // The amount of tokens to send
      _to: recipient, // The recipient of the tokens
      _dstChainId: layerZeroDestination, // The chainId of the destination chain
    }, // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  if (_chainId === ARBITRUM_CHAIN_ID)
    return [
      '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      '0x0000000000000000000000000000000000000000',
    ] // [USDC, ETH]
  if (_chainId === ETH_CHAIN_ID)
    return [
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      '0x0000000000000000000000000000000000000000',
    ] // [USDC, ETH]
  if (_chainId === OPTIMISM_CHAIN_ID)
    return [
      '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      '0x0000000000000000000000000000000000000000',
    ] // [USDC, ETH]
  if (_chainId === BASE_CHAIN_ID)
    return [
      '0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca',
      '0x0000000000000000000000000000000000000000',
    ] // [USDbC, ETH]
  return []
}

export const getSupportedChainIds = async () => {
  return NATIVE_CHAIN_ID_ARRAY as number[]
}
