import {
  type BridgeActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { ABI } from './abi.js'
import { NATIVE_TOKEN_ADDRESS, CHAIN_TO_TOKENS } from './chain-to-tokens'
import { CHAIN_TO_CONTRACT } from './chain-to-contract'
import { type ChainIds, CHAIN_ID_ARRAY } from './chain-ids'

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

  const bridgeContract =
    contractAddress ?? CHAIN_TO_CONTRACT[sourceChainId as ChainIds]

  // if transfer is using the native gas token
  if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
    return compressJson({
      chainId: sourceChainId, // The chainId of the source chain
      to: bridgeContract, // The contract address of the bridge
      value: amount,
      input: {
        $abi: ABI,
        toChainId: destinationChainId,
        receiver: recipient,
      },
    })
  }

  // if transfer is for ERC-20 tokens
  return compressJson({
    chainId: sourceChainId,
    to: bridgeContract,
    input: {
      $abi: ABI,
      toChainId: destinationChainId,
      tokenAddress,
      receiver: recipient,
      amount,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return CHAIN_TO_TOKENS[_chainId as ChainIds] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return CHAIN_ID_ARRAY
}
