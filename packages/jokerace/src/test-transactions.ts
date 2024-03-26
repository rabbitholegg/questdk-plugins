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

export const FABRIC_MINTFOR: TestParams<MintActionParams> = {
  transaction: {
    chainId: 8453,
    from: '0x9ce405cf35064af63fe8d77cef084a4905469abe',
    hash: '0x5b48379058011a2fd5419b236019b37768ffc2333c03ab097dd6d7fab432c31e',
    input:
      '0xda1919b30000000000000000000000000c52af4921aaf20dcdfd2853e1e2f700f7a0c1910000000000000000000000000000000000000000000000000018838370f1c900',
    to: '0x3db5bc85fb89c59d7d03e1dda7ee4563f9c54270',
    value: '6899999999904000',
  },
  params: {
    chainId: 8453,
    contractAddress: '0x3db5bc85fb89c59d7d03e1dda7ee4563f9c54270',
    recipient: '0x0c52aF4921aAF20DcDFd2853E1e2F700F7A0C191',
  },
}

export const passingTestCases = [
  createTestCase(FABRIC_MINT, 'when minting a fabric subscription NFT'),
  createTestCase(FABRIC_MINTFOR, 'when gifting a fabric subscription NFT'),
]

export const failingTestCases = [
  createTestCase(FABRIC_MINT, 'when chainId is not correct', {
    chainId: 42161,
  }),
  createTestCase(FABRIC_MINT, 'when contractAddress is not correct', {
    contractAddress: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
  }),
  createTestCase(FABRIC_MINTFOR, 'when recipient is not correct', {
    recipient: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
  }),
]
