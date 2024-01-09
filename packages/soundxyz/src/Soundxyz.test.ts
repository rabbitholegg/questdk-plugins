import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { mint } from './Soundxyz'
import {
  passingTestCases,
  failingTestCases,
  OP_SUPERMINTER_V2,
} from './test-transactions'
import { Chains } from './utils'
import { SUPERMINTER, SUPERMINTER_V2, SUPERMINTER_ABI } from './constants'

describe('Given the soundxyz plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      const { params } = OP_SUPERMINTER_V2
      test('when minting a sound on the superminter contract', async () => {
        const filter = await mint(params)
        expect(filter).to.deep.equal({
          chainId: Chains.OPTIMISM,
          to: {
            $or: [SUPERMINTER.toLowerCase(), SUPERMINTER_V2.toLowerCase()],
          },
          input: {
            $abi: SUPERMINTER_ABI,
            p: {
              edition: params.contractAddress,
              quantity: {
                $gte: '1',
              },
              to: params.recipient,
            },
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { description, params, transaction } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { description, params, transaction } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
