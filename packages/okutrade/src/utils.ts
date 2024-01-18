import type { ActionParams, FilterOperator } from '@rabbitholegg/questdk'
import { getAddress, type Address, type Hash } from 'viem'

export enum Chains {
  ETHEREUM = 1,
  OPTIMISM = 10,
  POLYGON = 137,
  ZKSYNC_ERA = 324,
  ARBITRUM = 42161,
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

export const buildV3PathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v3 paths are formatted as 0x<token><fee><token>

  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $regex: `^${tokenIn.toLowerCase()}` })
  }

  if (tokenOut) {
    // Chop the 0x prefix before comparing
    conditions.push({ $regex: `${tokenOut.toLowerCase().slice(2)}$` })
  }

  return {
    $and: conditions,
  }
}

export const buildV2PathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v2 paths are formatted as [<token>, <token>]
  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $first: getAddress(tokenIn) })
  }

  if (tokenOut) {
    conditions.push({ $last: getAddress(tokenOut) })
  }

  return {
    $and: conditions,
  }
}

const chainToContract: Record<number, Address> = {
  [Chains.ETHEREUM]: '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B',
  [Chains.OPTIMISM]: '0xb555edF5dcF85f42cEeF1f3630a52A108E55A654',
  [Chains.POLYGON]: '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5',
  [Chains.ZKSYNC_ERA]: '0x28731BCC616B5f51dD52CF2e4dF0E78dD1136C06',
  [Chains.ARBITRUM]: '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5',
  [Chains.BASE]: '0x198EF79F1F515F02dFE9e3115eD9fC07183f02fC',
}

const chainToWETH: Record<number, Address> = {
  [Chains.ETHEREUM]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [Chains.OPTIMISM]: '0x4200000000000000000000000000000000000006',
  [Chains.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  [Chains.POLYGON]: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  [Chains.ZKSYNC_ERA]: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
  [Chains.BASE]: '0x4200000000000000000000000000000000000006',
}

export function getUniversalRouter(chainId: number): Address {
  const address = chainToContract[chainId]
  if (!address) {
    throw new Error(`Contract address not found for chain ID ${chainId}`)
  }
  return address
}

export function getWETHAddress(chainId: number): Address {
  const address = chainToWETH[chainId]
  if (!address) {
    throw new Error(`WETH address not found for chain ID ${chainId}`)
  }
  return address
}
