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
import { FEES_ABI, ZORA_MINTER_ABI_1155 } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import {
  FIXED_PRICE_SALE_STRATS,
  ZORA_DEPLOYER_ADDRESS,
} from './contract-addresses'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const andArray1155 = []
  if (recipient) {
    andArray1155.push({
      minterArguments: {
        $regex: `.*${recipient.toLowerCase().replace(/^0x/, '')}.*`,
      },
    })
  }
  if (tokenId || amount) {
    andArray1155.push({
      quantity: amount,
      tokenId,
    })
  }

  const ERC1155_FILTER = {
    $abi: ZORA_MINTER_ABI_1155,
    $and: andArray1155.length !== 0 ? andArray1155 : undefined,
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

  const _tokenId = tokenId ?? 1

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
    })) as BigInt

    _tokenId = Number(nextTokenId) - 1
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
  const quantityToMint = typeof amount === 'number' ? BigInt(amount) : BigInt(1)
  try {
    const client = createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })
    const fixedPriceSaleStratAddress = FIXED_PRICE_SALE_STRATS[chainId]
    const _tokenId = tokenId ?? 1

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

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] /// Supported tokens don't apply for the mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY as number[]
}
