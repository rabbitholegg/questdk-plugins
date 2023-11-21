import {  apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { DEFAULT_TOKEN_LIST } from './contract-addresses'
import { failingTestCases, passingTestCases } from './test-setup'
import { getAddress } from 'viem'

describe('Given the balancer plugin', () => {
  describe('When handling the bridge', () => {

    test('should return a valid action filter', () => {
      
    })

    test('should pass filter with valid transactions',  () => {
      
    })
    
    describe('should pass filter when all parameters are valid', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap({ ...params })
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })
    describe('should not pass filter when parameters are invalid', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap({ ...params })
          expect(apply(transaction, filter)).to.be.false
        })
      })
      test('should throw error when contract address is incorrect', async () => {
        try {
          const { transaction, params } = passingTestCases[0]
          params.contractAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
          const filter = await swap({ ...params })
          apply(transaction, filter)
          throw new Error('Expected bridge function to throw, but it did not.')
        } catch (err) {
          if (err instanceof Error) {
            expect(err.message).toBe('Invalid Contract Address')
          }
        }
      })
    })
    describe('all supported tokens addresses are properly checksummed', () => {
      test('should have all addresses properly checksummed', () => {
        const notChecksummed = DEFAULT_TOKEN_LIST.filter(
          (tokenAddress) => tokenAddress !== getAddress(tokenAddress),
        )
        expect(notChecksummed).to.be.empty
      })
    })

  })
})
