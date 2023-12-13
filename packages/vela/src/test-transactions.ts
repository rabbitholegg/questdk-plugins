import {
  type SwapActionParams,
  GreaterThanOrEqual,
} from '@rabbitholegg/questdk'
import { parseUnits } from 'viem'
import { type TestParams, createTestCase, Chains } from './utils'

const ARB_NEW_POSITION: TestParams<SwapActionParams> = {
  transaction: {
    chainId: 42161,
    to: '0xc4abade3a15064f9e3596943c699032748b13352',
    from: '0xa99f898530df1514a566f1a6562d62809e99557d',
    input:
      '0xdf33dc1600078000000000000000000000000000000000000000000000000000000000000000000eb54e87e885085e71a9fa3fc5000000000000000000000000000000fa0000011436ebb5ae615652af8200000000000aca253518cfcd5f3adb14000000',
    value: '250000000000000',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    tokenIn: '0x912CE59144191C1204E64559FE8253a0e49E6548', // ARB (7)
    amountIn: GreaterThanOrEqual(parseUnits('21.88', 18)),
    recipient: '0xa99f898530df1514a566f1a6562d62809e99557d',
  },
}

export const passingTestCases = [
  createTestCase(ARB_NEW_POSITION, 'when opening a new position'),
]

export const failingTestCases = [
  createTestCase(ARB_NEW_POSITION, 'when chainId is not correct', {
    chainId: 10,
  }),
  createTestCase(ARB_NEW_POSITION, 'when tokenIn is not correct', {
    tokenIn: '0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978',
  }),
  createTestCase(ARB_NEW_POSITION, 'when amountIn is not sufficient', {
    amountIn: GreaterThanOrEqual(parseUnits('1000', 18)),
  }),
  createTestCase(ARB_NEW_POSITION, 'when recipient is not correct', {
    recipient: '0x512daa85f8d2c863d0cfc8f65ab7842629d409f6',
  }),
]
