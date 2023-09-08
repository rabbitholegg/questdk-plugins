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
  OPTIMISM_LAYER_ZERO_CHAIN_ID,
  ETH_LAYER_ZERO_CHAIN_ID
} from './chain-ids.js'
import { STARGATE_BRIDGE_ABI } from './abi.js'
import { parseEther } from 'viem'
import { CHAIN_AND_POOL_TO_TOKEN_ADDRESS, CHAIN_ID_TO_ROUTER_ADDRESS, CHAIN_ID_TO_ETH_ROUTER_ADDRESS } from './contract-addresses.js'

const ARBITRUM_USDC_ADDRESS = '0x892785f33CdeE22A30AEF750F285E18c18040c3e'
const ETHEREUM_USDC_ADDRESS = '0xdf0770dF86a8034b3EFEf0A1Bb3c889B8332FF56'
const ETHEREUM_SGETH_ADDRESS = '0x101816545F6bd2b1076434B54383a1E633390A2E'
const TEST_TOKEN_ADDRESS = '0x38ea452219524bb87e18de1c24d3bb59510bd783'
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
        chainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        to: CHAIN_ID_TO_ROUTER_ADDRESS[ARBITRUM_LAYER_ZERO_CHAIN_ID],
        input: {
          $abi: STARGATE_BRIDGE_ABI,
          _srcPoolId: sourcePool,
          _amountLD: {
            $gte: '100000',
          },
          _toAddress: TEST_USER,
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
        chainId: ETH_LAYER_ZERO_CHAIN_ID,
        to: CHAIN_ID_TO_ROUTER_ADDRESS[ETH_LAYER_ZERO_CHAIN_ID],
        input: {
          $abi: STARGATE_BRIDGE_ABI,
          _srcPoolId: sourcePool,
          _amountLD: {
            $gte: '100000',
          },
          _toAddress: TEST_USER,
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
      const sourcePool = CHAIN_AND_POOL_TO_TOKEN_ADDRESS[ETH_LAYER_ZERO_CHAIN_ID][ETHEREUM_SGETH_ADDRESS];

      expect(filter).to.deep.equal({
        chainId: ETH_LAYER_ZERO_CHAIN_ID,
        to: CHAIN_ID_TO_ETH_ROUTER_ADDRESS[ETH_LAYER_ZERO_CHAIN_ID],
        input: {
          $abi: STARGATE_BRIDGE_ABI,
          _srcPoolId: sourcePool,
          _amountLD: {
            $gte: '100000',
          },
          _toAddress: TEST_USER,
          _dstChainId: ARBITRUM_LAYER_ZERO_CHAIN_ID,
        },
      })
    })
  })

  test('should not pass filter with invalid transactions', () => {})
})