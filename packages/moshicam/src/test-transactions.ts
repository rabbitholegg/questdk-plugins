import {
  GreaterThanOrEqual,
  type MintActionParams,
} from '@rabbitholegg/questdk'
import {
  createTestCase,
  type TestParams,
  Chains,
} from '@rabbitholegg/questdk-plugin-utils'

export const COLLECT_FROM_USER_MOSHICAM: TestParams<MintActionParams> = {
  transaction: {
    chainId: Chains.BASE,
    from: '0xA064DB8fbFe520664442ee0E2650cc1C6c8f971e',
    hash: '0x619762bdbded2725b58d62a164e52aa7a340e5ca64e37a6b8aeea4b63e9ff877',
    input:
      '0xacc10f11000000000000000000000000c46dd4c165d174ab5ca96026f3fa59855e73bcca00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001',
    to: '0x704b204B48011b4B4554bf5659eFfeD1414CDa83',
    value: '0.0001 ether',
  },
  params: {
    chainId: Chains.BASE,
    contractAddress: '0x704b204B48011b4B4554bf5659eFfeD1414CDa83',
    amount: GreaterThanOrEqual(1),
    tokenId: 0,
  },
}

export const passingTestCases = [
  createTestCase(COLLECT_FROM_USER_MOSHICAM, 'when minted from user moshicam'),
]

export const failingTestCases = [
  createTestCase(COLLECT_FROM_USER_MOSHICAM, 'when chainId is not correct', {
    chainId: 99,
  }),
  createTestCase(COLLECT_FROM_USER_MOSHICAM, 'when amount is less than one', {
    amount: 0,
  }),
  createTestCase(
    COLLECT_FROM_USER_MOSHICAM,
    'when contractAddress does not match',
    {
      contractAddress: '0x0000000000000000000000000000000000000000',
    },
  ),
  createTestCase(COLLECT_FROM_USER_MOSHICAM, 'when tokenId does not match', {
    tokenId: '1337',
  }),
]
