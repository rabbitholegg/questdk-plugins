import { createTestCase } from './utils'
import {
  BASIC_PURCHASE,
  MINT_WITH_REWARDS,
  MINT_WITH_REWARDS_1155,
} from './test-transactions'

export const passingTestCases = [
  createTestCase(BASIC_PURCHASE, 'when doing a basic purchase'),
  createTestCase(MINT_WITH_REWARDS, 'Minting with rewards'),
  createTestCase(MINT_WITH_REWARDS_1155, 'Minting with rewards 1155'),
]

export const failingTestCases = [
  createTestCase(BASIC_PURCHASE, 'when chainId is incorrect', {
    chainId: 1,
  }),
  createTestCase(BASIC_PURCHASE, 'when contractAddress is incorrect', {
    contractAddress: '0x4f330940159fB3368F5b06b34212C0cDB4e2C032',
  }),
  createTestCase(BASIC_PURCHASE, 'when recipient is incorrect', {
    recipient: '0xd31143Ca8503b25DdE780dc1B92E9aA61D0E326d',
  }),
  createTestCase(MINT_WITH_REWARDS_1155, 'when tokenId is incorrect', {
    tokenId: 1,
  }),
  createTestCase(MINT_WITH_REWARDS_1155, 'when amount is incorrect', {
    amount: '72',
  }),
]
