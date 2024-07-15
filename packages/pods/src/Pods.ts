import axios from 'axios'
import { FEES_ABI, ZORA_MINTER_ABI_1155 } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import {
  FIXED_PRICE_SALE_STRATS,
  ZORA_DEPLOYER_ADDRESS,
} from './contract-addresses'
import { type AndArrayItem, getLatestTokenId, getUri } from './utils'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  DEFAULT_ACCOUNT,
  type MintIntentParams,
  chainIdToViemChain,
  getExitAddresses,
  formatAmount,
  getMintAmount,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  http,
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  pad,
  parseEther,
} from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const andArray1155: AndArrayItem[] = [
    {
      quantity: formatAmount(amount),
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
    $abiAbstract: ZORA_MINTER_ABI_1155,
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
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const fixedPriceSaleStratAddress = FIXED_PRICE_SALE_STRATS[chainId]

  const _tokenId = tokenId ?? (await getLatestTokenId(contractAddress, chainId))

  const mintArgs = [
    fixedPriceSaleStratAddress,
    _tokenId,
    amount,
    [ZORA_DEPLOYER_ADDRESS],
    pad(recipient),
  ]

  const data = encodeFunctionData({
    abi: ZORA_MINTER_ABI_1155,
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
  const _client =
    client ??
    (createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    }) as PublicClient)
  const from = account ?? DEFAULT_ACCOUNT
  let _tokenId = tokenId
  if (tokenId === null || tokenId === undefined) {
    _tokenId = await getLatestTokenId(contractAddress, chainId, _client)
  }

  const fixedPriceSaleStratAddress = FIXED_PRICE_SALE_STRATS[chainId]

  const mintArgs = [
    fixedPriceSaleStratAddress,
    _tokenId,
    amount,
    [ZORA_DEPLOYER_ADDRESS],
    pad(recipient),
  ]
  const result = await _client.simulateContract({
    address: contractAddress,
    value,
    abi: ZORA_MINTER_ABI_1155,
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
  const quantityToMint = getMintAmount(amount)
  try {
    const client = createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    }) as PublicClient
    const fixedPriceSaleStratAddress = FIXED_PRICE_SALE_STRATS[chainId]
    const _tokenId =
      tokenId ?? (await getLatestTokenId(contractAddress, chainId, client))

    const { pricePerToken } = (await client.readContract({
      address: fixedPriceSaleStratAddress,
      abi: FEES_ABI,
      functionName: 'sale',
      args: [contractAddress, _tokenId],
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
      projectFee: parseEther('0.0007') * quantityToMint,
    }
  }
}

export const getExternalUrl = async (
  params: MintActionParams,
): Promise<string> => {
  const { chainId, contractAddress, tokenId, referral } = params

  try {
    const client = createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    }) as PublicClient

    const uri = await getUri(client, contractAddress, tokenId)
    console.log('uri', uri)
    const cid = uri.split('/').slice(2).join('/')

    const { data } = await axios.get(`https://arweave.net/${cid}`)

    // different properties depending on uri function. One of these will be defined
    const baseUrl = data.external_link ?? data.external_url

    return referral ? `${baseUrl}?referrer=${referral}` : baseUrl
  } catch (error) {
    console.error('an error occurred fetching data from the contract')
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    // fallback to default pods url
    return 'https://pods.media'
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
