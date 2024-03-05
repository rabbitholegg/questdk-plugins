import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  encodeFunctionData,
  type Address,
  type TransactionRequest,
  zeroAddress,
  zeroHash,
} from 'viem'
import { SUPERMINTER, SUPERMINTER_V2, SUPERMINTER_ABI } from './constants'
import { Chains } from './utils'
import {
  type DisctriminatedActionParams,
  ActionType,
  type MintIntentParams,
} from '@rabbitholegg/questdk-plugin-utils'

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
): Promise< Record<string, unknown>> => {
  
  if (params.type !== ActionType.Mint) {
    throw new Error(`Invalid action type "${params.type}"`)
  }
  const data = params.data
  const values: Record<string, unknown> = {
    actionType: 'Mint',
    originQuantity: data.amount ?? '',
    originTargetImage: metadata.tokenImage, // NFT Image
    originAuthor: ` by ${metadata.author}`,      // NFT Author/Artist [format: "by {artist}"]
    originCollection: metadata.tokenCollection,  // NFT Collection
    originNetwork: data.chainId,
    projectImage: 'https://rabbithole-assets.s3.amazonaws.com/projects/sound.jpeg&w=3840&q=75',
    project: 'Sound.XYZ',
  };
  // I added {originAuthor} and {originTargetImage} to the values object; some of these will be empty for some protocols
  // Example Message: 
  // const messages = {
  //   en: {
  //     'boost.mint':
  //       '{actionType} {originQuantity} {originTargetImage} {originTarget} {originCollection} {originAuthor} {projectImage} {project} {originNetwork}',
  //     'mint.from': 'from the {collection} collection',
  //     'mint.anything': 'anything',
  //     exactly: 'exactly {amount}',
  //     'on.network': 'using {network}',
  //   },
  // };
  return values
}

