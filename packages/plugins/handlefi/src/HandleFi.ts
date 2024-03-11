import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { zeroAddress, type Address } from 'viem'
import {
  ARBITRUM_ONE,
  SWAP_CONTRACTS,
  TOKEN_ADDRESSES,
  PARASWAP_PARTNER,
} from './constants'
import {
  getParaSwapFilter,
  getV2RouterFilter,
  getRouterHpsmHlpFilter,
  getHPSM2Filter,
  getHlpCurveV2Filter,
  getHlpBalancerFilter,
  getCurveV2FactoryFilter,
} from './input-filters'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const { chainId, tokenIn, amountIn, recipient } = swap
  return compressJson({
    chainId,
    value: tokenIn === zeroAddress ? amountIn : undefined,
    from: recipient,
    to: {
      $or: SWAP_CONTRACTS.map((address) => address.toLowerCase()),
    },
    input: {
      $or: [
        getParaSwapFilter(swap, PARASWAP_PARTNER),
        getV2RouterFilter(swap),
        getRouterHpsmHlpFilter(swap),
        getHPSM2Filter(swap),
        getHlpCurveV2Filter(swap),
        getHlpBalancerFilter(swap),
        getCurveV2FactoryFilter(swap),
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return _chainId === ARBITRUM_ONE ? TOKEN_ADDRESSES : []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [ARBITRUM_ONE]
}
