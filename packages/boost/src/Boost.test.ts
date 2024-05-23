import { complete, mint } from './Boost'
import { BOOST_PASS_ABI } from './constants'
import {
  BOOST_PASS_MINT,
  failingTestCasesComplete,
  failingTestCasesMint,
  passingTestCasesComplete,
  passingTestCasesMint,
} from './test-transactions'
import { apply } from '@rabbitholegg/questdk'
import { describe, expect, test } from 'vitest'

describe('Given the boost plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      const { params } = BOOST_PASS_MINT
      test('when minting a boostpass', async () => {
        const filter = await mint(params)
        expect(filter).to.deep.equal({
          chainId: 11155111,
          to: '0x9a618d6302f27cdbb97206ce269a31c1f7da3913',
          input: {
            $abi: BOOST_PASS_ABI,
            data_: {
              $abiParams: ['address recipient', 'address referrer'],
              recipient: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
            },
          },
        })
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

  describe('When handling the complete action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid complete action', async () => {
        const filter = await complete({
          chainId: '0x1',
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
      passingTestCasesComplete.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await complete(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCasesComplete.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await complete(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
