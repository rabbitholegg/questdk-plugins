import { Token } from './Token'
import { SYNAPSE_BRIDGE_FRAGMENTS } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { CHAIN_TO_ROUTER, SYNAPSE_CCTP_ROUTER } from './contract-addresses'
import * as tokens from './tokens'
import {
  type BridgeActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { CHAIN_TO_TOKENS, Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address, zeroAddress } from 'viem'

const allTokens: Token[] = Object.values(tokens)

export const bridge = async (
  bridge: BridgeActionParams,
): Promise<TransactionFilter> => {
  // This is the information we'll use to compose the Transaction object
  const {
    chainId,
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
          CHAIN_TO_ROUTER[chainId]?.toLowerCase(),
          SYNAPSE_CCTP_ROUTER[chainId]?.toLowerCase(),
        ],
      }

  if (recipient !== undefined) {
    return compressJson({
      chainId: chainId,
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
    chainId: chainId, // The chainId of the source chain
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
  if (chainId === Chains.BLAST) {
    return CHAIN_TO_TOKENS[chainId] as Address[]
  }

  const supportedTokens = allTokens.filter((token) =>
    Object.prototype.hasOwnProperty.call(token.addresses, chainId),
  )
  return supportedTokens.map((token) => token.addresses[chainId]) as Address[]
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY as number[]
}
