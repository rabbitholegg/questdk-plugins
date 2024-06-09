import { CLAIM_1155_FRAGMENT, CLAIM_721_FRAGMENT } from './constants'
import { getAmount, getContractType } from './utils'
import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, recipient, amount } = mint

  const contractType = await getContractType(chainId, contractAddress)

  const Erc721Filter = {
    $abi: [CLAIM_721_FRAGMENT],
    _receiver: recipient,
    _quantity: getAmount(amount),
  }

  const Erc1155Filter = {
    $abi: [CLAIM_1155_FRAGMENT],
    _receiver: recipient,
    _quantity: getAmount(amount),
    _tokenId: tokenId,
  }

  return compressJson({
    chainId,
    to: contractAddress,
    input: contractType === '721' ? Erc721Filter : Erc1155Filter,
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [
    Chains.ETHEREUM,
    Chains.OPTIMISM,
    Chains.POLYGON_POS,
    Chains.BASE,
    Chains.ARBITRUM_ONE,
  ]
}
