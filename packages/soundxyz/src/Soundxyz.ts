import axios from 'axios'
import {
  CONTRACT_URI_ABI,
  MINT_INFO_LIST_ABI,
  NEXT_SCHEDULE_NUM_ABI,
  SUPERMINTER,
  SUPERMINTER_V1_ABI,
  SUPERMINTER_V2,
  SUPERMINTER_V2_ABI,
  TOTAL_PRICE_AND_FEES_V1_ABI,
  TOTAL_PRICE_AND_FEES_V2_ABI,
  ZORA_DEPLOYER_ADDRESS,
} from './constants'
import type { TotalPriceAndFees } from './types'
import { Chains } from './utils'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  ActionType,
  DEFAULT_ACCOUNT,
  type DisctriminatedActionParams,
  type MintIntentParams,
  chainIdToViemChain,
  getExitAddresses,
  formatAmount,
  getMintAmount,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  http,
  zeroAddress,
  zeroHash,
} from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, amount, recipient, tokenId } = mint

  return compressJson({
    chainId,
    to: getExitAddresses(chainId, [SUPERMINTER, SUPERMINTER_V2]),
    input: {
      $abiAbstract: SUPERMINTER_V2_ABI,
      p: {
        edition: contractAddress,
        quantity: formatAmount(amount),
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
  const quantity = getMintAmount(amount)

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
    abi: SUPERMINTER_V2_ABI,
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
  creatorAddress?: Address,
): Promise<SimulateContractReturnType> => {
  const { contractAddress, recipient, tokenId, amount } = mint
  const _client = (client ??
    createPublicClient({
      chain: chainIdToViemChain(mint.chainId),
      transport: http(),
    })) as PublicClient
  const tier = await getDefaultMintTier(
    mint.chainId,
    contractAddress,
    tokenId,
    _client,
  )
  const quantity = getMintAmount(amount)

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
    affiliate: creatorAddress ?? ZORA_DEPLOYER_ADDRESS,
    affiliateProof: [zeroHash],
    attributionId: 0,
  }

  try {
    const result = await _client.simulateContract({
      abi: SUPERMINTER_V2_ABI,
      functionName: 'mintTo',
      args: [mintTo],
      address: SUPERMINTER_V2,
      value,
      account: account || DEFAULT_ACCOUNT,
    })
    return result
  } catch {
    const result = await _client.simulateContract({
      abi: SUPERMINTER_V1_ABI,
      functionName: 'mintTo',
      args: [mintTo],
      address: SUPERMINTER,
      value,
      account: account || DEFAULT_ACCOUNT,
    })
    return result
  }
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

  const tier = await getDefaultMintTier(
    chainId,
    contractAddress,
    tokenId,
    client,
  )
  const quantity = getMintAmount(amount)

  try {
    const totalPriceAndFees = (await client.readContract({
      address: SUPERMINTER_V2,
      abi: TOTAL_PRICE_AND_FEES_V2_ABI,
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
  } catch {
    const totalPriceAndFees = (await client.readContract({
      address: SUPERMINTER,
      abi: TOTAL_PRICE_AND_FEES_V1_ABI,
      functionName: 'totalPriceAndFees',
      args: [contractAddress, tier, BigInt(0), quantity],
    })) as TotalPriceAndFees

    return {
      actionFee: totalPriceAndFees.subTotal,
      projectFee: totalPriceAndFees.total - totalPriceAndFees.subTotal,
    }
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

  // check to see if contract uses legacy SUPERMINTER
  // will return an array of mintInfo or an empty array
  const mintInfoListResult = (await _client.readContract({
    address: SUPERMINTER,
    abi: MINT_INFO_LIST_ABI,
    functionName: 'mintInfoList',
    args: [contractAddress],
  })) as unknown[]
  const isLegacy = mintInfoListResult.length

  const minterAddress = isLegacy ? SUPERMINTER : SUPERMINTER_V2

  const tier0NextSchedule = (await _client.readContract({
    address: minterAddress,
    abi: NEXT_SCHEDULE_NUM_ABI,
    functionName: 'nextScheduleNum',
    args: [contractAddress, BigInt(0)],
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

export const getExternalUrl = async (
  params: MintActionParams,
): Promise<string> => {
  const { chainId, contractAddress, referral } = params

  try {
    const client = createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    }) as PublicClient

    const contractUri = (await client.readContract({
      address: contractAddress,
      abi: CONTRACT_URI_ABI,
      functionName: 'contractURI',
    })) as string

    const cid = contractUri.split('/').slice(2).join('/')

    const { data } = await axios.get(`https://arweave.net/${cid}`)
    const { external_link } = data

    return `${external_link}?referral=${referral ?? ZORA_DEPLOYER_ADDRESS}`
  } catch (error) {
    console.error('an error occurred fetching the contract uri')
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    // fallback to default sound.xyz url
    return 'https://sound.xyz'
  }
}
