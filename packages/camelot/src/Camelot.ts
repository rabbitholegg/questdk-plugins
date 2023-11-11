import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address, getAddress } from 'viem'
import { CHAIN_ID_ARRAY, ARBITRUM_CHAIN_ID } from './chain-ids'
import { DEFAULT_TOKEN_LIST_URL } from './contract-addresses'
import { buildPathQuery, Tokens } from './utils'
import { CAMELOT_ABI, PARASWAP_ABI } from './abi'
import { CAMELOT_ROUTER, PARASWAP_ROUTER } from './contract-addresses'

const isValidContractAddress = (address: Address) => {
  return (
    address?.toLowerCase() === CAMELOT_ROUTER.toLowerCase() ||
    address?.toLowerCase() === PARASWAP_ROUTER.toLowerCase()
  )
}

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  const ethUsed = tokenIn === Tokens.ETH

  if (contractAddress && !isValidContractAddress(contractAddress)) {
    throw new Error('Invalid Contract Address')
  }

  return compressJson({
    chainId: chainId,
    to: { $or: [getAddress(CAMELOT_ROUTER), getAddress(PARASWAP_ROUTER)] },
    value: ethUsed ? amountIn : undefined,
    input: {
      $abi: [...CAMELOT_ABI, ...PARASWAP_ABI],
      $or: [
        {
          to: recipient,
          path: buildPathQuery(ethUsed ? Tokens.WETH : tokenIn, tokenOut),
          amountOutMin: amountOut,
          amountIn: ethUsed ? undefined : amountIn,
        },
        {
          data: {
            fromToken: tokenIn,
            fromAmount: amountIn,
            toToken: tokenOut,
            toAmount: amountOut,
            partner: '0x353D2d14Bb674892910685520Ac040f560CcBC06',
          },
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Only return supported tokens for ARBITRUM_CHAIN_ID
  return _chainId === ARBITRUM_CHAIN_ID ? DEFAULT_TOKEN_LIST_URL : []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
