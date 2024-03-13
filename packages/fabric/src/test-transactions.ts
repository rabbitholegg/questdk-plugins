import { type MintActionParams } from '@rabbitholegg/questdk'
import {
  createTestCase,
  type TestParams,
} from '@rabbitholegg/questdk-plugin-utils'

export const FABRIC_MINT: TestParams<MintActionParams> = {
  transaction: {
    chainId: 8453,
    from: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    hash: '0xc0eaf3fa1e32bf3b32ff12e6f5d98b14b46865b62416237b7ed9bc898a5d7d93',
    input:
      '0xa0712d6800000000000000000000000000000000000000000000000000028fbee4d84c00',
    to: '0x2efc6064239121d1d7efb503355daa82b87ee89c',
    value: '720999999360000',
  },
  params: {
    chainId: 8453,
    contractAddress: '0x2efc6064239121d1d7efb503355daa82b87ee89c',
  },
}

export const passingTestCases = [
  createTestCase(FABRIC_MINT, 'when minting a fabric subscription NFT'),
]

export const failingTestCases = [
  createTestCase(FABRIC_MINT, 'when chainId is not correct', {
    chainId: 42161,
  }),
  createTestCase(FABRIC_MINT, 'when contractAddress is not correct', {
    contractAddress: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
  }),
]
