import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Symbiosis'
import {
  PASSING_TEST_TRANSACTIONS,
  FAILING_TEST_TRANSACTIONS,
} from './test-transactions'
import { metaBurnABI, metaRouteABI } from './abi'
import { ETH_CHAIN_ID, OPTIMISM_CHAIN_ID } from './constants'
import { symbiosis } from './symbiosis-sdk'

const TEST_USER = '0xB7e98B3F16CC915B9C7a321c1bd95fa406BDbabe'
const OPTIMISM_USDCe_ADDRESS = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607'

describe('Given the symbiosis plugin', () => {
  describe('When handling the bridge', () => {
    test('should return a valid action filter', async () => {
      const filter = await bridge({
        sourceChainId: OPTIMISM_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: OPTIMISM_USDCe_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: 10,
        to: symbiosis.metaRouter(10).address,
        input: {
          $abi: metaRouteABI,
          _metarouteTransaction: {
            approvedTokens: [OPTIMISM_USDCe_ADDRESS],
            amount: {
              $gte: '100000',
            },
            otherSideCalldata: {
              $abiAbstract: metaBurnABI,
              _metaBurnTransaction: {
                chainID: 1,
                chain2address: TEST_USER,
              },
            },
          },
        },
      })
    })
  })
  describe('should pass filter with valid transactions', () => {
    PASSING_TEST_TRANSACTIONS.forEach((testTransaction) => {
      test(testTransaction.description, async () => {
        const {
          transaction,
          destinationChainId,
          tokenAddress,
          amount,
          recipient,
        } = testTransaction

        const filter = await bridge({
          sourceChainId: transaction.chainId,
          destinationChainId,
          tokenAddress,
          amount: GreaterThanOrEqual(amount),
          recipient,
        })
        expect(apply(transaction, filter)).to.be.true
      })
    })
  })
  describe('should not pass filter with invalid parameters', () => {
    test('when sourceChainId is incorrect', async () => {
      const { transaction, tokenAddress, recipient } =
        FAILING_TEST_TRANSACTIONS[0]

      const filter = await bridge({
        sourceChainId: 1, // 42161
        destinationChainId: 5000,
        tokenAddress,
        amount: GreaterThanOrEqual(10000n),
        recipient,
      })
      expect(apply(transaction, filter)).to.be.false
    })
    test('when bridge contract address is incorrect', async () => {
      const { transaction, tokenAddress, recipient } =
        FAILING_TEST_TRANSACTIONS[0]

      const filter = await bridge({
        sourceChainId: 42161,
        destinationChainId: 5000,
        contractAddress: '0x1DCfbC3fA01b2a86bC3a3f43479cCe9E8D438Adc',
        tokenAddress,
        amount: GreaterThanOrEqual(10000n),
        recipient,
      })
      expect(apply(transaction, filter)).to.be.false
    })
    FAILING_TEST_TRANSACTIONS.forEach((testTransaction) => {
      test(testTransaction.description, async () => {
        const {
          transaction,
          destinationChainId,
          tokenAddress,
          amount,
          recipient,
        } = testTransaction

        const filter = await bridge({
          sourceChainId: transaction.chainId,
          destinationChainId,
          tokenAddress,
          amount: GreaterThanOrEqual(amount),
          recipient,
        })
        expect(apply(transaction, filter)).to.be.false
      })
    })
  })
})
