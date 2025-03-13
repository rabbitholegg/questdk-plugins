import axios from 'axios'
import { COOP_CREATOR_ABI_1155, FEES_ABI } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import {
  COOP_FIXED_PRICE_SALE_CONTRACT,
  ZORA_FIXED_PRICE_SALE_CONTRACT,
} from './contract-addresses'
import { type AndArrayItem, getUri } from './utils'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  DEFAULT_ACCOUNT,
  DEFAULT_REFERRAL,
  type MintIntentParams,
  chainIdToViemChain,
  getExitAddresses,
  formatAmountToFilterOperator,
  formatAmountToInteger,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  http,
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  getAddress,
  pad,
  parseEther,
} from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  if (!tokenId) throw new Error('tokenId is required')

  const andArray1155: AndArrayItem[] = [
    {
      quantity: formatAmountToFilterOperator(amount),
    },
  ]
  if (recipient) {
    andArray1155.push({
      minterArguments: {
        $regex: `.*${recipient.toLowerCase().replace(/^0x/, '')}.*`,
      },
    })
  }
  if (tokenId) {
    andArray1155.push({
      tokenId,
    })
  }

  const ERC1155_FILTER = {
    $abiAbstract: COOP_CREATOR_ABI_1155,
    $and: andArray1155,
  }

  return compressJson({
    chainId,
    to: getExitAddresses(chainId, contractAddress),
    input: ERC1155_FILTER,
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { contractAddress, tokenId, amount, recipient, referral } = mint

  if (!tokenId) throw new Error('tokenId is required')

  const fixedPriceSaleStratAddress = ZORA_FIXED_PRICE_SALE_CONTRACT

  const referralAddress = referral ? getAddress(referral) : DEFAULT_REFERRAL

  const mintArgs = [
    fixedPriceSaleStratAddress,
    BigInt(tokenId),
    amount,
    [referralAddress],
    pad(recipient),
  ] as const

  const data = encodeFunctionData({
    abi: COOP_CREATOR_ABI_1155,
    functionName: 'mint',
    args: mintArgs,
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
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  if (!tokenId) throw new Error('tokenId is required')

  const _client =
    client ??
    (createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    }) as PublicClient)
  const from = account ?? DEFAULT_ACCOUNT

  const fixedPriceSaleStratAddress = ZORA_FIXED_PRICE_SALE_CONTRACT
  const referralAddress =
    '0x512b55b00d744fC2eDB8474f223a7498c3e5a7ce' as Address

  const mintArgs = [
    fixedPriceSaleStratAddress,
    BigInt(tokenId),
    amount,
    [referralAddress],
    pad(recipient),
  ] as const

  const result = await _client.simulateContract({
    address: contractAddress,
    value,
    abi: COOP_CREATOR_ABI_1155,
    functionName: 'mint',
    args: mintArgs,
    account: from,
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

  if (!tokenId) throw new Error('tokenId is required')

  const quantityToMint = formatAmountToInteger(amount)
  try {
    const client = createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    }) as PublicClient
    const fixedPriceSaleStratAddress = COOP_FIXED_PRICE_SALE_CONTRACT

    const { pricePerToken } = (await client.readContract({
      address: fixedPriceSaleStratAddress,
      abi: FEES_ABI,
      functionName: 'sale',
      args: [contractAddress, BigInt(tokenId)],
    })) as { pricePerToken: bigint }

    const mintFee = (await client.readContract({
      address: contractAddress,
      abi: FEES_ABI,
      functionName: 'mintFee',
    })) as bigint

    return {
      actionFee: pricePerToken * quantityToMint,
      projectFee: mintFee * quantityToMint,
    }
  } catch {
    return {
      actionFee: parseEther('0'),
      projectFee: parseEther('0.0004') * quantityToMint,
    }
  }
}

export const getExternalUrl = async (
  params: MintActionParams,
): Promise<string> => {
  const { chainId, contractAddress, tokenId } = params

  try {
    if (!tokenId) throw new Error('tokenId is required')

    const client = createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    }) as PublicClient

    const uri = await getUri(client, contractAddress, tokenId)
    const cid = uri.split('/').slice(2).join('/')

    const { data } = await axios.get(`https://dweb.link/ipfs/${cid}`)

    // different properties depending on uri function. One of these will be defined
    return data.external_url ?? 'https://cooprecords.xyz';
  } catch (error) {
    console.error('an error occurred fetching data from the contract')
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    // fallback to default pods url
    return 'https://cooprecords.xyz'
  }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] /// Supported tokens don't apply for the mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY as number[]
}
