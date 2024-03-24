import { FABRIC_ABI } from './abi'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  ActionType,
  Chains,
  DEFAULT_ACCOUNT,
  type MintIntentParams,
  chainIdToViemChain,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address, type TransactionRequest, encodeFunctionData } from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, recipient } = mint
  return compressJson({
    chainId,
    to: contractAddress,
    input: {
      $abi: FABRIC_ABI,
      account: recipient,
    },
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint
  let data

  let fixedPriceSaleStratAddress = FIXED_PRICE_SALE_STRATS[chainId]

  try {
    console.log({ chainId, contractAddress, tokenId })
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
      [ZORA_DEPLOYER_ADDRESS],
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

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.OPTIMISM, Chains.BASE, Chains.ZORA]
}
