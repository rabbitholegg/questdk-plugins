import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { zeroAddress, type Address } from 'viem'
import { ARBITRUM_ONE, SWAP_CONTRACTS, TOKEN_ADDRESSES } from './constants'
import {
  getParaSwapFilter,
  getV2RouterFilter,
  getHPSM2Filter,
  getHlpCurveV2Filter,
  getHlpBalancerFilter,
  getCurveV2FactoryFilter,
} from './input-filters'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const { tokenIn, amountIn, recipient } = swap
  return compressJson({
    chainId: ARBITRUM_ONE,
    value: tokenIn === zeroAddress ? amountIn : undefined,
    from: recipient,
    to: {
      $or: SWAP_CONTRACTS.map((address) => address.toLowerCase()),
    },
    input: {
      $or: [
        getParaSwapFilter(swap),
        getV2RouterFilter(swap),
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
