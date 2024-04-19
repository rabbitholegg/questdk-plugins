import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk'
import { describe, expect, test } from 'vitest'
import { getSupportedTokenAddresses, swap } from './Uniswap'
import { getAddress, type Address } from 'viem'
import {
  CHAIN_ID_ARRAY,
  EXECUTE_ABI_FRAGMENTS,
  V2_SWAP_EXACT_TYPES,
  V3_SWAP_EXACT_TYPES,
} from './constants'
import { failingTestCases, passingTestCases } from './test-transactions'

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
          to: '0xCb1355ff08Ab38bBCE60111F1bb2B784bE25D7e8',
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

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })

      test('when tokenIn is checksummed', async () => {
        const { transaction, params } = passingTestCases[1]
        const filter = await swap({
          ...params,
          tokenIn: getAddress(params.tokenIn as Address),
        })
        expect(apply(transaction, filter)).to.be.true
      })

      test('when tokenOut is checksummed', async () => {
        const { transaction, params } = passingTestCases[0]
        const filter = await swap({
          ...params,
          tokenOut: getAddress(params.tokenOut as Address),
        })
        expect(apply(transaction, filter)).to.be.true
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    describe('should return a valid list of tokens for each supported chain', () => {
      CHAIN_ID_ARRAY.forEach((chainId) => {
        test(`for chainId: ${chainId}`, async () => {
          const tokens = await getSupportedTokenAddresses(chainId)
          const addressRegex = /^0x[a-fA-F0-9]{40}$/
          expect(tokens).to.be.an('array')
          expect(tokens).to.have.length.lessThan(100)
          tokens.forEach((token) => {
            expect(token).to.match(
              addressRegex,
              `Token address ${token} is not a valid Ethereum address`,
            )
          })
        })
      })
    })
  })
})
