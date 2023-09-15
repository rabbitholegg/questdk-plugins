import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Hop.js'
import { l1BridgeAbi, l2AmmWrapperAbi } from '@hop-protocol/core/abi'
import {
  DEPOSIT_ETH,
  DEPOSIT_ERC20,
  WITHDRAW_ETH,
  WITHDRAW_ERC20,
} from './test-transactions.js'
const ETH_CHAIN_ID = 1
const POLYGON_CHAIN_ID = 137
const BASE_CHAIN_ID = 8453
const OPTIMISM_CHAIN_ID = 10
const ARBITRUM_ONE_CHAIN_ID = 42161
export const ETH_ADRESS_MAINNET = '0x0000000000000000000000000000000000000000'
export const WETH_ADDRESS_POLYGON = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
export const USDC_ADDRESS_MAINNET = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
export const USDC_ADDRESS_POLYGON = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
export const HOP_ADDRESS_POLYGON = '0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC'

import { parseEther } from 'viem'
// Random ETHEREUM address
const TEST_USER = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'

describe('Given the hop plugin', () => {
  describe('When generating the filter', () => {
    test('should return a valid bridge action filter for L2 token tx', async () => {
      const USDC_POLYGON_AMM_ADDRESS =
        '0x76b22b8C1079A44F1211D867D68b1eda76a635A7'
      const filter = await bridge({
        sourceChainId: POLYGON_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: USDC_ADDRESS_POLYGON,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: POLYGON_CHAIN_ID,
        to: USDC_POLYGON_AMM_ADDRESS,
        input: {
          $abi: l2AmmWrapperAbi,
          chainId: ETH_CHAIN_ID,
          recipient: TEST_USER,
          amount: {
            $gte: '100000',
          },
        },
      })
    })

    test('should return a valid bridge action filter for L1 token tx', async () => {
      const USDC_MAINNET_BRIDGE_ADDRESS =
        '0x3666f603Cc164936C1b87e207F36BEBa4AC5f18a'
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: POLYGON_CHAIN_ID,
        tokenAddress: USDC_ADDRESS_MAINNET,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: ETH_CHAIN_ID,
        to: USDC_MAINNET_BRIDGE_ADDRESS,
        input: {
          $abi: l1BridgeAbi,
          chainId: POLYGON_CHAIN_ID,
          recipient: TEST_USER,
          amount: {
            $gte: '100000',
          },
        },
      })
    })

    test('should return a valid bridge action filter for L1 ETH tx', async () => {
      const ETH_MAINNET_BRIDGE_ADDRESS =
        '0xb8901acB165ed027E32754E0FFe830802919727f'
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: POLYGON_CHAIN_ID,
        tokenAddress: ETH_ADRESS_MAINNET,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: ETH_CHAIN_ID,
        to: ETH_MAINNET_BRIDGE_ADDRESS,
        input: {
          $abi: l1BridgeAbi,
          chainId: POLYGON_CHAIN_ID,
          recipient: TEST_USER,
          amount: {
            $gte: '100000',
          },
        },
      })
    })
  })
  describe('When applying the filter', () => {
    test('should pass filter with valid L1 ETH tx', async () => {
      const transaction = DEPOSIT_ETH
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: BASE_CHAIN_ID,
        tokenAddress: ETH_ADRESS_MAINNET,
        amount: GreaterThanOrEqual(parseEther('.6')),
        recipient: '0xf9F31dc3399032304c6bdf93f3e028F70edD22A6',
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L1 Token tx', async () => {
      const transaction = DEPOSIT_ERC20
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: OPTIMISM_CHAIN_ID,
        tokenAddress: USDC_ADDRESS_MAINNET,
        amount: GreaterThanOrEqual('240000000'), // $250 USDC,
        recipient: '0x1A929b5d550C45ca8A0cFDB82F7c9C15FC278f31',
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 ETH tx', async () => {
      const transaction = WITHDRAW_ETH
      const filter = await bridge({
        sourceChainId: POLYGON_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: WETH_ADDRESS_POLYGON,
        amount: GreaterThanOrEqual(parseEther('9')),
        recipient: '0x467B79AAfD7977F6d1E772e0b121047AC655C389',
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 token tx', async () => {
      const transaction = WITHDRAW_ERC20
      const filter = await bridge({
        sourceChainId: POLYGON_CHAIN_ID,
        destinationChainId: ARBITRUM_ONE_CHAIN_ID,
        tokenAddress: HOP_ADDRESS_POLYGON,
        amount: GreaterThanOrEqual(parseEther('4952')),
        recipient: '0x34327028C727613872cd80122B9a489a4B9C0bFA',
      })
      expect(apply(transaction, filter)).to.be.true
    })
  })

  test('should not pass filter with invalid transactions', () => {})
})
