
import { mainnet as addresses } from '@hop-protocol/core/addresses'
import { mainnet } from '@hop-protocol/core/networks'
import { utils } from '@hop-protocol/sdk'
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type  Bridges, type Bridge, type L2BridgeProps, type L1BridgeProps } from './types.js'


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
    chainId: sourceChainId, // The chainId of the source chain
    to:  0x0,   // The contract address of the bridge
    input: {},  // The input object is where we'll put the ABI and the parameters
  })
}
// https://github.com/hop-protocol/hop/blob/develop/packages/core/src/metadata/tokens.ts
export const getSupportedTokenAddresses = (_chainId: number) => {
  const chainSlug = utils.chainIdToSlug("mainnet", _chainId);

  // For each entry in bridge take the token address [ l1CanonicalToken or l2CanonicalToken ]
  if(addresses && addresses.bridges) {
    // TODO: This is _way_ too many any types - this needs to be tightened up
    return Object.entries(addresses.bridges! as Bridges).map(([, bridge]: [string, Bridge] ) => {
      // Find the bridge element whose key matches the chainSlug and return the token address
      if(bridge && (bridge as any)[chainSlug])
      return _chainId === 1 ? (bridge[chainSlug] as L1BridgeProps).l1CanonicalToken : (bridge[chainSlug] as L2BridgeProps).l2CanonicalToken
      return '0x0'
    })
  }
  return []
}

// https://github.com/hop-protocol/hop/blob/develop/packages/core/src/networks/mainnet.ts
export const getSupportedChainIds = () => {
  return Object.entries(mainnet).map(([, chain]) => { return chain.networkId })
}
