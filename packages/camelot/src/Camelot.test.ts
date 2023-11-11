import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import {
  CAMELOT_ROUTER,
  DEFAULT_TOKEN_LIST_URL,
} from './contract-addresses'
import { ARBITRUM_CHAIN_ID } from './chain-ids'
import { parseEther, getAddress } from 'viem'
import { swap } from './Camelot'
import { Tokens } from './utils'
import { CAMELOT_ABI } from './abi'
import { failingTestCases, passingTestCases } from './test-setup'

describe('Given the camelot plugin', () => {
  describe('should return a valid action filter', () => {
    test('for a swap using ERC-20 token as tokenIn', async () => {
      const filter = await swap({
        chainId: ARBITRUM_CHAIN_ID,
        contractAddress: CAMELOT_ROUTER,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.WETH,
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
              { $first: Tokens.USDT },
              { $last: Tokens.WETH },
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
        tokenIn: Tokens.ETH,
        tokenOut: Tokens.USDT,
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
              { $first: Tokens.WETH },
              { $last: Tokens.USDT },
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
    test('should throw error when contract address is incorrect', async () => {
      try {
        const { transaction, params } = passingTestCases[0]
        params.contractAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
        const filter = await swap({ ...params })
        apply(transaction, filter)
        throw new Error('Expected bridge function to throw, but it did not.')
      } catch (err) {
        if (err instanceof Error) {
          // This is a type guard
          expect(err.message).toBe('Invalid Contract Address')
        }
      }
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

    test('should pass filter with valid simple transactions', async () => {
      const transaction = {
        blockHash:
          '0x9f24ea07061fd1ab781a276cf402dda373a7a8d332e2df42ef520cdeeb169222',
        blockNumber: '0x8732837',
        from: '0x6682cede4f8bd59adbb103392f2780e71013aeca',
        gas: '0x1f0eb8',
        gasPrice: '0x7270e00',
        maxFeePerGas: '0x7270e00',
        maxPriorityFeePerGas: '0x7270e00',
        hash: '0xa7ba51c4894a13985d330c6ab12e6577b9c8379670755d4cbad2283e4b6b3fa8',
        input:
          '0x54e3f31b000000000000000000000000000000000000000000000000000000000000002000000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab1000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000072f698f6219c0000000000000000000000000000000000000000000000000000726371cbf0cd000000000000000000000000000000000000000000000000000072f698f6219c00000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000065306bc9ba0efe86825b4ac1966a7d2ecc6136a600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab100000000000000000000000000000000000000000000000000000000000000242e1a7d4d000000000000000000000000000000000000000000000000000072f698f6219c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000240000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000006682cede4f8bd59adbb103392f2780e71013aeca000000000000000000000000216b4b4ba9f3e719726886d34a177484278bfcae000000000000000000000000000000000000000000000000000072f698f6219c0000000000000000000000000000000000000000000000000000000065340be3000000000000000000000000000000000000000000000000000000000000001b0c72bb1fd84199aaee3edb6f03022733efd0fdf014e65952af64d7f658e7ea3a411b51ae18b1400ed89ab4351e446f50c5d04c9f1c876c29b0c8f2930c3dd3c8',
        nonce: '0x2f0',
        to: '0xdef171fe48cf0115b1d80b88dc8eab59176fee57',
        transactionIndex: '0x1',
        value: '0x0',
        type: '0x2',
        accessList: [],
        chainId: '0xa4b1',
        v: '0x0',
        r: '0x5d4e3253823b5814e3abd28749a2620f57eb39412718b07d0d8620cb29dfe390',
        s: '0x3f5e2d828e47cb890c5411be1405b7586d23ed9da4c50b49d08e31a88362f3fa',
      }
      const filter = await swap({
        chainId: 42161,
        tokenIn: Tokens.USDT,
        tokenOut: Tokens.USDCE,
        amountIn: GreaterThanOrEqual(339000000),
      })
      expect(apply(transaction, filter)).to.be.true
    })
  })
})
