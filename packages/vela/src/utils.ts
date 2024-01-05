import type { ActionParams, FilterOperator } from '@rabbitholegg/questdk'
import type { Address, Hash } from 'viem'
import { TOKEN_TO_ID } from './contract-addresses'

export enum Chains {
  ARBITRUM_ONE = 42161,
  BASE = 8453,
}

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

type Amount = FilterOperator | BigInt | number | string | undefined

export function getTokenPacked(
  token: Address | undefined,
): FilterOperator | undefined {
  if (!token) return undefined
  const tokenPacked = TOKEN_TO_ID[token.toLowerCase()]
  if (!tokenPacked) {
    throw new Error('No tokenId found for the provided token address')
  }
  return tokenPacked
}

/**
 * This function repacks the given amount to match the format of the input data. Due to precision loss when packing the amount,
 * a range is added to the filter to account for this loss when using exact amounts.
 *
 * @param {Amount} amount - The amount to be converted. This can be a number or an object with a comparison operator.
 * @returns {FilterOperator | undefined} A filter operator object suitable for database queries or undefined if the input is invalid.
 */
export function getAmountPacked(amount: Amount): FilterOperator | undefined {
  if (amount === undefined) return undefined
  const multiplier = BigInt(2 ** 128) * BigInt(10 ** 12)

  if (typeof amount === 'object') {
    const [operator, value] = Object.entries(amount)[0]
    if (operator === '$lte' || operator === '$lt') {
      return (BigInt(value) + 1n) * multiplier
    }
    return { [operator]: BigInt(value) * multiplier }
  }
  // When the amount is an exact number, create a range to handle precision loss.
  // 10 ** 48 is arbitrary. It was chosen as it provides th right amount of presicion for the current use case. (18 decimal places)
  return {
    $and: [
      { $gte: BigInt(amount) * multiplier - BigInt(10 ** 48) },
      { $lt: BigInt(amount) * multiplier + BigInt(10 ** 48) },
    ],
  }
}
