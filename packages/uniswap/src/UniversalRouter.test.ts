import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { swap } from './UniversalRouter.js'
import {
  V2_SWAP_EXACT_TYPES,
  V3_SWAP_EXACT_TYPES,
  EXECUTE_ABI_FRAGMENTS,
} from './constants.js'

describe('Given the uniswap plugin', () => {
  describe('When handling the swap', () => {
    describe('should return a valid action filter', () => {
      test('with a valid swap action', async () => {
        const filter = await swap({
          chainId: 10,
          tokenIn: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
          tokenOut: '0x4200000000000000000000000000000000000006',
          amountIn: GreaterThanOrEqual(100000n),
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
                          $regex: '^0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
                        },
                        {
                          $regex: '4200000000000000000000000000000000000006$',
                        },
                      ],
                    },
                    amountIn: {
                      $gte: '100000',
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
                          $first: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
                        },
                        {
                          $last: '0x4200000000000000000000000000000000000006',
                        },
                      ],
                    },
                    amountIn: {
                      $gte: '100000',
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
})
