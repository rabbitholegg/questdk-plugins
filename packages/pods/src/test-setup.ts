import {
  BASIC_PURCHASE,
  BATCH_MINT_ARB,
  MINT_BATCH_WITHOUT_FEES,
  MINT_WITH_REWARDS,
  MINT_WITH_REWARDS_1155,
} from './test-transactions'
import { createTestCase } from '@rabbitholegg/questdk-plugin-utils'
import { getAddress } from 'viem'

export const passingTestCases = [
  createTestCase(BASIC_PURCHASE, 'when doing a basic purchase'),
  createTestCase(MINT_WITH_REWARDS, 'Minting with rewards'),
  createTestCase(MINT_WITH_REWARDS_1155, 'Minting with rewards 1155'),
  createTestCase(MINT_BATCH_WITHOUT_FEES, 'When using the batch mint function'),
  createTestCase(BATCH_MINT_ARB, 'when using batch mint function on arbitrum'),
  createTestCase(MINT_WITH_REWARDS, 'when contractAddress is checksummed', {
    contractAddress: getAddress(MINT_WITH_REWARDS.params.contractAddress),
  }),
  createTestCase(MINT_BATCH_WITHOUT_FEES, 'using "any tokenId" on batchmint', {
    tokenId: undefined,
    amount: undefined,
  }),
  createTestCase(MINT_WITH_REWARDS, 'using "any tokenId" on single mint', {
    tokenId: undefined,
    amount: undefined,
  }),
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
  createTestCase(
    MINT_BATCH_WITHOUT_FEES,
    'when using batchMint and contractAddress is incorrect',
    {
      contractAddress: '0x4f330940159fB3368F5b06b34212C0cDB4e2C032',
    },
  ),
  createTestCase(
    MINT_BATCH_WITHOUT_FEES,
    'when using batchMint and tokenId is incorrect',
    {
      tokenId: 10,
    },
  ),
]
