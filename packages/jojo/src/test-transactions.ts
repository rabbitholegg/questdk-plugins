import { FUNDING_RATE_ARBITRAGE } from './contract-addresses'
import { GreaterThanOrEqual } from '@rabbitholegg/questdk'
import {
  Chains,
  type StakeActionParams,
  type TestParams,
  createTestCase,
} from '@rabbitholegg/questdk-plugin-utils'

export const STAKE_USDC: TestParams<StakeActionParams> = {
  transaction: {
    chainId: Chains.ARBITRUM_ONE,
    from: '0xc1b9ed1b89b09593d96259549e67e0769373f358',
    hash: '0x1f18aedac340f1087d089efdc875617ca2ee798db38bf88f1782a394a85d2e5b',
    input:
      '0xb6b55f2500000000000000000000000000000000000000000000000000000002540be400',
    to: FUNDING_RATE_ARBITRAGE,
    value: '0',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    contractAddress: FUNDING_RATE_ARBITRAGE,
    amountOne: '10000000000',
  },
}

export const passingStakeTestCases = [
  createTestCase(
    STAKE_USDC,
    'when staking usdc in the fundingRateArbitrage contract',
  ),
]

export const failingStakeTestCases = [
  createTestCase(STAKE_USDC, 'when the chainId is incorrect', {
    chainId: Chains.ETHEREUM,
  }),
  createTestCase(STAKE_USDC, 'when amountOne is incorrect', {
    amountOne: '1',
  }),
  createTestCase(STAKE_USDC, 'when amountOne is insufficient', {
    amountOne: GreaterThanOrEqual('4000000000000000000'),
  }),
]
