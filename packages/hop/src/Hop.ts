
import { mainnet as addresses } from '@hop-protocol/core/addresses'
import { mainnet } from '@hop-protocol/core/networks'
import { utils } from '@hop-protocol/sdk'
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type  Bridges, type Bridge, type L2BridgeProps, type L1BridgeProps } from './types.js'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
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
  const bridges = addresses.bridges as Bridges
  const chainSlug = utils.chainIdToSlug("mainnet", sourceChainId);
  if(sourceChainId === 1) {
    const bridgeData = Object.entries(bridges).filter(([, bridge]: [string, Bridge] ) => { return (bridge[chainSlug] as L1BridgeProps).l1CanonicalToken === tokenAddress })
    const bridgeProps = (bridgeData[0][1][chainSlug] as L1BridgeProps)
    const contractTarget = bridgeProps.l1Bridge
    // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to:  contractTarget,   // The contract address of the bridge
      input: {},  // The input object is where we'll put the ABI and the parameters
    })
  } else {
    const bridgeData = Object.entries(bridges).filter(([, bridge]: [string, Bridge] ) => { return (bridge[chainSlug] as L2BridgeProps).l2CanonicalToken === tokenAddress })[0]
    const bridgeProps = (bridgeData[1][chainSlug] as L2BridgeProps)
    // If there is an AMM wrapper we want to target that, otherwise we target the L2 bridge
    const contractTarget = bridgeProps.l2AmmWrapper === ZERO_ADDRESS ? bridgeProps.l2Bridge : bridgeProps.l2AmmWrapper
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to:  contractTarget,   // The contract address of the bridge
      input: {},  // The input object is where we'll put the ABI and the parameters
    })
  }
}
// https://github.com/hop-protocol/hop/blob/develop/packages/core/src/metadata/tokens.ts
export const getSupportedTokenAddresses = (_chainId: number) => {
  const chainSlug = utils.chainIdToSlug("mainnet", _chainId);

  // For each entry in bridge take the token address [ l1CanonicalToken or l2CanonicalToken ]
  if(addresses && addresses.bridges) {
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
