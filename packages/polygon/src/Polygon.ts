
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import {POLYGON_BRIDGE_ABI_FUNCS} from './abi.js'
import {POLYGON_CHAIN_ID, CHAIN_ID_ARRAY} from './chain-ids.js'
import { PolygonTokens, ETHER_ADDRESS} from './supported-token-addresses.js'
import { MAINNET_BRIDGE } from './contract-addresses.js'
// If you're implementing swap or mint, simply duplicate this function and change the name
export const bridge = async (bridge: BridgeActionParams): Promise<TransactionFilter> => {
  // This is the information we'll use to compose the Transaction object
  const {
    sourceChainId,
    destinationChainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  if(sourceChainId === POLYGON_CHAIN_ID) {
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to:  contractAddress || tokenAddress,   // on Polgon the contract that handles withdrawals is the token contract
      input: {
        $abi: POLYGON_BRIDGE_ABI_FUNCS,
        amount: amount,
      },  
    })
  }
  if(tokenAddress === ETHER_ADDRESS){
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to:  contractAddress || MAINNET_BRIDGE,   // on Polgon the contract that handles withdrawals is the token contract
      value: amount,
      input: {
        $abi: POLYGON_BRIDGE_ABI_FUNCS,
        user: recipient,
      },  
    })
  }
  // The deposit function takes a bytes chunk as the last argument, and the amount is encoded in that value
  return compressJson({
    chainId: sourceChainId, // The chainId of the source chain
    to:  contractAddress || MAINNET_BRIDGE,   // on Polgon the contract that handles withdrawals is the token contract
    input: {
      $abi: POLYGON_BRIDGE_ABI_FUNCS,
      user: recipient,
      rootToken: tokenAddress,
    },  
  })

}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return PolygonTokens[_chainId];
}


export const getSupportedChainIds = async () => {
  // This function should return a list of supported chainIds
  return CHAIN_ID_ARRAY
}
