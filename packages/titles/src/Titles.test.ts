import { create, mint } from './Titles'
import {
  failingTestCasesCreate,
  failingTestCasesMint,
  passingTestCasesCreate,
  passingTestCasesMint,
} from './test-transactions'
import { apply } from '@rabbitholegg/questdk'
import { describe, expect, test } from 'vitest'

describe('Given the titles plugin', () => {
  describe('When handling the create action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid create action', async () => {
        const filter = await create({
          chainId: 8453,
        })
        expect(filter).toBeTypeOf('object')
        expect(Number(filter.chainId)).toBe(8453)
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
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCasesCreate.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await create(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCasesCreate.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await create(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })

  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid mint action', async () => {
        const filter = await mint({
          chainId: 8453,
          contractAddress: '0x04e4d53374a5e6259ce06cfc6850a839bd960d01',
        })
        expect(filter).toBeTypeOf('object')
        expect(Number(filter.chainId)).toBe(8453)
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
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCasesMint.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCasesMint.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
