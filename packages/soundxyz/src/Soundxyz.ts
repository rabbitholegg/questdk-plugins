import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  createPublicClient,
  http,
  encodeFunctionData,
  type Address,
  type TransactionRequest,
  zeroAddress,
  zeroHash,
  type PublicClient,
  type SimulateContractReturnType,
} from 'viem'
import {
  type MintIntentParams,
  chainIdToViemChain,
  DEFAULT_ACCOUNT,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  SUPERMINTER,
  SUPERMINTER_V2,
  SUPERMINTER_ABI,
  MINT_INFO_LIST_ABI,
  TOTAL_PRICE_AND_FEES_ABI,
} from './constants'
import { Chains } from './utils'
import type { MintInfoList, TotalPriceAndFees } from './types'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, amount, recipient } = mint

  return compressJson({
    chainId,
    to: {
      $or: [SUPERMINTER.toLowerCase(), SUPERMINTER_V2.toLowerCase()],
    },
    input: {
      $abi: SUPERMINTER_ABI,
      p: {
        edition: contractAddress,
        quantity: amount,
        to: recipient, // Can be given as gift, so recipient will not always match sender
      },
    },
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { contractAddress, recipient } = mint

  const mintTo = {
    edition: contractAddress,
    tier: 0,
    scheduleNum: 0,
    to: recipient,
    quantity: 1,
    allowlisted: zeroAddress,
    allowlistedQuantity: 0,
    allowlistProof: [zeroHash],
    signedPrice: 0,
    signedQuantity: 0,
    signedClaimTicket: 0,
    signedDeadline: 0,
    signature: zeroHash,
    affiliate: zeroAddress,
    affiliateProof: [zeroHash],
    attributionId: 0,
  }

  const data = encodeFunctionData({
    abi: SUPERMINTER_ABI,
    functionName: 'mintTo',
    args: [mintTo],
  })

  return {
    from: recipient,
    to: contractAddress,
    data,
  }
}

export const simulateMint = async (
  mint: MintIntentParams,
  value: bigint,
  account?: Address,
  client?: PublicClient,
): Promise<SimulateContractReturnType> => {
  const { contractAddress, recipient } = mint
  const _client =
    client ||
    createPublicClient({
      chain: chainIdToViemChain(mint.chainId),
      transport: http(),
    })

  const mintTo = {
    edition: contractAddress,
    tier: 0,
    scheduleNum: 0,
    to: recipient,
    quantity: 1,
    allowlisted: zeroAddress,
    allowlistedQuantity: 0,
    allowlistProof: [zeroHash],
    signedPrice: 0,
    signedQuantity: 0,
    signedClaimTicket: 0,
    signedDeadline: 0,
    signature: zeroHash,
    affiliate: zeroAddress,
    affiliateProof: [zeroHash],
    attributionId: 0,
  }
  const result = await _client.simulateContract({
    abi: SUPERMINTER_ABI,
    functionName: 'mintTo',
    args: [mintTo],
    address: contractAddress,
    value,
    account: account || DEFAULT_ACCOUNT,
  })

  return result
}

export const getProjectFees = async (
  mint: MintActionParams,
): Promise<bigint> => {
  const { chainId, contractAddress } = mint

  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  })

  const mintInfoList = (await client.readContract({
    address: SUPERMINTER_V2,
    abi: MINT_INFO_LIST_ABI,
    functionName: 'mintInfoList',
    args: [contractAddress],
  })) as MintInfoList

  const mintInfo = mintInfoList[0]

  const totalPriceAndFees = (await client.readContract({
    address: SUPERMINTER_V2,
    abi: TOTAL_PRICE_AND_FEES_ABI,
    functionName: 'totalPriceAndFees',
    args: [contractAddress, mintInfo.tier, mintInfo.scheduleNum, 1, false], // assume quantity is 1 and hasValidAffiliate is false
  })) as TotalPriceAndFees

  return totalPriceAndFees.total
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] // no tokenAddresses for mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ETHEREUM, Chains.OPTIMISM, Chains.BASE]
}
