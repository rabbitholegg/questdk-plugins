import { type MintActionParams } from '@rabbitholegg/questdk'
import {
  type TestParams,
  createTestCase,
} from '@rabbitholegg/questdk-plugin-utils'

export const MINT_REFERRER: TestParams<MintActionParams> = {
  transaction: {
    chainId: 8453,
    from: '0xf7937f825a2aecdcb962925f12b64943d0b2496a',
    hash: '0x7946162535d790e488d0168fd89c68d526cfde6c8cf26a01fbcc4e2c78c3040c',
    input:
      '0x13c84557000000000000000000000000f7937f825a2aecdcb962925f12b64943d0b2496a0000000000000000000000000000000000000000000000000000000000000000',
    to: '0x23d87d8c9704b8bcdbac042b9a59a142f0f10298',
    value: '777000000000000',
  },
  params: {
    chainId: 8453,
    contractAddress: '0x23d87d8c9704b8bcdbac042b9a59a142f0f10298',
    recipient: '0xf7937f825a2aecdcb962925f12b64943d0b2496a',
  },
}

export const passingTestCases = [
  createTestCase(MINT_REFERRER, 'when using mintWithReferrer'),
  createTestCase(MINT_REFERRER, 'when recipient is "any"', {
    recipient: undefined,
  }),
]

export const failingTestCases = [
  createTestCase(MINT_REFERRER, 'when chainId is not correct', {
    chainId: 42161,
  }),
  createTestCase(MINT_REFERRER, 'when contractAddress is not correct', {
    contractAddress: '0x54a57e8cee1c443d3090f901e85741e4e3cadba1',
  }),
  createTestCase(MINT_REFERRER, 'when recipient is not correct', {
    recipient: '0x54a57e8cee1c443d3090f901e85741e4e3cadba1',
  }),
]
