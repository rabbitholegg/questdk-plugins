import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Superbridge'
import { failingTestCases, passingTestCases } from './test-transactions'
import { apply } from '@rabbitholegg/questdk'
import { describe, expect, test } from 'vitest'

describe('Given the superbridge plugin', () => {
  describe('When handling the bridge action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid bridge action', async () => {
        const filter = await bridge({
          sourceChainId: 1,
          destinationChainId: 8453,
        })
        expect(filter).toBeTypeOf('object')
        expect(Number(filter.chainId)).toBe(1)
        if (typeof filter.to === 'string') {
          expect(filter.to).toMatch(/^0x[a-fA-F0-9]{40}$/)
        } else {
          // if to is an object, it should have a logical operator as the only key
          expect(filter.to).toBeTypeOf('object')
          expect(Object.keys(filter.to)).toHaveLength(1)
          expect(
            ['$or', '$and'].some((prop) =>
              Object.hasOwnProperty.call(filter.to, prop),
            ),
          ).to.be.true
          expect(Object.values(filter.to)[0]).to.satisfy((arr: string[]) =>
            arr.every((val) => val.match(/^0x[a-fA-F0-9]{40}$/)),
          )
        }
        // Check the input property is the correct type and has a valid filter operator
        expect(filter.input).toBeTypeOf('object')
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
          const filter = await bridge(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should either not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          try {
            const filter = await bridge(params)
            expect(apply(transaction, filter)).to.be.false
          } catch (error) {
            expect(error).to.be.an('error')
          }
        })
      })
    })

    describe('should return a valid list of tokens for each supported chain', async () => {
      const CHAIN_ID_ARRAY = await getSupportedChainIds()
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
