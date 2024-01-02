import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { mint } from './Mirror'
import {
  passingTestCases,
  failingTestCases,
  OP_COLLECT_ENTRY,
} from './test-transactions'
import { COLLECT_ENTRY_ABI } from './abi'

describe('Given the mirror plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when collecting a mirror entry', async () => {
        const { params } = OP_COLLECT_ENTRY
        const filter = await mint(params)
        console.log(JSON.stringify(filter, null, 2))
        expect(filter).to.deep.equal({
          chainId: 10,
          to: '0x05b52003e4b3ce431f467de89a1d0b82b663fc6b',
          input: {
            $abi: COLLECT_ENTRY_ABI,
            tokenRecipient: '0x6e40dc97a419b42490923677bbc803e55338c26e',
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
