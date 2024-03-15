import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
  ActionType,
} from '@rabbitholegg/questdk'
import {
  type MintIntentParams,
  chainIdToViemChain,
  DEFAULT_ACCOUNT,
  type DisctriminatedActionParams,
  BOOST_TREASURY_ADDRESS,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type TransactionRequest,
  encodeFunctionData,
  type PublicClient,
  type SimulateContractReturnType,
} from 'viem'
import { http, createPublicClient } from 'viem'
import {
  COLLECT_ENTRY_ABI,
  GET_TREASURY_CONFIGURATION_ABI,
  GET_FEE_CONFIGURATION_ABI,
  GET_PLATFORM_FEE_ABI,
  GET_PRICE_ABI,
  PURCHASE_ABI,
} from './abi'
import { Chains } from './utils'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, recipient } = mint

  return compressJson({
    chainId,
    to: contractAddress,
    from: recipient,
    input: {
      $abi: COLLECT_ENTRY_ABI,
      tokenRecipient: recipient,
    },
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { contractAddress, recipient } = mint

  const data = encodeFunctionData({
    abi: COLLECT_ENTRY_ABI,
    functionName: 'purchase',
    args: [recipient, mint.tokenId.toString(), recipient],
  })
  // Note: Do we need to pass back value here?
  const transaction: TransactionRequest = {
    to: contractAddress,
    from: recipient,
    data,
  }

  return transaction
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

  const result = await _client.simulateContract({
    address: contractAddress,
    value,
    abi: PURCHASE_ABI,
    functionName: 'purchase',
    args: [recipient, '', BOOST_TREASURY_ADDRESS],
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
  const { chainId, contractAddress } = mint
  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  })

  // get treasuryConfiguration address
  const treasuryConfiguration = await client.readContract({
    address: contractAddress,
    abi: GET_TREASURY_CONFIGURATION_ABI,
    functionName: 'treasuryConfiguration',
  })

  // get feeConfiguration address
  const feeConfiguration = await client.readContract({
    address: treasuryConfiguration,
    abi: GET_FEE_CONFIGURATION_ABI,
    functionName: 'feeConfiguration',
  })

  // get platform fee
  const platformFee = await client.readContract({
    address: feeConfiguration,
    abi: GET_PLATFORM_FEE_ABI,
    functionName: 'flatFeeAmount',
  })

  // get nft price
  const nftPrice = await client.readContract({
    address: contractAddress,
    abi: GET_PRICE_ABI,
    functionName: 'price',
  })

  return { projectFee: platformFee, actionFee: nftPrice }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] // supported tokens don't apply for the mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.OPTIMISM, Chains.ZORA, Chains.BASE, Chains.LINEA]
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
    originAuthor: `by ${metadata.author}`, // NFT Author/Artist [format: "by {artist}"]
    originCollection: metadata.collectionName, // NFT Collection
    originNetwork: data.chainId,
    projectImage:
      'https://rabbithole-assets.s3.amazonaws.com/projects/mirror.png&w=3840&q=75',
    project: 'Mirror',
  }
  return values
}
