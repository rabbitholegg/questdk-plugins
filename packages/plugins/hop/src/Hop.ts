import { mainnet as addresses } from '@hop-protocol/core/addresses'
import { mainnet } from '@hop-protocol/core/networks'
import { utils } from '@hop-protocol/sdk'
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import {
  type Bridges,
  type Bridge,
  type L2BridgeProps,
  type L1BridgeProps,
} from './types.js'
import {
  l1BridgeAbi,
  l2AmmWrapperAbi,
  l2BridgeAbi,
} from '@hop-protocol/core/abi'
import { type Address } from 'viem'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const bridge = (bridge: BridgeActionParams) => {
  // This is the information we'll use to compose the Transaction object
  const { sourceChainId, destinationChainId, tokenAddress, amount, recipient } =
    bridge
  const bridges = addresses.bridges as Bridges
  const chainSlug = utils.chainIdToSlug('mainnet', sourceChainId)
  if (sourceChainId === 1) {
    const bridgeData: [string, Bridge] = Object.entries(bridges).filter(
      ([, bridge]: [string, Bridge]) => {
        if (bridge[chainSlug])
          return (
            (bridge[chainSlug] as L1BridgeProps).l1CanonicalToken ===
            tokenAddress
          )
        else return false
      },
    )[0]
    const bridgeProps = bridgeData[1][chainSlug] as L1BridgeProps
    const contractTarget = bridgeProps.l1Bridge
    // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to: contractTarget, // The contract address of the bridge
      input: {
        $abi: l1BridgeAbi, // The ABI of the bridge contract
        chainId: destinationChainId, // The chainId of the destination chain
        recipient: recipient, // The recipient of the bridged tokens
        amount: amount, // The amount of tokens to bridge
      }, // The input object is where we'll put the ABI and the parameters
    })
  } else {
    const bridgeData: [string, Bridge] = Object.entries(bridges).filter(
      ([, bridge]: [string, Bridge]) => {
        if (bridge[chainSlug])
          return (
            (bridge[chainSlug] as L2BridgeProps).l2CanonicalToken ===
            tokenAddress
          )
        else return false
      },
    )[0]
    const bridgeProps = bridgeData[1][chainSlug] as L2BridgeProps
    // Currently only HOP lacks an AMM wrapper
    const hasAMM = bridgeProps.l2AmmWrapper !== ZERO_ADDRESS
    // If there is an AMM wrapper we want to target that, otherwise we target the L2 bridge
    const contractTarget = hasAMM
      ? bridgeProps.l2AmmWrapper
      : bridgeProps.l2Bridge
    const abi = hasAMM ? l2AmmWrapperAbi : l2BridgeAbi
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to: contractTarget, // The contract address of the bridge
      input: {
        $abi: abi, // The ABI of the bridge contract, if hop is the target token this is the bridge, otherwise it should be the AMM
        chainId: destinationChainId, // The chainId of the destination chain
        recipient: recipient, // The recipient of the bridged tokens
        amount: amount, // The amount of tokens to bridge
      }, // The input object is where we'll put the ABI and the parameters
    })
  }
}
// https://github.com/hop-protocol/hop/blob/develop/packages/core/src/metadata/tokens.ts
export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  const chainSlug = utils.chainIdToSlug('mainnet', _chainId)

  // For each entry in bridge take the token address [ l1CanonicalToken or l2CanonicalToken ]
  if (addresses?.bridges) {
    return Object.entries(addresses.bridges! as Bridges).map(
      ([, bridge]: [string, Bridge]) => {
        // Find the bridge element whose key matches the chainSlug and return the token address
        if (bridge && (bridge as any)[chainSlug])
          return _chainId === 1
            ? (bridge[chainSlug] as L1BridgeProps).l1CanonicalToken
            : (bridge[chainSlug] as L2BridgeProps).l2CanonicalToken
        return '0x0'
      },
    ) as Address[]
  }
  return [] as Address[]
}

// https://github.com/hop-protocol/hop/blob/develop/packages/core/src/networks/mainnet.ts
export const getSupportedChainIds = async () => {
  return Object.entries(mainnet).map(([, chain]) => {
    return chain.networkId
  })
}
