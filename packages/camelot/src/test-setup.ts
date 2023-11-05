import type { Address, Hash } from 'viem'
import type { ActionParams, SwapActionParams } from '@rabbitholegg/questdk'
import { GreaterThanOrEqual } from '@rabbitholegg/questdk'
import { parseEther, parseUnits } from 'viem'
import { ARBITRUM_CHAIN_ID } from './chain-ids'
import { CAMELOT_ROUTER, ETH_ADDRESS, WETH_ADDRESS } from './contract-addresses'

interface Transaction {
  chainId: number
  from: Address
  hash?: Hash
  input: string
  to: Address
  value: string
}

interface TestCase<T extends ActionParams> {
  transaction: Transaction
  params: T
  description: string
}

type TestParams<T extends ActionParams> = {
  transaction: Transaction
  params: T
}

/**
 * Creates a test case object for a given action and transaction.
 *
 * This function takes a `TestParams` object that includes both a `Transaction` and
 * `ActionParams`, a description of the test case, and an optional set of overrides
 * for the action parameters. It returns a `TestCase` object that contains the transaction,
 * the combined action parameters with any overrides applied, and the description.
 *
 * @param {TestParams<T>} testParams - An object containing the transaction and action parameters.
 * @param {string} description - A brief description of the test case.
 * @param {Partial<T>} [overrides] - Optional overrides for the action parameters.
 * @returns {TestCase<T>} A test case object with the transaction, params, and description.
 */
function createTestCase<T extends ActionParams>(
  testParams: TestParams<T>,
  description: string,
  overrides: Partial<T> = {},
): TestCase<T> {
  return {
    transaction: testParams.transaction,
    params: { ...testParams.params, ...overrides },
    description,
  }
}

export const SWAP_ETH: TestParams<SwapActionParams> = {
  transaction: {
    chainId: 42161,
    from: '0x2a73fa7bc21d580c01f9d983e37e15e777a73b0b',
    hash: '0x659233e044e47a604aebd6f8dc20c385a77ed62294d8724fc98850c8ec3d7d6e',
    input:
      '0xb4822be3000000000000000000000000000000000000000000000000822f628b80d92acf00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000002a73fa7bc21d580c01f9d983e37e15e777a73b0b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000065284bfa000000000000000000000000000000000000000000000000000000000000000200000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab1000000000000000000000000bfbcfe8873fe28dfa25f1099282b088d52bbad9c',
    to: '0xc873fecbd354f5a56e00e710b90ef4201db2448d',
    value: '550000000000000',
  },
  params: {
    chainId: ARBITRUM_CHAIN_ID,
    contractAddress: CAMELOT_ROUTER,
    tokenIn: ETH_ADDRESS,
    tokenOut: '0xBfbCFe8873fE28Dfa25f1099282b088D52bbAD9C',
    amountIn: GreaterThanOrEqual(parseEther('0.00055')),
    amountOut: GreaterThanOrEqual(parseUnits('9.25', 18)),
  },
}

export const SWAP_TOKENS: TestParams<SwapActionParams> = {
  transaction: {
    chainId: 42161,
    from: '0x1a185e25636306a13d3164a511f7c610f3930caa',
    hash: '0x44ccdf21a54f5b2ea92358fedf88da067d4b05a3f9546bfa1d3c02f006be7f13',
    input:
      '0xac3893ba000000000000000000000000000000000000000000000028cf73e0389658000000000000000000000000000000000000000000000000000000000000010cb66400000000000000000000000000000000000000000000000000000000000000c00000000000000000000000001a185e25636306a13d3164a511f7c610f3930caa0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006528487400000000000000000000000000000000000000000000000000000000000000020000000000000000000000005190f06eacefa2c552dc6bd5e763b81c73293293000000000000000000000000fd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    to: '0xc873fecbd354f5a56e00e710b90ef4201db2448d',
    value: '0',
  },
  params: {
    chainId: ARBITRUM_CHAIN_ID,
    tokenIn: '0x5190F06EaceFA2C552dc6BD5e763b81C73293293', // WOMBEX
    tokenOut: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // TETHER
    amountIn: GreaterThanOrEqual(parseUnits('750', 18)),
    amountOut: GreaterThanOrEqual(parseUnits('15', 6)),
    recipient: '0x1a185e25636306A13D3164a511F7C610F3930cAa',
  },
}

export const passingTestCases = [
  createTestCase(SWAP_ETH, 'when swapping ETH for tokens'),
  createTestCase(SWAP_TOKENS, 'when swapping tokens for tokens'),
]

export const failingTestCases = [
  createTestCase(SWAP_TOKENS, 'when chainId is incorrect', { chainId: 10 }),
  createTestCase(SWAP_ETH, 'when contractAddress is incorrect', {
    contractAddress: '0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57',
  }),
  createTestCase(SWAP_TOKENS, 'when tokenIn is incorrect', {
    tokenIn: WETH_ADDRESS,
  }),
  createTestCase(SWAP_TOKENS, 'when tokenOut is incorrect', {
    tokenOut: WETH_ADDRESS,
  }),
  createTestCase(SWAP_ETH, 'when amountIn is insufficient', {
    amountIn: GreaterThanOrEqual(parseEther('0.1')),
  }),
  createTestCase(SWAP_TOKENS, 'when amountOut is insufficient', {
    amountOut: GreaterThanOrEqual(parseUnits('20', 6)),
  }),
  createTestCase(SWAP_TOKENS, 'when recipient in incorrect', {
    recipient: '0x12e80D4b52023eDd8cB2294C6948D4c5d5D5D266',
  }),
]
