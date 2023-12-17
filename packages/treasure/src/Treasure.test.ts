import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { getAddress } from 'viem'
import { Chains } from './utils'
import { swap, getSupportedTokenAddresses } from './Treasure'
import { passingTestCases, failingTestCases } from './test-transactions'
import { V2_ROUTER_ABI } from './abi'
import { MAGIC, ANIMA, V2_ROUTER } from './constants'

describe('Given the tresure plugin', () => {
  describe('When handling the swap action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid swap', async () => {
        const { params } = passingTestCases[0]
        const filter = await swap(params)
        expect(filter).to.deep.equal({
          chainId: 42161,
          to: V2_ROUTER,
          input: {
            $abi: V2_ROUTER_ABI,
            $and: [
              {
                to: '0x4c0ccf331fb23ca8bd5139b886cc821ede7b4204',
                path: {
                  $and: [
                    {
                      $first: getAddress(ANIMA),
                    },
                    {
                      $last: getAddress(MAGIC),
                    },
                  ],
                },
              },
              {
                $or: [
                  {
                    amountIn: {
                      $gte: '174560000000000000000',
                    },
                    amountOutMin: {
                      $gte: '24980000000000000000',
                    },
                  },
                  {
                    amountInMax: {
                      $gte: '174560000000000000000',
                    },
                    amountOut: {
                      $gte: '24980000000000000000',
                    },
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
      test(`for chainId: ${Chains.ARBITRUM_ONE}`, async () => {
        const tokens = await getSupportedTokenAddresses(Chains.ARBITRUM_ONE)
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
