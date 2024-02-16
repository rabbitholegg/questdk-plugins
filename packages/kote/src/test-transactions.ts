import { type MintActionParams } from '@rabbitholegg/questdk'
import {
  createTestCase,
  type TestParams,
  Chains,
} from '@rabbitholegg/questdk-plugin-utils'
import { VILLAGER_MINT_ADDRESS } from './constants'

export const VILLAGER_MINT: TestParams<MintActionParams> = {
  transaction: {
    chainId: 42161,
    to: '0x292ff0f0c19373dd9c50fabba574aaaf6e1bc11b',
    from: '0xa2dcb5b3a784f4772687e21b9395d4fb0213b252',
    hash: '0x66386ca4c2833f2002612a612330aadebf3dd96dcdaa39445685ec0a2156675d',
    input: '0xb84c2e8d',
    value: '0',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    contractAddress: VILLAGER_MINT_ADDRESS,
    recipient: '0xa2dcb5b3a784f4772687e21b9395d4fb0213b252',
  },
}

export const passingTestCases = [
  createTestCase(VILLAGER_MINT, 'when minting villagers'),
]

export const failingTestCases = [
  createTestCase(VILLAGER_MINT, 'when chainId is not correct', {
    chainId: Chains.OPTIMISM,
  }),
  createTestCase(VILLAGER_MINT, 'when recipient is not correct', {
    recipient: '0x0487bc0f676433e1e245450a94ce1052758bd182',
  }),
  createTestCase(VILLAGER_MINT, 'when contract is not correct', {
    recipient: '0x0487bc0f676433e1e245450a94ce1052758bd182',
  }),
]
