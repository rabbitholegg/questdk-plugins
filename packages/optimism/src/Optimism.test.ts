import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Optimism.js'
import {
  l1StandardBridgeABI,
  l2StandardBridgeABI,
  addresses,
} from '@eth-optimism/contracts-ts'
import {
  DEPOSIT_ETH,
  DEPOSIT_TETHER,
  WITHDRAW_ETH,
  WITHDRAW_USDC,
} from './test-transactions.js'
import {
  ETH_TOKEN_ADDRESS,
  USDC_TOKEN_ADDRESS,
  TETHER_TOKEN_ADDRESS,
} from './token-addresses'
import { parseEther } from 'viem'

describe('Given the optimism plugin', () => {
  describe('When generating the filter', () => {
    test('should return a valid bridge action filter for L2 token tx', async () => {
      const filter = await bridge({
        sourceChainId: 10,
        destinationChainId: 1,
        tokenAddress: USDC_TOKEN_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
      })

      expect(filter).to.deep.equal({
        chainId: 10,
        to: addresses.L2StandardBridge[420],
        input: {
          $abi: l2StandardBridgeABI,
          _l2Token: USDC_TOKEN_ADDRESS,
          _amount: {
            $gte: '100000',
          },
        },
      })
    })

    test('should return a valid bridge action filter for L1 token tx', async () => {
      const filter = await bridge({
        sourceChainId: 1,
        destinationChainId: 10,
        tokenAddress: USDC_TOKEN_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
      })

      expect(filter).to.deep.equal({
        chainId: 1,
        to: addresses.L1StandardBridge[1],
        input: {
          $abi: l1StandardBridgeABI,
          _l1Token: USDC_TOKEN_ADDRESS,
          _amount: {
            $gte: '100000',
          },
        },
      })
    })

    test('should return a valid bridge action filter for L1 ETH tx', async () => {
      const filter = await bridge({
        sourceChainId: 1,
        destinationChainId: 10,
        tokenAddress: ETH_TOKEN_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
      })

      expect(filter).to.deep.equal({
        chainId: 1,
        to: addresses.L1StandardBridge[1],
        value: {
          $gte: '100000',
        },
        input: {
          $abi: l1StandardBridgeABI,
        },
      })
    })
  })
  describe('When applying the filter', () => {
    test('should pass filter with valid L1 ETH tx', async () => {
      const transaction = DEPOSIT_ETH
      const filter = await bridge({
        sourceChainId: 1,
        destinationChainId: 10, // Optimism
        tokenAddress: ETH_TOKEN_ADDRESS,
        amount: GreaterThanOrEqual(parseEther('.2')),
      })

      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L1 Token tx', async () => {
      const transaction = DEPOSIT_TETHER
      const filter = await bridge({
        sourceChainId: 1,
        destinationChainId: 10, // Optimism
        tokenAddress: TETHER_TOKEN_ADDRESS,
        amount: GreaterThanOrEqual('85000000'),
      })

      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 ETH tx', async () => {
      const transaction = WITHDRAW_ETH
      const filter = await bridge({
        sourceChainId: 10,
        destinationChainId: 1, // Optimism
        tokenAddress: ETH_TOKEN_ADDRESS,
        amount: GreaterThanOrEqual(parseEther('37')),
      })

      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 token tx', async () => {
      const transaction = WITHDRAW_USDC
      const filter = await bridge({
        sourceChainId: 10,
        destinationChainId: 1, // Optimism
        tokenAddress: USDC_TOKEN_ADDRESS,
        amount: GreaterThanOrEqual(10000000),
      })

      expect(apply(transaction, filter)).to.be.true
    })
  })

  test('should not pass filter with invalid transactions', () => {})
})
