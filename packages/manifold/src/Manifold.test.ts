import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { passingTestCases, failingTestCases } from './test-transactions'
import { mint } from './Manifold'

describe('Given the manifold plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid mint action', async () => {
        const filter = await mint({
          chainId: 1,
          contractAddress: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
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
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
