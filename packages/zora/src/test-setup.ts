import {
  BATCH_MINT_ARB,
  CREATE_COLLECTION_BASE,
  CREATE_COLLECTION_ZORA,
  LAYER_ZERO_MINT,
  MINT,
  MINT_BATCH_WITHOUT_FEES,
  MINT_WITH_REWARDS,
  MINT_WITH_REWARDS_1155,
  ZERO_QUANTITY,
} from './test-transactions'
import { createTestCase } from '@rabbitholegg/questdk-plugin-utils'
import { getAddress } from 'viem'

export const passingTestCasesMint = [
  createTestCase(MINT_WITH_REWARDS, 'Minting with rewards'),
  createTestCase(MINT_WITH_REWARDS_1155, 'Minting with rewards 1155'),
  createTestCase(MINT_BATCH_WITHOUT_FEES, 'When using the batch mint function'),
  createTestCase(BATCH_MINT_ARB, 'when using batch mint function on optimism'),
  createTestCase(MINT, 'when using mint function'),
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
  createTestCase(LAYER_ZERO_MINT, 'using layer zero mint'),
]

export const failingTestCasesMint = [
  createTestCase(MINT_WITH_REWARDS, 'when chainId is incorrect', {
    chainId: 10,
  }),
  createTestCase(MINT_WITH_REWARDS, 'when contractAddress is incorrect', {
    contractAddress: '0x323c74b3dae9844c113d41e9c3db2743c500a26d',
  }),
  createTestCase(MINT_WITH_REWARDS, 'when recipient is incorrect', {
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
      contractAddress: '0xDEAD0940159fB3368F5b06b34212C0cDF4e2C032',
    },
  ),
  createTestCase(
    MINT_BATCH_WITHOUT_FEES,
    'when using batchMint and tokenId is incorrect',
    {
      tokenId: 10,
    },
  ),
  createTestCase(ZERO_QUANTITY, 'when quantity minted is 0'),
  createTestCase(MINT_WITH_REWARDS, 'when referral is incorrect', {
    referral: '0xDEAD0940159fB3368F5b06b34212C0cDF4e2C032',
  }),
  createTestCase(MINT, 'when referral is incorrect', {
    referral: '0xDEAD0940159fB3368F5b06b34212C0cDF4e2C032',
  }),
]

export const passingTestCasesCreate = [
  createTestCase(CREATE_COLLECTION_BASE, 'when creating a collection on BASE'),
  createTestCase(CREATE_COLLECTION_ZORA, 'when creating a collection on Zora'),
]

export const failingTestCasesCreate = [
  createTestCase(CREATE_COLLECTION_BASE, 'when chainId is incorrect', {
    chainId: 1,
  }),
  createTestCase(CREATE_COLLECTION_ZORA, 'when contractAddress is incorrect', {
    contractAddress: '0x4f330940159fB3368F5b06b34212C0cDB4e2C032',
  }),
]
