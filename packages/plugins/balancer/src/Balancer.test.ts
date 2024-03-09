import { apply, GreaterThanOrEqual } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { zeroAddress, parseEther, parseUnits } from 'viem'
import { swap, getSupportedTokenAddresses } from './Balancer'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { BALANCER_ABI } from './abi'
import { VAULT_CONTRACT, CHAIN_ID_ARRAY } from './constants'
import { failingTestCases, passingTestCases } from './test-transactions'

describe('Given the balancer plugin', () => {
  describe('When handling the swap action', () => {
    describe('should return a valid action filter', () => {
      test('when making a swap', async () => {
        const filter = await swap({
          chainId: Chains.POLYGON_POS,
          contractAddress: VAULT_CONTRACT,
          tokenIn: zeroAddress,
          tokenOut: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', // USDC.e
          amountIn: GreaterThanOrEqual(parseEther('3')),
          amountOut: GreaterThanOrEqual(parseUnits('2', 6)),
          recipient: '0xa99f898530df1514a566f1a6562d62809e99557d',
        })

        expect(filter).to.deep.equal({
          chainId: Chains.POLYGON_POS,
          to: VAULT_CONTRACT,
          input: {
            $abiAbstract: BALANCER_ABI,
            $or: [
              {
                singleSwap: {
                  assetIn: '0x0000000000000000000000000000000000000000',
                  assetOut: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
                  amount: {
                    $gte: '3000000000000000000',
                  },
                },
                funds: {
                  recipient: '0xa99f898530df1514a566f1a6562d62809e99557d',
                },
              },
              {
                assets: {
                  $and: [
                    {
                      $first: '0x0000000000000000000000000000000000000000',
                    },
                    {
                      $last: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
                    },
                  ],
                },
                limits: {
                  $and: [
                    {
                      $first: {
                        $gte: '3000000000000000000',
                      },
                    },
                    {
                      $last: {
                        $lte: '-2000000',
                      },
                    },
                  ],
                },
                funds: {
                  recipient: '0xa99f898530df1514a566f1a6562d62809e99557d',
                },
              },
            ],
          },
        })
      })
    })

    describe('should pass filter when all parameters are valid', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter when parameters are invalid', () => {
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
