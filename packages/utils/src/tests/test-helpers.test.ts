import { createTestCase, type TestParams } from '../'
import { describe, expect, test } from 'vitest'
import type { Address } from 'viem'
import type { SwapActionParams } from '../types'

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
