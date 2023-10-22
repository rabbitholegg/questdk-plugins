import {
  type TransactionFilter,
  type BridgeActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { metaBurnABI, metaRouteABI, metaSynthesizeABI } from './abi'

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

  return compressJson({
    chainId: sourceChainId,
    to: contractAddress,
    input: {
      $abi: metaRouteABI,
      _metarouteTransaction: {
        amount: amount,
        otherSideCalldata: {
          $abi: metaSynthesizeABI,
          _metaSynthesizeTransaction: {
            rtoken: tokenAddress,
            chain2address: recipient,
            finalCalldata: {
              $abi: metaBurnABI,
              _metaBurnTransaction: {
                chainID: destinationChainId,
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
