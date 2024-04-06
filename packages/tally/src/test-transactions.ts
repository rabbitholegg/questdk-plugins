import { type DelegateActionParams } from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import {
  type TestParams,
  createTestCase,
} from '@rabbitholegg/questdk-plugin-utils'

// https://arbiscan.io/tx/0xb8f32ab6848dce8847782499c1558f5af834f855811746fdbc3ec6fefda0bb24
export const ARBITRUM_TEST: TestParams<DelegateActionParams> = {
  transaction: {
    chainId: Chains.ARBITRUM_ONE,
    from: '0x3f9e3fbbbe967481222ddaa98e84470d7099381f',
    to: '0x912ce59144191c1204e64559fe8253a0e49e6548',
    hash: '0xb8f32ab6848dce8847782499c1558f5af834f855811746fdbc3ec6fefda0bb24',
    input:
      '0x5c19a95c0000000000000000000000003f9e3fbbbe967481222ddaa98e84470d7099381f',
    value: '0',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    project: '0x912ce59144191c1204e64559fe8253a0e49e6548',
    delegate: '0x3F9e3FBbBE967481222Ddaa98e84470D7099381f',
  },
}

// https://optimistic.etherscan.io/tx/0x7294ebf0a19667d9ca028a962112d858e0efaccdd3dc3effc7f4e12493af24b2
export const OPTIMISM_TEST: TestParams<DelegateActionParams> = {
  transaction: {
    chainId: Chains.OPTIMISM,
    from: '0xa99f898530df1514a566f1a6562d62809e99557d',
    to: '0x4200000000000000000000000000000000000042',
    hash: '0x7294ebf0a19667d9ca028a962112d858e0efaccdd3dc3effc7f4e12493af24b2',
    input:
      '0x5c19a95c0000000000000000000000003eee61b92c36e97be6319bf9096a1ac3c04a1466',
    value: '0',
  },
  params: {
    chainId: Chains.OPTIMISM,
    project: '0x4200000000000000000000000000000000000042',
    delegate: '0x3EEe61B92C36e97Be6319BF9096A1ac3c04a1466',
  },
}

export const passingTestCases = [
  createTestCase(
    ARBITRUM_TEST,
    'Arbitrum: should pass filter with valid transactions',
  ),
  createTestCase(
    OPTIMISM_TEST,
    'Optimism: should pass filter with valid transactions',
  ),
]

export const failingTestCases = [
  createTestCase(ARBITRUM_TEST, 'Arbitrum: when project is not correct', {
    project: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
  }),
  createTestCase(ARBITRUM_TEST, 'Arbitrum: when chainId is not correct', {
    chainId: 99,
  }),
]
