
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address, toHex } from 'viem'
import { l1StandardBridgeABI, l2StandardBridgeABI, addresses } from '@eth-optimism/contracts-ts'
import { ETH_CHAIN_ID, CHAIN_ID_ARRAY  } from './chain-ids'
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
  const isL1 = sourceChainId === ETH_CHAIN_ID
  if(isL1) {
    // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
    return compressJson({
      chainId: toHex(sourceChainId), // The chainId of the source chain
      to:  addresses.L1StandardBridge[sourceChainId],   // The contract address of the bridge
      input: {
        $abi: l1StandardBridgeABI
      },  // The input object is where we'll put the ABI and the parameters
    })
  }
  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: toHex(sourceChainId), // The chainId of the source chain
    to:  addresses.L2StandardBridge[sourceChainId],   // The contract address of the bridge
    input: {
      $abi: l2StandardBridgeABI,
      _l2Token: tokenAddress,
      _amount: amount
    },  // The input object is where we'll put the ABI and the parameters
  })

}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
}


export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY;
}
