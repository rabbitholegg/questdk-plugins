import { GreaterThanOrEqual } from '@rabbitholegg/questdk'
import { parseEther, parseUnits } from 'viem'
import { createTestCase } from './utils'
import {
  TRADE_VOLUME_FOR_ETH,
  TRADE_VOLUME_FOR_INJ,
  MINT_VLP,
  STAKE_VLP,
  STAKE_VELA
} from './test-transactions'

export const passingTestCasesV1 = [
  createTestCase(TRADE_VOLUME_FOR_ETH, 'when trading volume for ETH'),
  createTestCase(TRADE_VOLUME_FOR_INJ, 'when trading volume for INJ'),
  createTestCase(MINT_VLP, 'when minting vlp'),
  createTestCase(STAKE_VLP, 'when staking vlp'),
  createTestCase(STAKE_VELA, 'when staking vela'),
]

export const failingTestCasesV1 = [
  createTestCase(TRADE_VOLUME_FOR_ETH, 'when chainId is incorrect', {
    chainId: 10,
  }),
  createTestCase(TRADE_VOLUME_FOR_ETH, 'when packed_a is incorrect', {
    amountIn: GreaterThanOrEqual(parseEther('0.0193')),
  }),
  createTestCase(TRADE_VOLUME_FOR_ETH, 'when packed_b is incorrect', {
    amountOut: GreaterThanOrEqual(parseEther('0.0193')),
  }),
  createTestCase(TRADE_VOLUME_FOR_ETH, 'when packed_c is insufficient', {
    deadline: GreaterThanOrEqual(parseEther('0.0193')),
  }),
  createTestCase(MINT_VLP, 'when amountIn is insufficient', {
    amountIn: GreaterThanOrEqual(parseUnits('5001', 6)),
  }),
  createTestCase(STAKE_VLP, 'when amountOut is insufficient', {
    amountOne: GreaterThanOrEqual(parseEther('.58')),
  }),
  createTestCase(STAKE_VELA, 'when recipient is incorrect', {
    amountOne: '0x052c68abe8e4bf0b78925e488b98f6fdc18a3af9',
  }),
]