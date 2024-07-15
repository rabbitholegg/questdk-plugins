import {
  CREATE_CONTRACT_ABI,
  FUNCTION_SELECTORS,
  UNIVERSAL_MINTER_ABI,
  ZORA_MINTER_ABI_721,
  ZORA_MINTER_ABI_1155,
  ZORA_MINTER_ABI_1155_LEGACY,
} from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import {
  FIXED_PRICE_SALE_STRATS,
  ZORA_1155_FACTORY,
  ZORA_DEPLOYER_ADDRESS,
} from './contract-addresses'
import { AndArrayItem } from './types'
import { validatePremint } from './validate'
import {
  type MintActionParams,
  type CreateActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { formatAmount } from '@rabbitholegg/questdk-plugin-utils'
import {
  ActionType,
  DEFAULT_ACCOUNT,
  type DisctriminatedActionParams,
  type MintIntentParams,
  chainIdToViemChain,
  getExitAddresses,
  PluginActionValidation,
  QuestCompletionPayload,
} from '@rabbitholegg/questdk-plugin-utils'
import { MintAPIClient, getMintCosts } from '@zoralabs/protocol-sdk'
import { zoraUniversalMinterAddress } from '@zoralabs/universal-minter'
import {
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  fromHex,
  getAddress,
  http,
  keccak256,
  pad,
  parseEther,
  stringToBytes,
  toHex,
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

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient, referral } = mint

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
    quantity: formatAmount(amount),
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
    const checksumAddress = getAddress(referral)
    andArray1155.push({
      $or: [
        { mintReferral: checksumAddress },
        {
          rewardsRecipients: {
            $and: [{ $first: checksumAddress }, { $last: checksumAddress }],
          },
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
  return compressJson({
    chainId,
    to: getExitAddresses(chainId, mintContracts), // We need this top level so the backend knows what contracts this applies to
    $or: [DIRECT_MINT_FILTER, UNIVERSAL_MINT_FILTER],
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { chainId, contractAddress, tokenId, amount, recipient, referral } = mint
  let data

  let fixedPriceSaleStratAddress = FIXED_PRICE_SALE_STRATS[chainId]

  try {
    fixedPriceSaleStratAddress = (
      await getSalesConfigAndTokenInfo(chainId, contractAddress, tokenId)
    ).fixedPrice.address
  } catch {
    console.error(
      `Unable to fetch salesConfigAndTokenInfo, defaulting price sale strategy address to ${fixedPriceSaleStratAddress}`,
    )
  }

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
  const { chainId, contractAddress, tokenId, amount, recipient, referral } = mint
  const _client =
    client ??
    createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })
  const from = account ?? DEFAULT_ACCOUNT
  let _tokenId = tokenId
  if (tokenId === null || tokenId === undefined) {
    const nextTokenId = (await _client.readContract({
      address: contractAddress,
      abi: ZORA_MINTER_ABI_1155,
      functionName: 'nextTokenId',
    })) as bigint

    _tokenId = Number(nextTokenId) - 1
  }

  // find implementation address for EIP-1967 proxy
  const slot = keccak256(stringToBytes('eip1967.proxy.implementation'))
  const slotValue = toHex(fromHex(slot, 'bigint') - 1n)
  const slotForImplementation = pad(slotValue, { size: 32 })
  const implementationAddressRaw = await _client.getStorageAt({
    address: contractAddress,
    slot: slotForImplementation,
  })
  const implementationAddress: Address = `0x${implementationAddressRaw?.slice(
    -40,
  )}`

  // Check if the implementation contracts bytecode contains valid function selectors
  const bytecode = await _client.getCode({ address: implementationAddress })
  const containsSelector = FUNCTION_SELECTORS.some((selector) =>
    bytecode?.includes(selector),
  )

  if (!containsSelector) {
    throw new Error(
      'None of the specified function selectors are present in the contract bytecode.',
    )
  }

  let fixedPriceSaleStratAddress = FIXED_PRICE_SALE_STRATS[chainId]

  try {
    fixedPriceSaleStratAddress = (
      await getSalesConfigAndTokenInfo(chainId, contractAddress, tokenId)
    ).fixedPrice.address
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
    const result = await _client.simulateContract({
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
      const result = await _client.simulateContract({
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
      const result = await _client.simulateContract({
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

const getSalesConfigAndTokenInfo = async (
  chainId: number,
  tokenAddress: Address,
  tokenId?: number,
) => {
  const client = new MintAPIClient(chainId)

  const args: { tokenAddress: Address; tokenId?: number } = {
    tokenAddress,
  }

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

    const salesConfigAndTokenInfo = await getSalesConfigAndTokenInfo(
      chainId,
      contractAddress,
      tokenId,
    )
    const quantityToMint =
      typeof amount === 'number' ? BigInt(amount) : BigInt(1)
    const fee = await getMintCosts({ salesConfigAndTokenInfo, quantityToMint })

    return { actionFee: fee.tokenPurchaseCost, projectFee: fee.mintFee }
  } catch (err) {
    console.error(err)
    return { actionFee: parseEther('0'), projectFee: parseEther('0.000777') } // https://github.com/ourzora/zora-protocol/blob/e9fb5072112b4434cc649c95729f4bd8c6d5e0d0/packages/protocol-sdk/src/apis/chain-constants.ts#L27
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
