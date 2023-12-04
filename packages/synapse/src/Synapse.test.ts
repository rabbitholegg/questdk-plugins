import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Synapse.js'
import {
  DEPOSIT_ETH,
  WITHDRAW_ERC20,
  WITHDRAW_ETH,
  DEPOSIT_ERC20,
  DEPOSIT_CCTP,
  WITHDRAW_CCTP,
} from './test-transactions.js'
import { ARBITRUM_CHAIN_ID, ETH_CHAIN_ID, BSC_CHAIN_ID } from './chain-ids.js'
import { SYNAPSE_BRIDGE_FRAGMENTS } from './abi.js'
import { parseEther } from 'viem'
import {
  SynapseCCTPContract,
  getContractAddress,
  CHAIN_TO_ROUTER,
  SYNAPSE_CCTP_ROUTER,
} from './contract-addresses'

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
        recipient: TEST_USER,
      })
      console.log(filter)
      expect(filter).to.deep.equal({
        chainId: ARBITRUM_CHAIN_ID,
        to: {
          $or: [
            CHAIN_TO_ROUTER[ARBITRUM_CHAIN_ID].toLowerCase(),
            SYNAPSE_CCTP_ROUTER[ARBITRUM_CHAIN_ID].toLowerCase(),
          ],
        },
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          $and: [
            {
              amount: {
                $gte: '100000',
              },
              chainId: ETH_CHAIN_ID,
              token: ARBITRUM_USDCE_ADDRESS,
            },
            { $or: [{ sender: TEST_USER }, { to: TEST_USER }] },
          ],
        },
      })
    })
    test(
      'Should return a valid transaction for a L1 -> L2 transaction (Non CCTP)',
    ),
      async () => {
        const filter = await bridge({
          sourceChainId: ETH_CHAIN_ID,
          destinationChainId: ARBITRUM_CHAIN_ID,
          tokenAddress: ETHEREUM_USDC_ADDRESS,
          amount: GreaterThanOrEqual(100000n),
          recipient: TEST_USER,
        })

        expect(filter).to.deep.equal({
          chainId: ETH_CHAIN_ID,
          to: CHAIN_TO_ROUTER[ETH_CHAIN_ID],
          input: {
            $abi: SYNAPSE_BRIDGE_FRAGMENTS,
            to: TEST_USER,
            amount: {
              $gte: '100000',
            },
            chainId: ARBITRUM_CHAIN_ID,
            token: ETHEREUM_USDC_ADDRESS,
          },
        })
      }
    test(
      'Should return a valid transaction for a L2 -> L1 transaction (Non CCTP)',
    ),
      async () => {
        const filter = await bridge({
          sourceChainId: ARBITRUM_CHAIN_ID,
          destinationChainId: ETH_CHAIN_ID,
          tokenAddress: ARBITRUM_USDCE_ADDRESS,
          amount: GreaterThanOrEqual(100000n),
          recipient: TEST_USER,
        })

        expect(filter).to.deep.equal({
          chainId: ARBITRUM_CHAIN_ID,
          to: CHAIN_TO_ROUTER[ARBITRUM_CHAIN_ID],
          input: {
            $abi: SYNAPSE_BRIDGE_FRAGMENTS,
            to: TEST_USER,
            amount: {
              $gte: '100000',
            },
            chainId: ETH_CHAIN_ID,
            token: ARBITRUM_USDCE_ADDRESS,
          },
        })
      }
    // CCTP Transactions
    test('Should return a valid transaction for a L1 -> L2 transaction (CCTP)'),
      async () => {
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
              $gte: '100000',
            },
            chainId: ARBITRUM_CHAIN_ID,
            token: ETHEREUM_USDC_ADDRESS,
          },
        })
      }
    test('Should return a valid transaction for a L2 -> L1 transaction (CCTP)'),
      async () => {
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
              $gte: '100000',
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
          tokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          amount: GreaterThanOrEqual(parseEther('.2')),
        })
        expect(apply(transaction, filter)).to.be.true
      })
      test('should pass filter with valid L2 ETH tx', async () => {
        const transaction = WITHDRAW_ETH
        const filter = await bridge({
          sourceChainId: ARBITRUM_CHAIN_ID,
          destinationChainId: ETH_CHAIN_ID,
          tokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          amount: GreaterThanOrEqual(parseEther('.259')),
        })
        expect(apply(transaction, filter)).to.be.true
      })
      test('should pass filter with valid L1 Token tx', async () => {
        const transaction = DEPOSIT_ERC20
        const filter = await bridge({
          sourceChainId: ETH_CHAIN_ID,
          destinationChainId: BSC_CHAIN_ID,
          tokenAddress: ETHEREUM_USDC_ADDRESS,
          amount: GreaterThanOrEqual('9'),
        })
        expect(apply(transaction, filter)).to.be.true
      })
      test('should pass filter with valid L2 token tx', async () => {
        const transaction = WITHDRAW_ERC20
        const filter = await bridge({
          sourceChainId: ARBITRUM_CHAIN_ID,
          destinationChainId: ETH_CHAIN_ID,
          tokenAddress: ARBITRUM_USDCE_ADDRESS,
          amount: GreaterThanOrEqual('4006'),
        })
        expect(apply(transaction, filter)).to.be.true
      })
      // These are going to fail ? Im not sure how the contract address thing works.
      test('should pass filter with valid CCTP Deposit tx', async () => {
        const transaction = DEPOSIT_CCTP
        const filter = await bridge({
          sourceChainId: ETH_CHAIN_ID,
          destinationChainId: ARBITRUM_CHAIN_ID,
          tokenAddress: ETHEREUM_USDC_ADDRESS,
          amount: GreaterThanOrEqual('299'),
          contractAddress: '0xd359bc471554504f683fbd4f6e36848612349ddf',
        })
        expect(apply(transaction, filter)).to.be.true
      })
      test('should pass filter with valid CCTP Withdraw tx', async () => {
        const transaction = WITHDRAW_CCTP
        const filter = await bridge({
          sourceChainId: ARBITRUM_CHAIN_ID,
          destinationChainId: ETH_CHAIN_ID,
          tokenAddress: ARBITRUM_USDC_ADDRESS,
          amount: GreaterThanOrEqual('94'),
          contractAddress: '0xd359bc471554504f683fbd4f6e36848612349ddf',
        })
        expect(apply(transaction, filter)).to.be.true
      })
    })
  })
})
