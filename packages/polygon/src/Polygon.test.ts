import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Polygon.js'
import { POLYGON_CHAIN_ID, ETH_CHAIN_ID } from './chain-ids.js'
import { MAINNET_BRIDGE } from './contract-addresses.js'

import { POLYGON_BRIDGE_ABI_FUNCS } from './abi.js'
import {
  DEPOSIT_ETH,
  DEPOSIT_ERC20,
  WITHDRAW_ETH,
  WITHDRAW_ERC20,
} from './test-transactions.js'
import {
  ETH_ADDRESS_MAINNET,
  MATIC_ADDRESS_POLYGON,
  USDC_ADDRESS_MAINNET,
  USDC_ADDRESS_POLYGON,
  WETH_ADDRESS_POLYGON,
} from './supported-token-addresses.js'
import { parseEther } from 'viem'
// Random ETHEREUM address
const TEST_USER = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'

describe('Given the optimism plugin', () => {
  describe('When generating the filter', () => {
    test('should return a valid bridge action filter for L2 token tx', async () => {
      const filter = await bridge({
        sourceChainId: POLYGON_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: USDC_ADDRESS_POLYGON,
        amount: GreaterThanOrEqual(100000n),
      })

      expect(filter).to.deep.equal({
        chainId: POLYGON_CHAIN_ID,
        to: USDC_ADDRESS_POLYGON,
        input: {
          $abi: POLYGON_BRIDGE_ABI_FUNCS,
          amount: {
            $gte: '100000',
          },
        },
      })
    })

    test('should return a valid bridge action filter for L1 token tx', async () => {
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: POLYGON_CHAIN_ID,
        tokenAddress: USDC_ADDRESS_MAINNET,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: ETH_CHAIN_ID,
        to: MAINNET_BRIDGE,
        input: {
          $abi: POLYGON_BRIDGE_ABI_FUNCS,
          rootToken: USDC_ADDRESS_MAINNET,
          user: TEST_USER,
          depositData: {
            $gte: '100000',
          },
        },
      })
    })

    test('should return a valid bridge action filter for L1 ETH tx', async () => {
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: POLYGON_CHAIN_ID,
        tokenAddress: ETH_ADDRESS_MAINNET,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: ETH_CHAIN_ID,
        to: MAINNET_BRIDGE,
        value: {
          $gte: '100000',
        },
        input: {
          $abi: POLYGON_BRIDGE_ABI_FUNCS,
          user: TEST_USER,
        },
      })
    })
  })
  describe('When applying the filter', () => {
    test('should pass filter with valid L1 ETH tx', async () => {
      const transaction = DEPOSIT_ETH
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: POLYGON_CHAIN_ID,
        tokenAddress: ETH_ADDRESS_MAINNET,
        amount: GreaterThanOrEqual(parseEther('.04')),
        recipient: '0x72eaebda0182909c0db8be8c967f7be18bdfb04d',
      })

      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L1 Token tx', async () => {
      const transaction = DEPOSIT_ERC20
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: POLYGON_CHAIN_ID,
        tokenAddress: USDC_ADDRESS_MAINNET,
        amount: GreaterThanOrEqual('400000000'), // $400 USDC,
        recipient: '0xccab9d12c87437543936d986de870d7aa62f6212',
      })

      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 ETH tx', async () => {
      const transaction = WITHDRAW_ETH
      const filter = await bridge({
        sourceChainId: POLYGON_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: WETH_ADDRESS_POLYGON,
        amount: GreaterThanOrEqual(parseEther('14')),
      })

      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 token tx', async () => {
      const transaction = WITHDRAW_ERC20
      const filter = await bridge({
        sourceChainId: POLYGON_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: MATIC_ADDRESS_POLYGON,
        amount: GreaterThanOrEqual(parseEther('495000')),
      })

      expect(apply(transaction, filter)).to.be.true
    })
  })

  test('should not pass filter with invalid transactions', () => {})
})
