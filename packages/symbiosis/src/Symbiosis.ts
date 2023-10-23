import {
  type TransactionFilter,
  type BridgeActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { metaBurnABI, metaRouteABI, metaSynthesizeABI } from './abi'
import { symbiosis } from './symbiosis-sdk'

export const bridge = async (
  bridge: BridgeActionParams,
): Promise<TransactionFilter> => {
  const {
    sourceChainId,
    destinationChainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  const bridgeContract: Address =
    contractAddress ?? symbiosis.metaRouter(sourceChainId).address as Address

  return compressJson({
    chainId: sourceChainId,
    to: bridgeContract,
    input: {
      $abi: metaRouteABI,
      _metarouteTransaction: {
        approvedTokens: tokenAddress ? [tokenAddress] : undefined, // if tokenAddress is undefined, any input token will pass filter
        amount: amount,
        otherSideCalldata: {
          $abi: metaSynthesizeABI,
          _metaSynthesizeTransaction: {
            finalCalldata: {
              $abi: metaBurnABI,
              _metaBurnTransaction: {
                chainID: destinationChainId,
                chain2address: recipient,
              },
            },
          },
        },
      },
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
}
