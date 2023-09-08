import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Stargate.js'
import {
  DEPOSIT_ETH,
  DEPOSIT_ERC20,
  WITHDRAW_ETH,
  WITHDRAW_ERC20,
} from './test-transactions.js'
import {
  ARBITRUM_LAYER_ZERO_CHAIN_ID,
  POLYGON_LAYER_ZERO_CHAIN_ID,
  ETH_LAYER_ZERO_CHAIN_ID,
  OPTIMISM_LAYER_ZERO_CHAIN_ID,
  LAYER_ZERO_TO_LAYER_ONE_CHAIN_ID
} from './chain-ids.js'
import { STARGATE_BRIDGE_ABI } from './abi.js'
import { parseEther } from 'viem'
import { CHAIN_AND_POOL_TO_TOKEN_ADDRESS, CHAIN_ID_TO_ROUTER_ADDRESS, CHAIN_ID_TO_ETH_ROUTER_ADDRESS } from './contract-addresses.js'

const ARBITRUM_USDC_ADDRESS = '0x892785f33CdeE22A30AEF750F285E18c18040c3e'
const ARBITRUM_USDT_ADDRESS = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
const ETHEREUM_USDC_ADDRESS = '0xdf0770dF86a8034b3EFEf0A1Bb3c889B8332FF56'
const ETHEREUM_SGETH_ADDRESS = '0x101816545F6bd2b1076434B54383a1E633390A2E'
const ARBITRUM_SGETH_ADDRESS = '0x82CbeCF39bEe528B5476FE6d1550af59a9dB6Fc0'
const TEST_USER = '0x7c3bd1a09d7d86920451def20ae503322c8d0412'
// Replace *project* with the name of the project
describe('Given the Across plugin', () => {
  describe('When generating the filter', () => {
    test('should return a valid bridge action filter for L2 token tx', async () => {
      const filter = await bridge({
        sourceChainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        destinationChainId: ETH_LAYER_ZERO_CHAIN_ID,
        tokenAddress: ARBITRUM_USDC_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })
      const sourcePool = CHAIN_AND_POOL_TO_TOKEN_ADDRESS[ARBITRUM_LAYER_ZERO_CHAIN_ID][ARBITRUM_USDC_ADDRESS];

      expect(filter).to.deep.equal({
        chainId: LAYER_ZERO_TO_LAYER_ONE_CHAIN_ID[ARBITRUM_LAYER_ZERO_CHAIN_ID],
        to: CHAIN_ID_TO_ROUTER_ADDRESS[ARBITRUM_LAYER_ZERO_CHAIN_ID],
        input: {
          $abi: STARGATE_BRIDGE_ABI,
          _srcPoolId: sourcePool,
          _amountLD: {
            $gte: '100000',
          },
          _to: TEST_USER,
          _dstChainId: ETH_LAYER_ZERO_CHAIN_ID,
        },
      })
    })

    test('should return a valid bridge action filter for L1 token tx', async () => {
      const filter = await bridge({
        sourceChainId: ETH_LAYER_ZERO_CHAIN_ID,
        destinationChainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        tokenAddress: ETHEREUM_USDC_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })
      const sourcePool = CHAIN_AND_POOL_TO_TOKEN_ADDRESS[ETH_LAYER_ZERO_CHAIN_ID][ETHEREUM_USDC_ADDRESS];

      expect(filter).to.deep.equal({
        chainId: LAYER_ZERO_TO_LAYER_ONE_CHAIN_ID[ETH_LAYER_ZERO_CHAIN_ID],
        to: CHAIN_ID_TO_ROUTER_ADDRESS[ETH_LAYER_ZERO_CHAIN_ID],
        input: {
          $abi: STARGATE_BRIDGE_ABI,
          _srcPoolId: sourcePool,
          _amountLD: {
            $gte: '100000',
          },
          _to: TEST_USER,
          _dstChainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        },
      })
    })

    test('should return a valid bridge action filter for L1 ETH tx', async () => {
      const filter = await bridge({
        sourceChainId: ETH_LAYER_ZERO_CHAIN_ID,
        destinationChainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        tokenAddress: ETHEREUM_SGETH_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })
      expect(filter).to.deep.equal({
        chainId: LAYER_ZERO_TO_LAYER_ONE_CHAIN_ID[ETH_LAYER_ZERO_CHAIN_ID],
        to: CHAIN_ID_TO_ETH_ROUTER_ADDRESS[ETH_LAYER_ZERO_CHAIN_ID],
        input: {
          $abi: STARGATE_BRIDGE_ABI,
          _amountLD: {
            $gte: '100000',
          },
          _toAddress: TEST_USER,
          _dstChainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        },
      })
    })
  })
  describe('When applying the filter', () => {
    test('should pass filter with valid L1 ETH tx', async () => {
      const transaction = DEPOSIT_ETH
      const filter = await bridge({
        sourceChainId: ETH_LAYER_ZERO_CHAIN_ID,
        destinationChainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        tokenAddress: ETHEREUM_SGETH_ADDRESS,
        amount: GreaterThanOrEqual(parseEther('.04')),
        recipient: '0x7c3bd1a09d7d86920451def20ae503322c8d0412',
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 ETH tx', async () => {
      const transaction = WITHDRAW_ETH
      const filter = await bridge({
        sourceChainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        destinationChainId: OPTIMISM_LAYER_ZERO_CHAIN_ID,
        tokenAddress: ARBITRUM_SGETH_ADDRESS,
        amount: GreaterThanOrEqual(parseEther('.6')),
        recipient: '0x08bfa4ef61a457792c45240829529b43b019d941',
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L1 Token tx', async () => {
      const transaction = DEPOSIT_ERC20
      const filter = await bridge({
        sourceChainId: ETH_LAYER_ZERO_CHAIN_ID,
        destinationChainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        tokenAddress: ETHEREUM_USDC_ADDRESS,
        amount: GreaterThanOrEqual('48500000'), // $250 USDC,
        recipient: '0x0318ccfbfae5e2c06b2f533a35acecea13b9909f',
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 token tx', async () => {
      const transaction = WITHDRAW_ERC20
      const filter = await bridge({
        sourceChainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        destinationChainId: POLYGON_LAYER_ZERO_CHAIN_ID,
        tokenAddress: ARBITRUM_USDT_ADDRESS,
        amount: GreaterThanOrEqual('1200000000'),
        recipient: '0x5ee8496532d3dcb8bc726d66d8cb4c45d979e71d',
      })
      expect(apply(transaction, filter)).to.be.true
    })
  })

  test('should not pass filter with invalid transactions', () => {})
})