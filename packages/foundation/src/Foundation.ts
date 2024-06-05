import {
  CHAIN_TO_CONTRACT_ADDRESS,
  DUTCH_AUCTION_FRAGMENT,
  FIXED_PRICE_FRAGMENTS,
  ZORA_DEPLOYER_ADDRESS,
} from './constants'
import { calculateFees, getDutchAuctionData, getFixedPriceData } from './utils'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  Chains,
  DEFAULT_ACCOUNT,
  type MintIntentParams,
  chainIdToViemChain,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  http,
  parseEther,
  zeroAddress,
} from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, amount, recipient } = mint

  const dropFactoryAddress = CHAIN_TO_CONTRACT_ADDRESS[chainId]

  return compressJson({
    chainId,
    to: dropFactoryAddress,
    input: {
      $abi: [...FIXED_PRICE_FRAGMENTS, DUTCH_AUCTION_FRAGMENT],
      count: amount ? { $gte: amount } : undefined,
      nftContract: contractAddress,
      nftRecipient: recipient,
    },
  })
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
  const { chainId, contractAddress, amount } = mint
  const quantityToMint =
    amount &&
    (typeof amount === 'number' ||
      typeof amount === 'bigint' ||
      typeof amount === 'string')
      ? BigInt(amount)
      : BigInt(1)

  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  }) as PublicClient
  const dropFactoryAddress = CHAIN_TO_CONTRACT_ADDRESS[chainId]

  try {
    const fixedPriceResult = await getFixedPriceData(
      client,
      dropFactoryAddress,
      contractAddress,
    )

    if (fixedPriceResult.seller === zeroAddress) {
      const dutchAuctionResult = await getDutchAuctionData(
        client,
        dropFactoryAddress,
        contractAddress,
      )
      return calculateFees(dutchAuctionResult, quantityToMint)
    }

    return calculateFees(fixedPriceResult, quantityToMint)
  } catch (error) {
    // return fallback if any errors occur
    return {
      actionFee: parseEther('0'),
      projectFee: parseEther('0.0008') * quantityToMint,
    }
  }
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  }) as PublicClient
  const dropFactoryAddress = CHAIN_TO_CONTRACT_ADDRESS[chainId]

  if (tokenId) {
    throw new Error('Token ID is not supported for Foundation Mints')
  }

  // check if the mint function is fixed or dutch auction type
  const { seller: fixedPriceSeller } = await getFixedPriceData(
    client,
    dropFactoryAddress,
    contractAddress,
  )
  if (fixedPriceSeller && fixedPriceSeller !== zeroAddress) {
    const mintArgs = [
      contractAddress,
      amount,
      recipient,
      ZORA_DEPLOYER_ADDRESS,
      [],
    ]

    const data = encodeFunctionData({
      abi: FIXED_PRICE_FRAGMENTS,
      functionName: 'mintFromFixedPriceSaleWithEarlyAccessAllowlistV2',
      args: mintArgs,
    })

    return {
      from: recipient,
      to: contractAddress,
      data,
    }
  }

  const { seller: dutchAuctionSeller } = await getDutchAuctionData(
    client,
    dropFactoryAddress,
    contractAddress,
  )
  if (dutchAuctionSeller && dutchAuctionSeller !== zeroAddress) {
    const mintArgs = [contractAddress, amount, recipient]

    const data = encodeFunctionData({
      abi: [DUTCH_AUCTION_FRAGMENT],
      functionName: 'mintFromDutchAuctionV2',
      args: mintArgs,
    })

    return {
      from: recipient,
      to: contractAddress,
      data,
    }
  }

  // if no results, throw an error
  throw new Error('Invalid mint arguments')
}

export const simulateMint = async (
  mint: MintIntentParams,
  value: bigint,
  account?: Address,
  client?: PublicClient,
): Promise<SimulateContractReturnType> => {
  const { chainId, contractAddress, amount, recipient, tokenId } = mint
  const _client =
    client ||
    (createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    }) as PublicClient)
  const dropFactoryAddress = CHAIN_TO_CONTRACT_ADDRESS[chainId]

  if (tokenId) {
    throw new Error('Token ID is not supported for Foundation Mints')
  }

  // check if the mint function is fixed type
  const { seller: fixedPriceSeller } = await getFixedPriceData(
    _client,
    dropFactoryAddress,
    contractAddress,
  )
  if (fixedPriceSeller && fixedPriceSeller !== zeroAddress) {
    const result = await _client.simulateContract({
      address: dropFactoryAddress,
      value,
      abi: FIXED_PRICE_FRAGMENTS,
      functionName: 'mintFromFixedPriceSaleWithEarlyAccessAllowlistV2',
      args: [
        contractAddress,
        amount ?? 1n,
        recipient,
        ZORA_DEPLOYER_ADDRESS,
        [],
      ],
      account: account || DEFAULT_ACCOUNT,
    })
    return result
  }

  // check if the mint function is dutch auction type
  const { seller: dutchAuctionSeller } = await getDutchAuctionData(
    _client,
    dropFactoryAddress,
    contractAddress,
  )
  if (dutchAuctionSeller && dutchAuctionSeller !== zeroAddress) {
    const result = await _client.simulateContract({
      address: dropFactoryAddress,
      value,
      abi: [DUTCH_AUCTION_FRAGMENT],
      functionName: 'mintFromDutchAuctionV2',
      args: [contractAddress, amount ?? 1n, recipient],
      account: account || DEFAULT_ACCOUNT,
    })
    return result
  }

  throw new Error('Invalid mint arguments')
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Not used for Mint Action
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.ETHEREUM, Chains.BASE]
}
