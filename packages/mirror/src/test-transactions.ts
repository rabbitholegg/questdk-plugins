import type { MintActionParams } from '@rabbitholegg/questdk'
import { createTestCase, type TestParams, Chains } from './utils'

export const OP_COLLECT_ENTRY: TestParams<MintActionParams> = {
  transaction: {
    chainId: 10,
    from: '0x6e40dc97a419b42490923677bbc803e55338c26e',
    to: '0x05b52003e4b3ce431f467de89a1d0b82b663fc6b',
    hash: '0x5298ea426b854085b26e3625d3ba84e03420d554350c1f26da79178b8c2e9d3a',
    input:
      '0x434dcfba0000000000000000000000006e40dc97a419b42490923677bbc803e55338c26e000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    value: '690000000000000',
  },
  params: {
    chainId: Chains.OPTIMISM,
    contractAddress: '0x05b52003e4b3ce431f467de89a1d0b82b663fc6b',
    recipient: '0x6e40dc97a419b42490923677bbc803e55338c26e',
  },
}

export const passingTestCases = [
  createTestCase(
    OP_COLLECT_ENTRY,
    'when collecting a mirror entry on optimism',
  ),
]

export const failingTestCases = [
  createTestCase(OP_COLLECT_ENTRY, 'when the chainId is incorrect', {
    chainId: 42161,
  }),
  createTestCase(OP_COLLECT_ENTRY, 'when the contractAddress is incorrect', {
    contractAddress: '0x2ae28ce3c3997925403c0b3757ec4f4cf6b6cab4',
  }),
  createTestCase(OP_COLLECT_ENTRY, 'when the recipient is incorrect', {
    recipient: '0x1b4a302D15412655877d86ae82823D8F6d085ddD',
  }),
]
