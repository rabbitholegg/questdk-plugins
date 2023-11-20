import { GreaterThanOrEqual } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { swap } from './UniversalRouter.js'
import {
  V2_SWAP_EXACT_TYPES,
  V3_SWAP_EXACT_TYPES,
  EXECUTE_ABI_FRAGMENTS,
} from './constants.js'

describe('UniversalRouter', () => {
  describe('swap', () => {
    test('should return a valid v3 swap action', async () => {
      const filter = await swap({
        chainId: 10,
        tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountOut: GreaterThanOrEqual(100000n),
      })

      expect(filter).to.deep.equal({
        chainId: 10,
        to: '0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4',
        input: {
          $abi: EXECUTE_ABI_FRAGMENTS,
          inputs: {
            $some: {
              $or: [
                {
                  $abiParams: V3_SWAP_EXACT_TYPES,
                  path: {
                    $and: [
                      {
                        $regex: 'C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2$',
                      },
                    ],
                  },
                  amountOut: {
                    $gte: '100000',
                  },
                },
                {
                  $abiParams: V2_SWAP_EXACT_TYPES,
                  path: {
                    $and: [
                      {
                        $last: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
                      },
                    ],
                  },
                  amountOut: {
                    $gte: '100000',
                  },
                },
              ],
            },
          },
        },
      })
    })
  })
})
