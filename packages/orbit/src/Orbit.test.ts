import { apply } from '@rabbitholegg/questdk/filter'
import { afterAll, describe, expect, test, vi } from 'vitest'
import { passingTestCases, failingTestCases } from './test-transactions'
import { stake } from './Orbit'

// Mock the current date
const fixedTimestamp = new Date('2024-04-09T02:00:00Z').getTime()
vi.useFakeTimers().setSystemTime(fixedTimestamp)

describe('Given the orbit plugin', () => {
  describe('When handling the stake action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid stake action', async () => {
        const filter = await stake({
          chainId: 1,
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
  })

  afterAll(() => {
    // Reset the system time to real time after the tests
    vi.useRealTimers()
  })
})
