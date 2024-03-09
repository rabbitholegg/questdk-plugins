import type { ActionParams, FilterOperator } from '@rabbitholegg/questdk'
import { getAddress, type Address, type Hash } from 'viem'

interface Transaction {
  chainId: number
  from: Address
  hash?: Hash
  input: string
  to: Address
  value: string
}

export interface TestCase<T extends ActionParams> {
  transaction: Transaction
  params: T
  description: string
}

export type TestParams<T extends ActionParams> = {
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

export const buildV2PathQueryWithCase = (
  addressCase: 'lower' | 'checksum',
  tokenIn?: string,
  tokenOut?: string,
) => {
  // v2 paths are formatted as [<token>, <token>]
  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({
      $first:
        addressCase === 'lower' ? tokenIn.toLowerCase() : getAddress(tokenIn),
    })
  }

  if (tokenOut) {
    conditions.push({
      $last:
        addressCase === 'lower' ? tokenOut.toLowerCase() : getAddress(tokenOut),
    })
  }

  return {
    $and: conditions,
  }
}
