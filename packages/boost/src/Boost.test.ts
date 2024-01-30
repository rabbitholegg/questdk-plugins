import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { passingTestCases, failingTestCases } from './test-transactions'
import { BOOST_PASS_MINT } from './test-transactions'
import { mint } from './Boost'
import { BOOST_PASS_ABI } from './constants'

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
