
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address, toHex } from 'viem'
import { CHAIN_ID_ARRAY, ETH_CHAIN_ID, ARB_ONE_CHAIN_ID, ARB_NOVA_CHAIN_ID } from './chain-ids'
import { MAINNET_TO_ARB_NOVA_GATEWAY, MAINNET_TO_ARB_ONE_GATEWAY, ARB_NOVA_TO_MAINNET_GATEWAY, ARB_ONE_TO_MAINNET_GATEWAY } from './contract-addresses'
import { ArbitrumTokens } from './supported-token-addresses'
// If you're implementing swap or mint, simply duplicate this function and change the name
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

  const defaultContractAddress = getContractAddressFromChainId(sourceChainId, destinationChainId);

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: toHex(sourceChainId), // The chainId of the source chain
    to:  contractAddress || defaultContractAddress,   // The contract address of the bridge
    input: {},  // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return ArbitrumTokens[_chainId];
}


export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY;
}

const getContractAddressFromChainId = (sourceChainId: number, destinationChainId): Address => {
  // This is klunky but the alternative is some sort of convoluted 2D mapping
  if(sourceChainId === ARB_NOVA_CHAIN_ID )
    return ARB_NOVA_TO_MAINNET_GATEWAY;
  if(sourceChainId === ARB_ONE_CHAIN_ID )
    return ARB_ONE_TO_MAINNET_GATEWAY;
  if(sourceChainId === ETH_CHAIN_ID ) {
    if(destinationChainId === ARB_NOVA_CHAIN_ID )
      return MAINNET_TO_ARB_NOVA_GATEWAY;
    if(destinationChainId === ARB_ONE_CHAIN_ID )
      return MAINNET_TO_ARB_ONE_GATEWAY;
  }

}
