
import { type TransactionFilter, type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { SynapseContract, SynapseCCTPContract } from './contract-addresses'
import { SYNAPSE_BRIDGE_FRAGMENTS } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { Token } from './Token'
import * as tokens from './tokens'

const allTokens: Token[] = Object.values(tokens)

const cctpMapping: { [key: number]: string } = {
  [1]: "0xfb2bfc368a7edfd51aa2cbec513ad50edea74e84",
  [10]:"0x5e69c336661dde70404e3345BA61F9c01DdB4C36",
  [8453]: "0xfB2Bfc368a7edfD51aa2cbEC513ad50edEa74E84",
  [42161]: "0xfb2bfc368a7edfd51aa2cbec513ad50edea74e84",
  [43114]:"0xfB2Bfc368a7edfD51aa2cbEC513ad50edEa74E84",
}

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

  const destinationDomain = chainDomainToID(destinationChainId)

  if (contractAddress && Object.values(cctpMapping).includes(contractAddress)) {
    return compressJson({
      chainId: sourceChainId,
      to: SynapseCCTPContract[sourceChainId],
      input: {
        $abi: SYNAPSE_BRIDGE_FRAGMENTS,
        sender: recipient,
        amount: amount,
        // The following may need to be edited:
        chainId: destinationChainId,
        token: tokenAddress,
      },
    })
  }
  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: sourceChainId, // The chainId of the source chain
    to: SynapseContract[sourceChainId], // The contract address of the bridge
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

export const chainDomainToID = (id: number): number => {
  switch(id) {
    case 0:
      return 1;
    case 1:
      return 43114;
    case 2:
      return 10;
    case 3:
      return 42161;
    case 6:
        return 8453
    default:
      throw new Error('Invalid ID');
  }
}
