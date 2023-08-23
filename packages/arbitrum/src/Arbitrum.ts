
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { CHAIN_ID_ARRAY} from './chain-ids'
import { ArbitrumTokens } from './supported-token-addresses'
import { type Address } from 'viem'

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

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: 0, // The chainId of the source chain
    to:  0x0,   // The contract address of the bridge
    input: {},  // The input object is where we'll put the ABI and the parameters
  })
}


export const getSupportedTokenAddresses = async (_chainId: number) => {
  return ArbitrumTokens[_chainId];
}


export const getSupportedChainIds = async () => {
  return CHAIN_ID_ARRAY;
}

