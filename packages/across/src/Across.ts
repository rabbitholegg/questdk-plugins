
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { CHAIN_ID_ARRAY } from './chain-ids.js'
import {ACROSS_BRIDGE_ABI} from './abi.js'\
import { CHAIN_TO_CONTRACT } from './chain-to-contract.js'
// If you're implementing swap or mint, simply duplicate this function and change the name
export const bridge = async (bridge: BridgeActionParams): Promise<TransactionFilter> => {
  // This is the information we'll use to compose the Transaction object
  const {
    sourceChainId,
    destinationChainId,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: sourceChainId, // The chainId of the source chain
    to:  CHAIN_TO_CONTRACT[sourceChainId],   // The contract address of the bridge
    input: {
      $abi: ACROSS_BRIDGE_ABI, // The ABI of the bridge contract
      recipient: recipient, // The recipient of the funds
      destinationChainId: destinationChainId, // The chainId of the destination chain
      amount: amount, // The amount of tokens to send
      originToken: tokenAddress, // The token address of the token to send
    },  // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
}


export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY
}