import { createTestCase } from './utils'
import {
  BASIC_PURCHASE,
} from './test-transactions'

export const passingTestCases = [
  createTestCase(BASIC_PURCHASE, 'when swapping tokens for tokens'),
]


export const failingTestCases = [
  createTestCase(BASIC_PURCHASE, 'when chainId is incorrect', {
    chainId: 1,
  }),

]
