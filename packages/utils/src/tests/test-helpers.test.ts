import { Chains, createTestCase, getExitAddresses, type TestParams } from '../'
import { describe, expect, test } from 'vitest'
import type { Address } from 'viem'
import type { SwapActionParams } from '../types'
import { RELAYER_ADDRESSES } from '../constants/layer-zero-relayer-addresses'

describe('createTestCase', () => {
  test('should create a test case with the given parameters', () => {
    const testParams: TestParams<SwapActionParams> = {
      transaction: {
        chainId: 1,
        from: '0x0',
        input: 'input',
        to: '0x1',
        value: '1',
      },
      params: {
        chainId: 1,
        contractAddress: '0x2' as Address,
        tokenIn: '0x3' as Address,
        amountIn: '10',
      },
    }

    const description = 'Test case 1'
    const overrides: Partial<SwapActionParams> = { chainId: 3 }

    const testCase = createTestCase(testParams, description, overrides)

    expect(testCase).toEqual({
      transaction: testParams.transaction,
      params: { ...testParams.params, ...overrides },
      description,
    })
  })
})
describe('getExitAddresses', () => {
  test('should return the correct exit addresses', () => {
    const chainId = 7777777
    const additionalAddresses: Address[] = ['0x3', '0x4']

    const result = getExitAddresses(chainId, additionalAddresses)

    const expectedAddresses = [
      RELAYER_ADDRESSES[chainId],
      ...additionalAddresses,
    ].map((address) => (address ? address.toLowerCase() : ''))
    console.log(result)
    expect(result).toEqual({ $or: expectedAddresses })
  })

  test('should handle a single additional address as a string', () => {
    const chainId = Chains.BASE
    const additionalAddress: Address = '0x3'

    const result = getExitAddresses(chainId, additionalAddress)

    const expectedAddresses = [
      RELAYER_ADDRESSES[chainId],
      additionalAddress,
    ].map((address) => (address ? address.toLowerCase() : ''))

    expect(result).toEqual({ $or: expectedAddresses })
  })

  test('should handle no additional addresses', () => {
    const chainId = Chains.ARBITRUM_ONE

    const result = getExitAddresses(chainId)

    const expectedAddresses = [
      RELAYER_ADDRESSES[chainId as keyof typeof RELAYER_ADDRESSES],
    ].map((address) => (address ? address.toLowerCase() : ''))

    expect(result).toEqual({ $or: expectedAddresses })
  })
})
