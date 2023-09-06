import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Across.js'
import {
  DEPOSIT_ETH,
  DEPOSIT_ERC20,
  WITHDRAW_ETH,
  WITHDRAW_ERC20,
} from './test-transactions.js'
import { ARBITRUM_CHAIN_ID, ETH_CHAIN_ID, POLYGON_CHAIN_ID, OPTIMISM_CHAIN_ID } from './chain-ids.js'
import {ACROSS_BRIDGE_ABI} from './abi.js'
import { parseEther } from 'viem'
import { CHAIN_TO_CONTRACT } from './chain-to-contract.js'

export const ETH_ADRESS_MAINNET = '0x0000000000000000000000000000000000000000'
export const WETH_ADDRESS_ARBITRUM = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
export const USDT_ADDRESS_ARBITRUM = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
export const USDT_ADDRESS_MAINNET = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

// Random ETHEREUM address
const TEST_USER = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'

// Replace *project* with the name of the project
describe('Given the Across plugin', () => {
  describe('When generating the filter', () => {
    test('should return a valid bridge action filter for L2 token tx', async () => {

      const filter = await bridge({
        sourceChainId: ARBITRUM_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: USDT_ADDRESS_ARBITRUM,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: ARBITRUM_CHAIN_ID,
        to: CHAIN_TO_CONTRACT[ARBITRUM_CHAIN_ID],
        input: {
          $abi: ACROSS_BRIDGE_ABI,
          recipient: TEST_USER,
          destinationChainId: ETH_CHAIN_ID,
          amount: {
            $gte: '100000',
          },
          originToken: USDT_ADDRESS_ARBITRUM,
        },
      })
    })

    test('should return a valid bridge action filter for L1 token tx', async () => {

      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARBITRUM_CHAIN_ID,
        tokenAddress: USDT_ADDRESS_MAINNET,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: ETH_CHAIN_ID,
        to: CHAIN_TO_CONTRACT[ETH_CHAIN_ID],
        input: {
          $abi: ACROSS_BRIDGE_ABI,
          recipient: TEST_USER,
          destinationChainId: ARBITRUM_CHAIN_ID,
          amount: {
            $gte: '100000',
          },
          originToken: USDT_ADDRESS_MAINNET,
        },
      })
    })

    test('should return a valid bridge action filter for L1 ETH tx', async () => {
      const ETH_MAINNET_BRIDGE_ADDRESS =
        '0xb8901acB165ed027E32754E0FFe830802919727f'
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARBITRUM_CHAIN_ID,
        tokenAddress: ETH_ADRESS_MAINNET,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: ETH_CHAIN_ID,
        to: CHAIN_TO_CONTRACT[ETH_CHAIN_ID],
        input: {
          $abi: ACROSS_BRIDGE_ABI,
          recipient: TEST_USER,
          destinationChainId: ARBITRUM_CHAIN_ID,
          amount: {
            $gte: '100000',
          },
          originToken: ETH_ADRESS_MAINNET,
        },
      })
    })
  })
  describe('When applying the filter', () => {
  })

  test('should not pass filter with invalid transactions', () => {})
})