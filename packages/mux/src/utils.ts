import type { ActionParams } from '@rabbitholegg/questdk'
import { TransactionEIP1559, type Address } from 'viem'

export enum Chains {
  ETHEREUM = 1,
  OPTIMISM = 10,
  BINANCE_SMART_CHAIN = 56,
  GNOSIS = 100,
  POLYGON_POS = 137,
  ZK_SYNC_ERA = 324,
  POLYGON_ZK = 1101,
  MANTLE = 5000,
  BASE = 8453,
  ARBITRUM_ONE = 42161,
  AVALANCHE = 43114,
  LINEA = 59144,
  SCROLL = 534352,
}

export interface TestCase<T extends ActionParams> {
  transaction: Partial<TransactionEIP1559>
  params: T
  description: string
}

export type TestParams<T extends ActionParams> = {
  transaction: Partial<TransactionEIP1559>
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
export function createTestCase<T extends ActionParams>(
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

export const buildPathQuery = (token?: Address) => {
  if (!token) return undefined
  return { $regex: `^${token.toLowerCase()}` }
}
