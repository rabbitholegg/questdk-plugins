import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import {
  l1StandardBridgeABI,
  l2StandardBridgeABI,
  addresses,
} from '@eth-optimism/contracts-ts'
import { ETH_CHAIN_ID, CHAIN_ID_ARRAY } from './chain-ids.js'
import { ETH_TOKEN_ADDRESS, CHAIN_ID_TO_TOKENS } from './token-addresses.js'
export const bridge = async (bridge: BridgeActionParams) => {
  // This is the information we'll use to compose the Transaction object
  const { sourceChainId, contractAddress, tokenAddress, amount } = bridge
  const isL1 = sourceChainId === ETH_CHAIN_ID
  if (isL1) {
    // If we're on the L1 and the token is ETH, we need to use a different input
    if (tokenAddress === ETH_TOKEN_ADDRESS) {
      return compressJson({
        chainId: sourceChainId, // The chainId of the source chain
        to: contractAddress || addresses.L1StandardBridge[1], // The contract address of the bridge
        value: amount,
        input: {
          $abi: l1StandardBridgeABI,
        }, // The input object is where we'll put the ABI and the parameters
      })
    }
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to: contractAddress || addresses.L1StandardBridge[1], // The contract address of the bridge
      input: {
        $abi: l1StandardBridgeABI,
        _l1Token: tokenAddress,
        _amount: amount,
      }, // The input object is where we'll put the ABI and the parameters
    })
  }
  return compressJson({
    chainId: sourceChainId, // The chainId of the source chain
    to: contractAddress || addresses.L2StandardBridge[420], // The contract address of the bridge
    input: {
      $abi: l2StandardBridgeABI,
      _l2Token: tokenAddress,
      _amount: amount,
    }, // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return CHAIN_ID_TO_TOKENS[_chainId] as `0x${string}`[]
}

export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY as number[]
}
