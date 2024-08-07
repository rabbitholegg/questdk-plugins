import {
  POD_MINT,
  MINT_REFERRAL,
  MINT_WITH_REWARDS_REFERRAL,
  ZERO_QUANTITY,
} from './test-transactions'
import { createTestCase } from '@rabbitholegg/questdk-plugin-utils'
import { getAddress, zeroAddress } from 'viem'

export const passingTestCases = [
  createTestCase(POD_MINT, 'when minting a podcast'),
  createTestCase(POD_MINT, 'when contractAddress is checksummed', {
    contractAddress: getAddress(POD_MINT.params.contractAddress),
  }),
  createTestCase(MINT_WITH_REWARDS_REFERRAL, 'when referral is correct'),
  createTestCase(MINT_REFERRAL, 'when referral is correct'),
  createTestCase(POD_MINT, 'using "any tokenId"', {
    tokenId: undefined,
    amount: undefined,
  }),
]

export const failingTestCases = [
  createTestCase(POD_MINT, 'when chainId is incorrect', {
    chainId: 1,
  }),
  createTestCase(POD_MINT, 'when contractAddress is incorrect', {
    contractAddress: '0x4f330940159fB3368F5b06b34212C0cDB4e2C032',
  }),
  createTestCase(POD_MINT, 'when recipient is incorrect', {
    recipient: '0xd31143Ca8503b25DdE780dc1B92E9aA61D0E326d',
  }),
  createTestCase(POD_MINT, 'when tokenId is incorrect', {
    tokenId: 1000,
  }),
  createTestCase(POD_MINT, 'when amount is incorrect', {
    amount: '72',
  }),
  createTestCase(ZERO_QUANTITY, 'when quantity minted is 0'),
  createTestCase(MINT_WITH_REWARDS_REFERRAL, 'when referral is incorrect', {
    referral: zeroAddress,
  }),
  createTestCase(MINT_REFERRAL, 'when referral is incorrect', {
    referral: zeroAddress,
  }),
]
