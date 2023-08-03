import {
  V2_SWAP_EXACT_TYPES,
  V3_SWAP_EXACT_TYPES,
  swap,
} from './UniversalRouter.js'
import { GreaterThanOrEqual } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'

describe('UniversalRouter', () => {
  describe('swap', () => {
    const EXECUTE_ABI_FRAGMENTS = [
      {
        inputs: [
          { internalType: 'bytes', name: 'commands', type: 'bytes' },
          { internalType: 'bytes[]', name: 'inputs', type: 'bytes[]' },
        ],
        name: 'execute',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'bytes', name: 'commands', type: 'bytes' },
          { internalType: 'bytes[]', name: 'inputs', type: 'bytes[]' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        name: 'execute',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ]

    test('should return a valid v3 swap action', async () => {
      const filter = await swap({
        chainId: 10,
        tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountOut: GreaterThanOrEqual(100000n),
      })

      expect(filter).to.deep.equal({
        chainId: '0xa',
        to: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
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
