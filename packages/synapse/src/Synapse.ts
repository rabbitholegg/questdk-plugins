
import { type TransactionFilter, type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { SYNAPSE_CCTP_ROUTER, CHAIN_TO_ROUTER } from './contract-addresses'
import { SYNAPSE_BRIDGE_FRAGMENTS } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { Token } from './Token'
import * as tokens from './tokens'

const allTokens: Token[] = Object.values(tokens)

export const bridge = async (bridge: BridgeActionParams): Promise<TransactionFilter> => {
  // This is the information we'll use to compose the Transaction object
  const {
    sourceChainId,
    destinationChainId,
    contractAddress = null,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  // This if statement checks if the transaction is a CCTP transaction. 
  if (contractAddress == '0xd359bc471554504f683fbd4f6e36848612349ddf') {
    return compressJson({
      chainId: sourceChainId,
      to: SYNAPSE_CCTP_ROUTER[sourceChainId],
      input: {
        $abi: SYNAPSE_BRIDGE_FRAGMENTS,
        sender: recipient,
        amount: amount,
        chainId: destinationChainId,
        token: tokenAddress,
      },
    })
  }
  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter (for non cctp)
  return compressJson({
    chainId: sourceChainId, // The chainId of the source chain
    to: CHAIN_TO_ROUTER[sourceChainId],
    input: {
      $abi: SYNAPSE_BRIDGE_FRAGMENTS, // The ABI of the bridge contract
      to: recipient, // The recipient of tokens
      amount: amount,  // The amount of tokens to send
      chainId: destinationChainId, // The chainId of the destination chian
      token: tokenAddress, // The address of the token to be recieved
    },
  })
}

export const getSupportedTokenAddresses = async (chainId: number): Promise<Address[]> => {
  const supportedTokens = allTokens.filter(token => token.addresses.hasOwnProperty(chainId));
  return supportedTokens.map(token => token.addresses[chainId]) as Address[];
}


export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}

