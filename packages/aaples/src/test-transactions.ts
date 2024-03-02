import { type BridgeActionParams } from '@rabbitholegg/questdk'
import {
  createTestCase,
  type TestParams,
} from '@rabbitholegg/questdk-plugin-utils'

// values are placeholders, replace with actual values from your test transaction
export const BRIDGE_TEST: TestParams<BridgeActionParams> = {
  transaction: {
    chainId: 1,
    from: '0x0',
    hash: '0x0',
    input: '0x0',
    to: '0x0',
    value: '0',
  },
  params: {
    sourceChainId: 0,
    destinationChainId: 0,
  },
}

export const passingTestCases = [
  createTestCase(BRIDGE_TEST, 'this is a demo test'),
]

export const failingTestCases = [
  createTestCase(BRIDGE_TEST, 'when sourceChainId is not correct', {
    sourceChainId: 99,
  }),
]
