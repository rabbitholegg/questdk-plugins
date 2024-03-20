import {
  type TransactionFilter,
  compressJson,
  type MintActionParams,
} from '@rabbitholegg/questdk'
import { createPublicClient, type Address, type SimulateContractReturnType, type PublicClient, http } from 'viem'
import { Chains, type MintIntentParams, chainIdToViemChain, DEFAULT_ACCOUNT } from '@rabbitholegg/questdk-plugin-utils'
import { VILLAGER_MINT_ADDRESS, VILLAGER_MINT_ABI } from './constants'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, recipient } = mint

  return compressJson({
    chainId,
    from: recipient,
    to: contractAddress ?? VILLAGER_MINT_ADDRESS,
    input: {
      $abi: VILLAGER_MINT_ABI,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] // not needed for mint plugin
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ARBITRUM_ONE]
}

// Hard code 0 since `mintNormal` is not a payable tx
export const getProjectFees = async (_mint: MintActionParams): Promise<bigint> => {
  return BigInt(0);
}

// Hard code 0 since `mintNormal` is not a payable tx
export const getFees = async (_mint: MintActionParams): Promise<{ projectFee: bigint, actionFee: bigint }> => {
  return {
    projectFee: BigInt(0),
    actionFee: BigInt(0),
  };
}

export const simulateMint = async (
  mint: MintIntentParams,
  value: bigint,
  account?: Address,
  client?: PublicClient,
): Promise<SimulateContractReturnType> => {
  const { contractAddress } = mint
  const _client =
  client ||
  createPublicClient({
    chain: chainIdToViemChain(mint.chainId),
    transport: http(),
  })

const result = await _client.simulateContract({
  address: contractAddress,
  value,
  abi: VILLAGER_MINT_ABI,
  functionName: 'mintNormal',
  args: [],
  account: account || DEFAULT_ACCOUNT,
})

return result
}