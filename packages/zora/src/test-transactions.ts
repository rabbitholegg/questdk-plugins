import {
  type MintActionParams,
} from '@rabbitholegg/questdk'
import { type TestParams } from './utils'
import { Chains } from './utils'
import type { Address } from 'viem'

export const BASIC_PURCHASE: TestParams<MintActionParams> = {
  transaction: {
    chainId: 10, // Optimism
    from: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
    hash: '0xa7b4e4b5b9686d53fc4907c01cdf654beca5a823017ec5ee3f2a775abbe0fd38',
    input:
      '0x3a1b1d57000000000000000000000000628d4c61d81ac4f286b1778a063ed2f8810bc36700000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000',
    to: '0xfff631ef40557f8705e89053af794a1dcfa0a90b',
    value: '7700000000000000', // 0.0077 ETH
  },
  params: {
    chainId: Chains.OPTIMISM,
    contractAddress: '0xfff631ef40557f8705e89053af794a1dcfa0a90b',
    recipient: '0x628D4C61d81Ac4F286B1778a063ED2F8810Bc367'.toLowerCase() as Address,
  },
}
