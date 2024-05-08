import {
  type TransactionFilter,
  type BridgeActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address, getAddress } from 'viem'
import { CHAIN_ID_ARRAY, CHAIN_TO_TOKENS, CHAIN_TO_ROUTER } from './constants'
import { metaBurnABI, metaRouteABI } from './abi'

export const bridge = async (
  bridge: BridgeActionParams,
): Promise<TransactionFilter> => {
  const {
    chainId,
    destinationChainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  const bridgeContract: Address =
    contractAddress ?? CHAIN_TO_ROUTER[chainId]

  return compressJson({
    chainId: chainId,
    to: bridgeContract,
    input: {
      $abi: metaRouteABI,
      _metarouteTransaction: {
        approvedTokens: tokenAddress
          ? { $first: getAddress(tokenAddress) }
          : undefined, // if tokenAddress is undefined, any input token will pass filter
        amount: amount,
        otherSideCalldata: {
          $abiAbstract: metaBurnABI,
          _metaBurnTransaction: {
            chainID: destinationChainId,
            chain2address: recipient,
          },
        },
      },
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
