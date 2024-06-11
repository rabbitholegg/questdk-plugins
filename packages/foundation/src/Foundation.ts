import {
  CHAIN_TO_CONTRACT_1155,
  CHAIN_TO_CONTRACT_ADDRESS,
  DUTCH_AUCTION_FRAGMENT,
  FIXED_PRICE_FRAGMENTS,
  MINT_FROM_1155,
  MINT_MULTI_TOKEN,
  NFT_MARKET_BASE,
  REFERRAL_ADDRESS,
} from './constants'
import {
  calculateFees,
  formatAmount,
  getContractType,
  getDutchAuctionData,
  getFixedPriceData,
  getFixedPriceSaleTerms,
  getMintAmount,
  getSaleTermsId,
} from './utils'
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
  const { chainId, contractAddress, amount, recipient, tokenId } = mint

  // 721
  const dropFactoryAddress = CHAIN_TO_CONTRACT_ADDRESS[chainId]

  // 1155
  const multiTokenAddress = CHAIN_TO_CONTRACT_1155[chainId]
  const saleTermsId = await getSaleTermsId(mint, multiTokenAddress)

  if (!dropFactoryAddress || !multiTokenAddress) {
    throw new Error('Invalid chainId')
  }

  const contracts = [dropFactoryAddress.toLowerCase(), multiTokenAddress.toLowerCase()]

  if (chainId === Chains.BASE) {
    contracts.push(NFT_MARKET_BASE.toLowerCase())
  }

  return compressJson({
    chainId,
    to: {
      $or: contracts,
    },
    input: {
      $or: [
        {
          // 721
          $abi: [...FIXED_PRICE_FRAGMENTS, DUTCH_AUCTION_FRAGMENT],
          count: formatAmount(amount),
          nftContract: contractAddress,
          nftRecipient: recipient,
        },
        {
          // 1155
          $abi: [MINT_FROM_1155],
          tokenRecipient: recipient,
          tokenQuantity: formatAmount(amount),
          saleTermsId,
        },
        {
          // 1155 NFTMarketRouter
          $abi: [MINT_MULTI_TOKEN],
          multiTokenCollection: contractAddress,
          tokenRecipient: recipient,
          tokenQuantities: {
            $some: { tokenId, quantity: formatAmount(amount) },
          },
        },
      ],
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

  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  }) as PublicClient

  const contractType = await getContractType(client, contractAddress)
  const quantityToMint = getMintAmount(amount)

  if (contractType === '721') {
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
    } catch (err) {
      console.error(err)
    }
  }

  if (contractType === '1155') {
    const multiTokenAddress = CHAIN_TO_CONTRACT_1155[chainId]
    try {
      const salesTermId = await getSaleTermsId(mint, multiTokenAddress)

      if (salesTermId == null) {
        throw new Error('Sale terms ID not found')
      }

      const saleTerms = await getFixedPriceSaleTerms(
        client,
        salesTermId,
        multiTokenAddress,
      )
      const actionFee = saleTerms.pricePerQuantity * quantityToMint
      const projectFee =
        (saleTerms.creatorRevenuePerQuantity +
          saleTerms.referrerRewardPerQuantity +
          saleTerms.worldCuratorRevenuePerQuantity +
          saleTerms.protocolFeePerQuantity) *
        quantityToMint
      return { actionFee, projectFee }
    } catch (err) {
      console.error(err)
    }
  }
  // return fallback if any errors occur
  return {
    actionFee: parseEther('0'),
    projectFee: parseEther('0.0008') * quantityToMint,
  }
}

// this function is deprecated
export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  }) as PublicClient

  const contractType = await getContractType(client, contractAddress)
  const mintAmount = getMintAmount(amount)

  if (contractType === '721') {
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
        mintAmount,
        recipient,
        REFERRAL_ADDRESS,
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
      const mintArgs = [contractAddress, mintAmount, recipient]

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
  }

  if (contractType === '1155') {
    const multiTokenAddress = CHAIN_TO_CONTRACT_1155[chainId]
    const salesTermId = await getSaleTermsId(mint, multiTokenAddress)

    if (salesTermId == null) {
      throw new Error('Sale terms ID not found')
    }

    const mintArgs = [salesTermId, mintAmount, recipient, REFERRAL_ADDRESS]

    const data = encodeFunctionData({
      abi: [MINT_FROM_1155],
      functionName: 'mintFromFixedPriceSale',
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

  const contractType = await getContractType(_client, contractAddress)

  const mintAmount = getMintAmount(amount)

  if (contractType === '721') {
    if (tokenId) {
      throw new Error('Token ID is not supported for Foundation Mints')
    }
    const dropFactoryAddress = CHAIN_TO_CONTRACT_ADDRESS[chainId]

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
        args: [contractAddress, mintAmount, recipient, REFERRAL_ADDRESS, []],
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
        args: [contractAddress, mintAmount, recipient],
        account: account || DEFAULT_ACCOUNT,
      })
      return result
    }

    throw new Error('Invalid mint arguments')
  }

  if (contractType === '1155') {
    if (tokenId == null) {
      throw new Error('Token ID is required for 1155 Mints')
    }
    const multiTokenAddress = CHAIN_TO_CONTRACT_1155[chainId]
    const salesTermId = await getSaleTermsId(mint, multiTokenAddress)

    if (salesTermId == null) {
      throw new Error('Sale terms ID not found')
    }

    const result = await _client.simulateContract({
      address: multiTokenAddress,
      value,
      abi: [MINT_FROM_1155],
      functionName: 'mintFromFixedPriceSale',
      args: [salesTermId, mintAmount, recipient, REFERRAL_ADDRESS],
      account: account || DEFAULT_ACCOUNT,
    })
    return result
  }

  throw new Error('Invalid contract type')
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
