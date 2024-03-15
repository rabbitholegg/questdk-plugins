import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { mint } from './ArtBlocks'
import {
  invalidTransactionCases,
  validTransactionTestCases,
} from './test-transactions'

describe('Given the ArtBlocks plugin', () => {
  describe('should pass filter with valid transactions', () => {
    validTransactionTestCases.forEach((tc) => {
      test(tc.description, async () => {
        const filter = await mint(tc.params)

        expect(apply(tc.transaction, filter)).to.be.true
      })
    })
  })

  describe('should not pass filter with invalid transactions', () => {
    invalidTransactionCases.forEach((tc) => {
      test(tc.description, async () => {
        const filter = await mint(tc.params)

        expect(apply(tc.transaction, filter)).to.be.false
      })
    })
  })
})
