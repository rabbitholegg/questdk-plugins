import { ONE_DAY } from './constants'
import {
  GreaterThanOrEqual,
  type StakeActionParams,
} from '@rabbitholegg/questdk'
import {
  type TestParams,
  createTestCase,
} from '@rabbitholegg/questdk-plugin-utils'
import { parseUnits } from 'viem'

export const STAKE_ORBIT: TestParams<StakeActionParams> = {
  transaction: {
    chainId: 81457,
    from: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    hash: '0x9e4dadb4b8be32aa979367940a0316a0270aea5988853d26124568ac0a092fd8',
    input:
      '0x65fc3873000000000000000000000000000000000000000000000000cd87b0888389000000000000000000000000000000000000000000000000000000000000661f3b2f',
    to: '0xfa1fdcf4682b72e56e3b32ff1aba7afcd5e1c7a8',
    value: '0',
  },
  params: {
    chainId: 81457,
    tokenOne: '0x42e12d42b3d6c4a74a88a61063856756ea2db357', // ORBIT
    amountOne: GreaterThanOrEqual(parseUnits('14.8', 18)),
  },
}

export const passingTestCases = [
  createTestCase(STAKE_ORBIT, 'when staking ORBIT'),
  createTestCase(STAKE_ORBIT, 'when tokenOne is "any"', {
    tokenOne: undefined,
  }),
  createTestCase(STAKE_ORBIT, 'when amountOne is "any"', {
    amountOne: undefined,
  }),
  createTestCase(STAKE_ORBIT, 'when both tokenOne and amountOne are "any"', {
    tokenOne: undefined,
    amountOne: undefined,
  }),
  createTestCase(STAKE_ORBIT, 'when duration is greater than 1 week', {
    duration: GreaterThanOrEqual(ONE_DAY * 7n),
  }),
]

export const failingTestCases = [
  createTestCase(STAKE_ORBIT, 'when chainId is not correct', { chainId: 10 }),
  createTestCase(STAKE_ORBIT, 'when amountOne is insufficient', {
    amountOne: GreaterThanOrEqual(parseUnits('1000', 18)),
  }),
  createTestCase(STAKE_ORBIT, 'when duration is insufficient', {
    duration: GreaterThanOrEqual(ONE_DAY * 30n),
  }),
]
