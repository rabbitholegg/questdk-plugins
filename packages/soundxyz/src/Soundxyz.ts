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
  type DisctriminatedActionParams,
  ActionType,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  SUPERMINTER,
  SUPERMINTER_V2,
  SUPERMINTER_ABI,
  TOTAL_PRICE_AND_FEES_ABI,
  NEXT_SCHEDULE_NUM_ABI,
} from './constants'
import { Chains } from './utils'
import type { TotalPriceAndFees } from './types'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, amount, recipient, tokenId } = mint

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
        tier: tokenId,
        to: recipient, // Can be given as gift, so recipient will not always match sender
      },
    },
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { contractAddress, recipient, tokenId, amount } = mint
  const tier = await getDefaultMintTier(mint.chainId, contractAddress, tokenId)
  const quantity = amount ?? 1

  const mintTo = {
    edition: contractAddress,
    tier,
    scheduleNum: BigInt(0),
    to: recipient,
    quantity,
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
  const { contractAddress, recipient, tokenId, amount } = mint
  console.log('mint', mint)
  const _client =
    (client ??
    createPublicClient({
      chain: chainIdToViemChain(mint.chainId),
      transport: http(),
    })) as PublicClient
    const tier = await getDefaultMintTier(mint.chainId, contractAddress, tokenId, _client)
    const quantity = amount ?? 1

  const mintTo = {
    edition: contractAddress,
    tier,
    scheduleNum: BigInt(0),
    to: recipient,
    quantity,
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
    address: SUPERMINTER_V2,
    value,
    account: account || DEFAULT_ACCOUNT,
  })

  return result
}

export const getProjectFees = async (
  mint: MintActionParams,
): Promise<bigint> => {
  const fees = await getFees(mint)
  return fees.projectFee + fees.actionFee
}

export const getFees = async (
  mint: MintActionParams,
): Promise<{ actionFee: bigint; projectFee: bigint }> => {
  const { chainId, contractAddress, tokenId, amount } = mint

  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  }) as PublicClient

  const tier = await getDefaultMintTier(chainId, contractAddress, tokenId, client)
  const quantity = amount ?? 1

  const totalPriceAndFees = (await client.readContract({
    address: SUPERMINTER_V2,
    abi: TOTAL_PRICE_AND_FEES_ABI,
    functionName: 'totalPriceAndFees',
    args: [
      contractAddress,
      tier,
      BigInt(0),
      quantity,
      false, // assume hasValidAffiliate is false
    ],
  })) as TotalPriceAndFees

  return {
    actionFee: totalPriceAndFees.subTotal,
    projectFee: totalPriceAndFees.total - totalPriceAndFees.subTotal,
  }
}

export const getDefaultMintTier = async (
  chainId: number,
  contractAddress: Address,
  tokenId?: number,
  client?: PublicClient,
) => {
  const _client =
    client ??
    createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })
  // If the next schedule to tier 0 is 0 then the edition is not scheduled
  const tier0NextSchedule = (await _client.readContract({
    address: SUPERMINTER_V2,
    abi: NEXT_SCHEDULE_NUM_ABI,
    functionName: 'nextScheduleNum',
    args: [
      contractAddress,
      BigInt(0)
    ],
  })) as number
  // If we pass in a tokenId, we use that to infer the tier, otherwise we default to 0 if it exists, otherwise 1
  const tier = tokenId ?? (BigInt(tier0NextSchedule) === BigInt(0) ? 1 : 0)
  return tier
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] // no tokenAddresses for mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ETHEREUM, Chains.OPTIMISM, Chains.BASE]
}

export const getDynamicNameParams = async (
  params: DisctriminatedActionParams,
  metadata: Record<string, unknown>,
): Promise<Record<string, unknown>> => {
  if (params.type !== ActionType.Mint) {
    throw new Error(`Invalid action type "${params.type}"`)
  }
  const data = params.data
  const values: Record<string, unknown> = {
    actionType: 'Mint',
    originQuantity: data.amount ?? '',
    originTargetImage: metadata.tokenImage, // NFT Image
    originAuthor: ` by ${metadata.author}`, // NFT Author/Artist [format: "by {artist}"]
    originCollection: metadata.tokenCollection, // NFT Collection
    originNetwork: data.chainId,
    projectImage:
      'https://rabbithole-assets.s3.amazonaws.com/projects/sound.jpeg&w=3840&q=75',
    project: 'Sound.XYZ',
  }
  return values
}
