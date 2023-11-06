import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import {
  CAMELOT_ROUTER,
  ETH_ADDRESS,
  DEFAULT_TOKEN_LIST_URL,
} from './contract-addresses'
import { ARBITRUM_CHAIN_ID } from './chain-ids'
import { parseEther, getAddress } from 'viem'
import { swap } from './Camelot'
import { CAMELOT_ABI } from './abi'
import { failingTestCases, passingTestCases } from './test-setup'

describe('Given the camelot plugin', () => {
  describe('should return a valid action filter', () => {
    test('for a swap using ERC-20 token as tokenIn', async () => {
      const filter = await swap({
        chainId: ARBITRUM_CHAIN_ID,
        contractAddress: CAMELOT_ROUTER,
        tokenIn: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        tokenOut: '0xBfbCFe8873fE28Dfa25f1099282b088D52bbAD9C',
        amountIn: GreaterThanOrEqual(1000000n),
        amountOut: GreaterThanOrEqual(parseEther('0.0005')),
      })

      expect(filter).to.deep.equal({
        chainId: 42161,
        to: '0xc873fEcbd354f5A56E00E710B90EF4201db2448d',
        input: {
          $abi: CAMELOT_ABI,
          path: {
            $and: [
              { $first: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9' },
              { $last: '0xBfbCFe8873fE28Dfa25f1099282b088D52bbAD9C' },
            ],
          },
          amountIn: { $gte: '1000000' },
          amountOutMin: { $gte: '500000000000000' },
        },
      })
    })
    test('for a swap using ETH as tokenIn', async () => {
      const filter = await swap({
        chainId: ARBITRUM_CHAIN_ID,
        contractAddress: CAMELOT_ROUTER,
        tokenIn: ETH_ADDRESS,
        tokenOut: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        amountIn: GreaterThanOrEqual(parseEther('0.5')),
        recipient: '0x67ef327038b25ff762a0606bc92c4a0a6e767048',
      })
      expect(filter).to.deep.equal({
        chainId: 42161,
        to: '0xc873fEcbd354f5A56E00E710B90EF4201db2448d',
        value: { $gte: '500000000000000000' },
        input: {
          $abi: CAMELOT_ABI,
          to: '0x67ef327038b25ff762a0606bc92c4a0a6e767048',
          path: {
            $and: [
              { $first: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1' },
              { $last: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9' },
            ],
          },
        },
      })
    })
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
  })
  describe('all supported tokens addresses are properly checksummed', () => {
    test('should have all addresses properly checksummed', () => {
      const notChecksummed = DEFAULT_TOKEN_LIST_URL.filter(
        (tokenAddress) => tokenAddress !== getAddress(tokenAddress),
      )

      if (notChecksummed.length > 0) {
        console.error(
          `The following addresses are not properly checksummed: ${notChecksummed.join(
            ', ',
          )}`,
        )
      }
      expect(notChecksummed).to.be.empty
    })
  })
})
