import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { CHAIN_ID_ARRAY, ARBITRUM_CHAIN_ID } from './chain-ids'
import {
  DEFAULT_TOKEN_LIST_URL,
} from './contract-addresses'
import { buildPathQuery, Tokens } from './utils'
import { CAMELOT_ABI, PARASWAP_ABI } from './abi'
import { CAMELOT_ROUTER, PARASWAP_ROUTER } from './contract-addresses'

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

  if (
    contractAddress &&
    ![CAMELOT_ROUTER.toLowerCase(), PARASWAP_ROUTER.toLowerCase()].includes(
      contractAddress?.toLowerCase() as Address,
    )
  ) {
    throw new Error('Invalid Contract Address')
  }

  return compressJson({
    chainId: chainId,
    to: { $or: [CAMELOT_ROUTER.toLowerCase(), PARASWAP_ROUTER.toLowerCase()] },
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
            partner: '0x353d2d14bb674892910685520ac040f560ccbc06',
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
