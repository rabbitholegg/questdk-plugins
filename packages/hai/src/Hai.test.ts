import { getSupportedChainIds, getSupportedTokenAddresses, stake } from './Hai'
import { failingTestCases, passingTestCases } from './test-transactions'
import { apply } from '@rabbitholegg/questdk'
import { describe, expect, test } from 'vitest'

describe('Given the hai plugin', () => {
  describe('When handling the stake action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid stake action', async () => {
        const filter = await stake({
          chainId: 10,
          tokenOne: '0x4200000000000000000000000000000000000042',
        })
        expect(filter).toBeTypeOf('object')
        expect(Number(filter.chainId)).toBe(10)
        expect(filter.input).toBeTypeOf('object')
        expect(filter.input).toHaveProperty('_target')
        expect(filter.input).toHaveProperty('_data')
        expect(
          ['$abi', '$abiParams', '$abiAbstract', '$or', '$and'].some((prop) =>
            Object.hasOwnProperty.call(filter.input, prop),
          ),
        ).to.be.true
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await stake(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await stake(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    describe('should return a valid list of tokens for each supported chain', async () => {
      const chainIds = await getSupportedChainIds()
      chainIds.forEach((chainId) => {
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
