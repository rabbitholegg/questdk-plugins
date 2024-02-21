import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { mint } from './Basepaint'
import { CONTRACT_ADDRESS, MINT_ABI, TEST_TRANSACTIONS } from './constants'

describe('Given the basepaint plugin', () => {
  describe('When handling the mint filter', () => {
    test('should return a valid action filter', async () => {
      const filter = await mint({
        chainId: 8453,
        contractAddress: CONTRACT_ADDRESS,
        tokenId: 69,
        amount: GreaterThanOrEqual(1),
      })
      expect(filter).to.deep.equal({
        to: CONTRACT_ADDRESS,
        chainId: 8453,
        input: {
          $abi: MINT_ABI,
          day: 69,
          count: {
            $gte: '1',
          },
        },
      })
    })

    test('should pass filter with valid transactions', async () => {
      const transaction = TEST_TRANSACTIONS[0]
      const filter = await mint({
        chainId: 8453,
        contractAddress: CONTRACT_ADDRESS,
        tokenId: 52,
        amount: GreaterThanOrEqual(1),
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should fail filter with invalid tokenId', async () => {
      const transaction = TEST_TRANSACTIONS[1]
      const filter = await mint({
        chainId: 8453,
        contractAddress: CONTRACT_ADDRESS,
        tokenId: 52, // valid tokenId is 62
        amount: GreaterThanOrEqual(1),
      })
      expect(apply(transaction, filter)).to.be.false
    })

    test('should fail filter with invalid amount', async () => {
      const transaction = TEST_TRANSACTIONS[0]
      const filter = await mint({
        chainId: 8453,
        contractAddress: CONTRACT_ADDRESS,
        tokenId: 52,
        amount: GreaterThanOrEqual(2),
      })
      expect(apply(transaction, filter)).to.be.false
    })
  })
})
