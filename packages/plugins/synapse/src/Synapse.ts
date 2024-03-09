import {
  type TransactionFilter,
  type BridgeActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { zeroAddress, type Address } from 'viem'
import { SYNAPSE_CCTP_ROUTER, CHAIN_TO_ROUTER } from './contract-addresses'
import { SYNAPSE_BRIDGE_FRAGMENTS } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { Token } from './Token'
import * as tokens from './tokens'

const allTokens: Token[] = Object.values(tokens)

export const bridge = async (
  bridge: BridgeActionParams,
): Promise<TransactionFilter> => {
  // This is the information we'll use to compose the Transaction object
  const {
    sourceChainId,
    destinationChainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  const inputObject = {
    amount: amount,
    chainId: destinationChainId,
    token:
      tokenAddress === zeroAddress
        ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        : tokenAddress,
  }

  const contractTarget = contractAddress
    ? contractAddress
    : {
        $or: [
          CHAIN_TO_ROUTER[sourceChainId].toLowerCase(),
          SYNAPSE_CCTP_ROUTER[sourceChainId].toLowerCase(),
        ],
      }

  if (recipient !== undefined) {
    return compressJson({
      chainId: sourceChainId,
      to: contractTarget,
      input: {
        $abi: SYNAPSE_BRIDGE_FRAGMENTS, // The ABI of the bridge contract
        $and: [
          inputObject,
          {
            $or: [
              {
                sender: recipient,
              },
              {
                to: recipient,
              },
            ],
          },
        ],
      },
    })
  }

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter (for non cctp)
  return compressJson({
    chainId: sourceChainId, // The chainId of the source chain
    to: contractTarget,
    input: {
      $abi: SYNAPSE_BRIDGE_FRAGMENTS, // The ABI of the bridge contract
      ...inputObject,
    },
  })
}

export const getSupportedTokenAddresses = async (
  chainId: number,
): Promise<Address[]> => {
  const supportedTokens = allTokens.filter((token) =>
    Object.prototype.hasOwnProperty.call(token.addresses, chainId),
  )
  return supportedTokens.map((token) => token.addresses[chainId]) as Address[]
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY as number[]
}
