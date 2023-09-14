import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { POLYGON_BRIDGE_ABI_FUNCS } from './abi.js'
import { POLYGON_CHAIN_ID, CHAIN_ID_ARRAY } from './chain-ids.js'
import {
  PolygonTokens,
  ETH_ADDRESS_MAINNET,
} from './supported-token-addresses.js'
import { MAINNET_BRIDGE } from './contract-addresses.js'
export const bridge = async (bridge: BridgeActionParams) => {
  // This is the information we'll use to compose the Transaction object
  const { sourceChainId, contractAddress, tokenAddress, amount, recipient } =
    bridge

  // L2 Transactions are the same for ETH and ERC20
  if (sourceChainId === POLYGON_CHAIN_ID) {
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to: contractAddress || tokenAddress, // on Polgon the contract that handles withdrawals is the token contract
      input: {
        $abi: POLYGON_BRIDGE_ABI_FUNCS,
        amount: amount,
      },
    })
  }
  // Handle L1 ETH tx
  if (tokenAddress === ETH_ADDRESS_MAINNET) {
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to: contractAddress || MAINNET_BRIDGE, // on Polgon the contract that handles withdrawals is the token contract
      value: amount,
      input: {
        $abi: POLYGON_BRIDGE_ABI_FUNCS,
        user: recipient,
      },
    })
  }
  // Handle L1 ERC20 tx
  // The deposit function takes a bytes chunk as the last argument, and the amount is encoded in that value
  return compressJson({
    chainId: sourceChainId, // The chainId of the source chain
    to: contractAddress || MAINNET_BRIDGE, // on Polgon the contract that handles withdrawals is the token contract
    input: {
      $abi: POLYGON_BRIDGE_ABI_FUNCS,
      user: recipient,
      rootToken: tokenAddress,
      depositData: amount,
    },
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  return PolygonTokens[_chainId] as `0x${string}`[]
}

export const getSupportedChainIds = async () => {
  // This function should return a list of supported chainIds
  return CHAIN_ID_ARRAY as number[]
}
