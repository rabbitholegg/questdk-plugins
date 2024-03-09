import { getSupportedTokenAddresses, swap } from './Sushi'
import { PROCESS_ROUTE_ABI, ROUTER_ABI } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { CHAIN_TO_CONTRACTS } from './contract-addresses'
import { failingTestCases, passingTestCases } from './create-tests'
import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'

describe('Given the Sushi plugin', () => {
  describe('When handling the swap action', () => {
    describe('should return a valid action filter', () => {
      test('when doing a valid swap', async () => {
        const { params } = passingTestCases[0]
        const filter = await swap(params)
        expect(filter).to.deep.equal({
          chainId: 8453,
          to: {
            $or: CHAIN_TO_CONTRACTS[8453]?.map((token) => token.toLowerCase()),
          },
          value: {
            $gte: '2100000000000000000',
          },
          input: {
            $or: [
              {
                $abi: PROCESS_ROUTE_ABI,
                to: '0x96e0fd08cbcd2f8c9fa20557898464cb970c9a75',
                tokenIn: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                tokenOut: '0xf6e932ca12afa26665dc4dde7e27be02a7c02e50',
                amountIn: {
                  $gte: '2100000000000000000',
                },
                amountOutMin: {
                  $gte: '265021683000000000000000000',
                },
              },
              {
                $abi: ROUTER_ABI,
                $and: [
                  {
                    to: '0x96e0fd08cbcd2f8c9fa20557898464cb970c9a75',
                    path: {
                      $and: [
                        {
                          $last: '0xF6e932Ca12afa26665dC4dDE7e27be02A7c02e50',
                        },
                      ],
                    },
                  },
                  {
                    $or: [
                      {
                        amountOutMin: {
                          $gte: '265021683000000000000000000',
                        },
                      },
                      {
                        amountOut: {
                          $gte: '265021683000000000000000000',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
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
          expect(tokens).to.have.length.greaterThan(0)
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
