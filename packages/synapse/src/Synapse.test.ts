import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Synapse.js'
import {
  DEPOSIT_ETH,
  WITHDRAW_ERC20, 
  WITHDRAW_ETH, 
  DEPOSIT_ERC20

} from './test-transactions.js'
import {
  ARBITRUM_CHAIN_ID,
  ETH_CHAIN_ID,
} from './chain-ids.js'
import { SYNAPSE_BRIDGE_FRAGMENTS } from './abi.js'
import { parseEther } from 'viem'
import { SynapseContract, SynapseCCTPContract, getContractAddress } from './contract-addresses'


const ARBITRUM_USDCE_ADDRESS = '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
const ARBITRUM_USDC_ADDRESS = '0xaf88d065e77c8cc2239327c5edb3a432268e5831'
const ETHEREUM_USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

// A random Ethereum Address
const TEST_USER = '0xF57D86F6bFcc76AA2C7f62616B2436C60Ad397e2'

describe('When given the Synapse plugin', () => {
  describe('When generating the filter', () => {

    test('Should return a valid bridge action filter for L2 token tx', async () => {
      const filter = await bridge({
        sourceChainId: ARBITRUM_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: ARBITRUM_USDCE_ADDRESS, 
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER
      })

      expect(filter).to.deep.equal({
        chainId: ARBITRUM_CHAIN_ID, 
        to: SynapseContract[ARBITRUM_CHAIN_ID], 
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          to: TEST_USER,
          amount: {
            $gte: '100000'
          },
          chainId: ETH_CHAIN_ID,
          token: ARBITRUM_USDCE_ADDRESS,
        },
      })
    })
    test('Should return a valid transaction for a L1 -> L2 transaction (Non CCTP)'), async () => {
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARBITRUM_CHAIN_ID,
        tokenAddress: ETHEREUM_USDC_ADDRESS, 
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER
      })

      expect(filter).to.deep.equal({
        chainId: ETH_CHAIN_ID, 
        to: SynapseContract[ETH_CHAIN_ID], 
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          to: TEST_USER,
          amount: {
            $gte: '100000'
          },
          chainId: ARBITRUM_CHAIN_ID,
          token: ETHEREUM_USDC_ADDRESS,
        },
      })
    }
    test('Should return a valid transaction for a L2 -> L1 transaction (Non CCTP)'), async () => {
      const filter = await bridge({
        sourceChainId: ARBITRUM_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: ARBITRUM_USDCE_ADDRESS, 
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER
      })

      expect(filter).to.deep.equal({
        chainId: ARBITRUM_CHAIN_ID, 
        to: SynapseContract[ARBITRUM_CHAIN_ID], 
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          to: TEST_USER,
          amount: {
            $gte: '100000'
          },
          chainId: ETH_CHAIN_ID,
          token: ARBITRUM_USDCE_ADDRESS,
        },
      })
    }
    // CCTP Transactions
    test('Should return a valid transaction for a L1 -> L2 transaction (CCTP)'), async () => {
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARBITRUM_CHAIN_ID,
        tokenAddress: ETHEREUM_USDC_ADDRESS, 
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
        contractAddress: getContractAddress(ETH_CHAIN_ID),
      })

      expect(filter).to.deep.equal({
        chainId: ETH_CHAIN_ID, 
        // Update
        to: SynapseCCTPContract[ETH_CHAIN_ID], 
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          //Update
          sender: TEST_USER,
          amount: {
            $gte: '100000'
          },
          chainId: ARBITRUM_CHAIN_ID,
          token: ETHEREUM_USDC_ADDRESS,
        },
      })
    }
    test('Should return a valid transaction for a L2 -> L1 transaction (CCTP)'), async () => {
      const filter = await bridge({
        sourceChainId: ARBITRUM_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: ARBITRUM_USDC_ADDRESS, 
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
        contractAddress: getContractAddress(ETH_CHAIN_ID),
      })

      expect(filter).to.deep.equal({
        chainId: ARBITRUM_CHAIN_ID, 
        to: SynapseCCTPContract[ARBITRUM_CHAIN_ID], 
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          sender: TEST_USER,
          amount: {
            $gte: '100000'
          },
          chainId: ETH_CHAIN_ID,
          token: ARBITRUM_USDC_ADDRESS,
        },
      })
    }
 
    describe('When applying the filter', () => {
      test('should pass filter with valid L1 ETH tx', async () => {
        const transaction = DEPOSIT_ETH
        const filter = await bridge({
          sourceChainId: ETH_CHAIN_ID,
          destinationChainId: ARBITRUM_CHAIN_ID,
          tokenAddress: '0x0000000000000000000000000000000000000000',
          amount: GreaterThanOrEqual(parseEther('.2')),
          recipient: '0x75e53251e56dc44c627f3af3d09141813eace30e',
        })
        expect(apply(transaction, filter)).to.be.true
      })
      test('should pass filter with valid L2 ETH tx', async () => {
        const transaction = WITHDRAW_ETH
        const filter = await bridge({
          sourceChainId: ARBITRUM_CHAIN_ID,
          destinationChainId: ETH_CHAIN_ID,
          tokenAddress: '0x0000000000000000000000000000000000000000',
          amount: GreaterThanOrEqual(parseEther('.259')),
          recipient: '0xfc9b9ea77d243e7abd17c751effc1000c4f0de1b',
        })
        expect(apply(transaction, filter)).to.be.true
      })
      test('should pass filter with valid L1 Token tx', async () => {
        const transaction = DEPOSIT_ERC20
        const filter = await bridge({
          sourceChainId: ETH_CHAIN_ID,
          destinationChainId: ARBITRUM_CHAIN_ID,
          tokenAddress: ETHEREUM_USDC_ADDRESS,
          amount: GreaterThanOrEqual('40000'), // $? USDC (??),
          recipient: '0x1119c4ce8f56d96a51b5a38260fede037c7126f5',
        })
        expect(apply(transaction, filter)).to.be.true
      })
      test('should pass filter with valid L2 token tx', async () => {
        const transaction = WITHDRAW_ERC20
        const filter = await bridge({
          sourceChainId: ARBITRUM_CHAIN_ID ,
          destinationChainId: ETH_CHAIN_ID,
          tokenAddress: ARBITRUM_USDCE_ADDRESS  ,
          amount: GreaterThanOrEqual('4006'),
          recipient: '0x326c4daf6a8002eb790fa2338285e77052078fff',
        })
        expect(apply(transaction, filter)).to.be.true
      })
  })
    // Need to add when certain variable are missing that the tests still pass. ( I handle this above for the cases where CCTP doesnt exist.)
    test('should not pass filter with invalid transactions',  () => {  
    })

  })
})
