import { GetMintParameters, MintableReturn, OnchainSalesConfigAndTokenInfo } from '@zoralabs/protocol-sdk/dist/mint/types'
import {
  CREATE_CONTRACT_ABI,
  UNIVERSAL_MINTER_ABI,
  ZORA_MINTER_ABI_721,
  ZORA_MINTER_ABI_1155,
  ZORA_MINTER_ABI_1155_LEGACY,
  V2_MINT_ABI,
} from './abi'
import { CHAIN_ID_ARRAY, CHAIN_ID_TO_ZORA_SLUG } from './chain-ids'
import {
  FIXED_PRICE_SALE_STRATS,
  ZORA_1155_FACTORY,
  ZORA_TIMED_SALE_STRATEGY,
} from './contract-addresses'
import { AndArrayItem } from './types'
import {
  checkBytecode,
  getContractType,
  getNextTokenId,
  getPublicClient,
  getTokenInfo,
} from './utils'
import { validatePremint } from './validate'
import {
  type MintActionParams,
  type CreateActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  ActionParams,
  formatAmountToFilterOperator,
  formatAmountToInteger,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  ActionType,
  Chains,
  DEFAULT_ACCOUNT,
  DEFAULT_REFERRAL as ZORA_DEPLOYER_ADDRESS,
  type DisctriminatedActionParams,
  type MintIntentParams,
  getExitAddresses,
  PluginActionValidation,
  QuestCompletionPayload,
} from '@rabbitholegg/questdk-plugin-utils'
import { createCollectorClient, type CollectorClient } from '@zoralabs/protocol-sdk'
import { zoraUniversalMinterAddress } from '@zoralabs/universal-minter'
import {
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  type TransactionRequest,
  encodeFunctionData,
  getAddress,
  pad,
  parseEther,
} from 'viem'

export const validate = async (
  validationPayload: PluginActionValidation,
): Promise<QuestCompletionPayload | null> => {
  const { actor, payload } = validationPayload
  const { actionParams, validationParams, questId, taskId } = payload
  switch (actionParams.type) {
    case ActionType.Premint: {
      const isPremintValid = await validatePremint(
        actionParams.data,
        validationParams.data,
      )
      if (isPremintValid) {
        return {
          address: actor,
          questId,
          taskId,
        }
      }

      return null
    }
    default:
      throw new Error('Unsupported action type')
  }
}

export const create = async (
  create: CreateActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress } = create

  return compressJson({
    chainId,
    to: contractAddress ?? ZORA_1155_FACTORY,
    input: {
      $abi: CREATE_CONTRACT_ABI,
    },
  })
}

const v1MintFilter = (mint: MintActionParams) => {
  const { chainId, contractAddress, tokenId, amount, recipient, referral } =
    mint
  const universalMinter =
    zoraUniversalMinterAddress[
      chainId as keyof typeof zoraUniversalMinterAddress
    ]

  const mintContracts = universalMinter
    ? ([
        contractAddress.toLowerCase(),
        universalMinter.toLowerCase(),
      ] as Address[])
    : contractAddress

  const quantityCheck = {
    quantity: formatAmountToFilterOperator(amount),
  }
  const andArray721: AndArrayItem[] = [quantityCheck]
  const andArray1155: AndArrayItem[] = [quantityCheck]

  if (recipient) {
    andArray721.push({
      $or: [{ recipient }, { tokenRecipient: recipient }, { to: recipient }],
    })
    andArray1155.push({
      $or: [{ recipient }, { tokenRecipient: recipient }, { to: recipient }],
    })
  }
  if (tokenId) {
    andArray1155.push({
      tokenId,
    })
  }
  if (referral) {
    andArray1155.push({
      $or: [
        { mintReferral: referral },
        {
          rewardsRecipients: [referral],
        },
      ],
    })
  }

  const ERC721_FILTER_ABSTRACT = {
    $abiAbstract: ZORA_MINTER_ABI_721,
    $and: andArray721,
  }

  const ERC1155_FILTER_ABSTRACT = {
    $abiAbstract: ZORA_MINTER_ABI_1155.concat(ZORA_MINTER_ABI_1155_LEGACY),
    $and: andArray1155,
  }

  const ERC721_FILTER = {
    $abi: ZORA_MINTER_ABI_721,
    $and: andArray721,
  }

  const ERC1155_FILTER = {
    $abi: ZORA_MINTER_ABI_1155.concat(ZORA_MINTER_ABI_1155_LEGACY),
    $and: andArray1155,
  }

  const UNIVERSAL_MINT_FILTER = {
    to: getExitAddresses(chainId, mintContracts),
    input: {
      // batchmint function
      $abiAbstract: UNIVERSAL_MINTER_ABI,
      _targets: { $some: getAddress(contractAddress) },
      _calldatas: {
        $some: {
          $or: [ERC721_FILTER, ERC1155_FILTER],
        },
      },
    },
  }

  const DIRECT_MINT_FILTER = {
    to: getExitAddresses(chainId, contractAddress),
    input: {
      $or: [ERC721_FILTER_ABSTRACT, ERC1155_FILTER_ABSTRACT],
    },
  }
  return {
    chainId,
    to: getExitAddresses(chainId, mintContracts), // We need this top level so the backend knows what contracts this applies to
    $or: [DIRECT_MINT_FILTER, UNIVERSAL_MINT_FILTER],
  }
}

const v2MintFilter = (mint: MintActionParams) => {
  const { chainId, contractAddress, tokenId, amount, recipient, referral } =
    mint

  return {
    chainId,
    to: getExitAddresses(chainId, ZORA_TIMED_SALE_STRATEGY),
    input: {
      $abi: V2_MINT_ABI,
      mintTo: recipient,
      quantity: formatAmountToFilterOperator(amount),
      collection: contractAddress,
      tokenId,
      mintReferral: referral,
    },
  }
}

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const v1Filter = v1MintFilter(mint)
  const v2Filter = v2MintFilter(mint)

  return compressJson({
    $or: [v1Filter, v2Filter],
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { chainId, contractAddress, tokenId, amount, recipient, referral } =
    mint
  let data

  const client = getPublicClient(chainId)

  const mintType = await getContractType(client, contractAddress)

  if (!mintType) {
    throw new Error('Invalid contract type')
  }

  const tokenInfo = await getTokenInfo(client, mint, mintType)

  let fixedPriceSaleStratAddress = tokenInfo.salesConfig?.address

  if (!fixedPriceSaleStratAddress) {
    console.error(
      `Unable to fetch salesConfigAndTokenInfo, defaulting price sale strategy address to ${fixedPriceSaleStratAddress}`,
    )
    fixedPriceSaleStratAddress = FIXED_PRICE_SALE_STRATS[chainId]
  }

  const isV2Mint = fixedPriceSaleStratAddress.toLowerCase() === ZORA_TIMED_SALE_STRATEGY.toLowerCase()

  if (isV2Mint) {
    const mintArgs = [
      recipient ?? DEFAULT_ACCOUNT,
      amount,
      contractAddress,
      tokenId,
      referral ?? ZORA_DEPLOYER_ADDRESS,
      '',
    ]

    data = encodeFunctionData({
      abi: V2_MINT_ABI,
      functionName: 'mint',
      args: mintArgs,
    })
  } else {
    if (tokenId !== null && tokenId !== undefined) {
      const mintArgs = [
        fixedPriceSaleStratAddress,
        tokenId,
        amount,
        [referral ?? ZORA_DEPLOYER_ADDRESS],
        pad(recipient),
      ]
      // Assume it's an 1155 mint
      data = encodeFunctionData({
        abi: ZORA_MINTER_ABI_1155,
        functionName: 'mint',
        args: mintArgs,
      })
    } else {
      // Assume it's a 721 mint
      data = encodeFunctionData({
        abi: ZORA_MINTER_ABI_721,
        functionName: 'purchase',
        args: [amount],
      })
    }
  }
  return {
    from: recipient,
    to: contractAddress,
    data,
  }
}

export const simulateV1Mint = async (
  mint: MintIntentParams,
  value: bigint,
  client: PublicClient,
  account?: Address,
): Promise<SimulateContractReturnType> => {
  const { chainId, contractAddress, tokenId, amount, recipient, referral } =
    mint
  const from = account ?? DEFAULT_ACCOUNT
  const _tokenId = await getNextTokenId(client, contractAddress, tokenId)
  await checkBytecode(client, contractAddress)

  let fixedPriceSaleStratAddress = FIXED_PRICE_SALE_STRATS[chainId]

  try {
    fixedPriceSaleStratAddress = (
      await getSalesConfigAndTokenInfo(chainId, contractAddress, tokenId)
    ).salesConfig.address
  } catch {
    console.error('Unable to fetch salesConfigAndTokenInfo')
  }

  try {
    const mintArgs = [
      fixedPriceSaleStratAddress,
      _tokenId,
      amount,
      [referral ?? ZORA_DEPLOYER_ADDRESS],
      pad(recipient),
    ]
    const result = await client.simulateContract({
      address: contractAddress,
      value,
      abi: ZORA_MINTER_ABI_1155,
      functionName: 'mint',
      args: mintArgs,
      account: from,
      stateOverride: [
        {
          address: from,
          balance: parseEther('100'),
        },
      ],
    })
    return result
  } catch {
    const mintArgs = [
      fixedPriceSaleStratAddress,
      _tokenId,
      amount,
      pad(recipient),
    ]
    try {
      const result = await client.simulateContract({
        address: contractAddress,
        value,
        abi: ZORA_MINTER_ABI_1155_LEGACY,
        functionName: 'mint',
        args: mintArgs,
        account: from,
        stateOverride: [
          {
            address: from,
            balance: parseEther('100'),
          },
        ],
      })
      return result
    } catch {
      // Assume it's a 721 mint
      const result = await client.simulateContract({
        address: contractAddress,
        value,
        abi: ZORA_MINTER_ABI_721,
        functionName: 'purchase',
        args: [amount],
        account: from,
        stateOverride: [
          {
            address: from,
            balance: parseEther('100'),
          },
        ],
      })
      return result
    }
  }
}

export const simulateV2Mint = async (
  mint: MintIntentParams,
  value: bigint,
  client: PublicClient,
  account?: Address,
): Promise<SimulateContractReturnType> => {
  const { contractAddress, tokenId, amount, recipient, referral } = mint

  const from = account ?? DEFAULT_ACCOUNT

  const _tokenId = await getNextTokenId(client, contractAddress, tokenId)

  await checkBytecode(client, contractAddress)

  const mintArgs = [
    recipient ?? from,
    amount,
    contractAddress,
    _tokenId,
    referral ?? ZORA_DEPLOYER_ADDRESS,
    '',
  ]

  const result = await client.simulateContract({
    address: ZORA_TIMED_SALE_STRATEGY,
    value,
    abi: V2_MINT_ABI,
    functionName: 'mint',
    args: mintArgs,
    account: from,
    stateOverride: [
      {
        address: from,
        balance: parseEther('100'),
      },
    ],
  })
  return result
}

export const simulateMint = async (
  mint: MintIntentParams,
  value: bigint,
  account?: Address,
  client?: PublicClient,
): Promise<SimulateContractReturnType> => {
  const _client = client ?? getPublicClient(mint.chainId)

  try {
    return await simulateV2Mint(mint, value, _client, account)
  } catch (error) {
    console.error('simulateV2Mint failed:', error)
    return await simulateV1Mint(mint, value, _client, account)
  }
}

const getSalesConfigAndTokenInfo = async (
  chainId: number,
  tokenAddress: Address,
  mintClient: CollectorClient,
  tokenId?: number,
) => {

  const args: GetMintParameters = {
    tokenContract: tokenAddress,
    tokenId: tokenId ?? 1,
    mintType: '1155',
  }
  console.log('args', args)

  const tokenInfo = await mintClient.getToken(args)


  console.log('tokenInfo', tokenInfo)

  args.tokenId = tokenId ?? 1

  const salesConfigAndTokenInfo = await client.getSalesConfigAndTokenInfo(args)

  return salesConfigAndTokenInfo
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
  try {
    const { chainId, contractAddress, tokenId, amount } = mint

    const client = getPublicClient(chainId)

    const contractType = await getContractType(client, contractAddress)

    if (!contractType) {
      throw new Error('Invalid contract type')
    }

    const collectorClient = createCollectorClient({
      chainId,
      publicClient: client,
    })

    const quantityToMint = formatAmountToInteger(amount)
    const { prepareMint } = await collectorClient.getToken({
      tokenContract: contractAddress,
      tokenId,
      mintType: contractType,
    })

    const { costs } = prepareMint({
      minterAccount: DEFAULT_ACCOUNT,
      quantityToMint,
    })

    console.log('costs', costs)

    return { actionFee: costs.totalPurchaseCost, projectFee: costs.mintFee }
  } catch (err) {
    console.error(err)
    // base fee of 0.000111 is the default for all new mints
    return { actionFee: parseEther('0'), projectFee: parseEther('0.000111') }
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
    originTarget: metadata.tokenName, // NFT Name
    originCollection: `from ${metadata.collection}`, // NFT Collection
    originNetwork: data.chainId,
    projectImage:
      'https://rabbithole-assets.s3.amazonaws.com/projects/zora.png&w=3840&q=75',
    project: 'Zora',
  }
  return values
}

export const getExternalUrl = async (
  params: ActionParams,
  actionType?: ActionType,
): Promise<string> => {
  if (actionType === ActionType.Mint) {
    const { chainId, contractAddress, tokenId, referral } =
      params as MintActionParams
    const chainSlug = CHAIN_ID_TO_ZORA_SLUG[chainId]
    const isTestnet =
      chainId === Chains.BASE_SEPOLIA || chainId === Chains.SEPOLIA

    if (chainSlug) {
      const referralParams = `?referrer=${referral ?? ZORA_DEPLOYER_ADDRESS}`
      const domain = isTestnet ? 'testnet.zora.co' : 'zora.co'
      const baseUrl = `https://${domain}/collect/${chainSlug}:${contractAddress}`

      return tokenId != null
        ? `${baseUrl}/${tokenId}${referralParams}`
        : `${baseUrl}${referralParams}`
    }
  }

  if (actionType === ActionType.Create) {
    return 'https://zora.co/create'
  }

  // fallback to default zora url
  return 'https://zora.co'
}
