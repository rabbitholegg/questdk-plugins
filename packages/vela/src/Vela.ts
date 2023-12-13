import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
  type FilterOperator,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { TOKEN_TO_ID, VAULT_CONTRACT } from './contract-addresses'
import { VAULT_ABI } from './abi'

function getTokenPacked(token: Address | undefined): FilterOperator | undefined {
  if (!token) return undefined;
  const tokenPacked = TOKEN_TO_ID[token.toLowerCase()];
  if (!tokenPacked) {
    throw new Error('No tokenId found for the provided token address');
  }
  return tokenPacked;
}

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    amountIn,
    recipient,
  } = swap

  return compressJson({
    chainId,
    to: contractAddress ?? VAULT_CONTRACT,
    input: {
      $abi: VAULT_ABI,
      a: getTokenPacked(tokenIn)
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return []
}
