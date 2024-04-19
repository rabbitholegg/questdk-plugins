import { bridge, getSupportedTokenAddresses } from './Synapse'
import { SYNAPSE_BRIDGE_FRAGMENTS } from './abi'
import { CHAIN_ID_ARRAY } from './chain-ids'
import {
  CHAIN_TO_ROUTER,
  SYNAPSE_CCTP_ROUTER,
  SynapseCCTPContract,
  getContractAddress,
} from './contract-addresses'
import {
  DEPOSIT_CCTP,
  DEPOSIT_ERC20,
  DEPOSIT_ETH,
  WITHDRAW_CCTP,
  WITHDRAW_ERC20,
  WITHDRAW_ETH,
  failingTestCases,
  passingTestCases,
} from './test-transactions'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { parseEther, parseUnits, zeroAddress } from 'viem'
import { describe, expect, test } from 'vitest'

const ARBITRUM_USDCE_ADDRESS = '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
const ARBITRUM_USDC_ADDRESS = '0xaf88d065e77c8cc2239327c5edb3a432268e5831'
const ETHEREUM_USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

// A random Ethereum Address
const TEST_USER = '0xF57D86F6bFcc76AA2C7f62616B2436C60Ad397e2'

describe('When given the Synapse plugin', () => {
  describe('When generating the filter', () => {
    test('Should return a valid bridge action filter for L2 token tx', async () => {
      const filter = await bridge({
        sourceChainId: Chains.ARBITRUM_ONE,
        destinationChainId: Chains.ETHEREUM,
        tokenAddress: ARBITRUM_USDCE_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })
      expect(filter).to.deep.equal({
        chainId: Chains.ARBITRUM_ONE,
        to: {
          $or: [
            CHAIN_TO_ROUTER[Chains.ARBITRUM_ONE].toLowerCase(),
            SYNAPSE_CCTP_ROUTER[Chains.ARBITRUM_ONE].toLowerCase(),
          ],
        },
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          $and: [
            {
              amount: {
                $gte: '100000',
              },
              chainId: Chains.ETHEREUM,
              token: ARBITRUM_USDCE_ADDRESS,
            },
            { $or: [{ sender: TEST_USER }, { to: TEST_USER }] },
          ],
        },
      })
    })
    test('Should return a valid transaction for a L1 -> L2 transaction (Non CCTP)', async () => {
      const filter = await bridge({
        sourceChainId: Chains.ETHEREUM,
        destinationChainId: Chains.ARBITRUM_ONE,
        tokenAddress: ETHEREUM_USDC_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: Chains.ETHEREUM,
        to: {
          $or: [
            CHAIN_TO_ROUTER[Chains.ETHEREUM].toLowerCase(),
            SYNAPSE_CCTP_ROUTER[Chains.ETHEREUM].toLowerCase(),
          ],
        },
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          $and: [
            {
              amount: {
                $gte: '100000',
              },
              chainId: Chains.ARBITRUM_ONE,
              token: ETHEREUM_USDC_ADDRESS,
            },
            { $or: [{ sender: TEST_USER }, { to: TEST_USER }] },
          ],
        },
      })
    })
    test('Should return a valid transaction for a L2 -> L1 transaction (Non CCTP)', async () => {
      const filter = await bridge({
        sourceChainId: Chains.ARBITRUM_ONE,
        destinationChainId: Chains.ETHEREUM,
        tokenAddress: ARBITRUM_USDCE_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        chainId: Chains.ARBITRUM_ONE,
        to: {
          $or: [
            CHAIN_TO_ROUTER[Chains.ARBITRUM_ONE].toLowerCase(),
            SYNAPSE_CCTP_ROUTER[Chains.ARBITRUM_ONE].toLowerCase(),
          ],
        },
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          $and: [
            {
              amount: {
                $gte: '100000',
              },
              chainId: Chains.ETHEREUM,
              token: ARBITRUM_USDCE_ADDRESS,
            },
            { $or: [{ sender: TEST_USER }, { to: TEST_USER }] },
          ],
        },
      })
    })
    // // CCTP Transactions
    test('Should return a valid transaction for a L1 -> L2 transaction (CCTP)', async () => {
      const filter = await bridge({
        sourceChainId: Chains.ETHEREUM,
        destinationChainId: Chains.ARBITRUM_ONE,
        tokenAddress: ETHEREUM_USDC_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
        contractAddress: getContractAddress(Chains.ETHEREUM),
      })

      expect(filter).to.deep.equal({
        chainId: Chains.ETHEREUM,
        to: getContractAddress(Chains.ETHEREUM),
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          $and: [
            {
              amount: {
                $gte: '100000',
              },
              chainId: Chains.ARBITRUM_ONE,
              token: ETHEREUM_USDC_ADDRESS,
            },
            { $or: [{ sender: TEST_USER }, { to: TEST_USER }] },
          ],
        },
      })
    })
    test('Should return a valid transaction for a L2 -> L1 transaction (CCTP)', async () => {
      const filter = await bridge({
        sourceChainId: Chains.ARBITRUM_ONE,
        destinationChainId: Chains.ETHEREUM,
        tokenAddress: ARBITRUM_USDC_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
        contractAddress: getContractAddress(Chains.ETHEREUM),
      })

      expect(filter).to.deep.equal({
        chainId: Chains.ARBITRUM_ONE,
        to: SynapseCCTPContract[Chains.ARBITRUM_ONE],
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          $and: [
            {
              amount: {
                $gte: '100000',
              },
              chainId: Chains.ETHEREUM,
              token: ARBITRUM_USDC_ADDRESS,
            },
            { $or: [{ sender: TEST_USER }, { to: TEST_USER }] },
          ],
        },
      })
    })
  })

  describe('When applying the filter', () => {
    test('should pass filter with valid L1 ETH tx', async () => {
      const transaction = DEPOSIT_ETH
      const filter = await bridge({
        sourceChainId: Chains.ETHEREUM,
        destinationChainId: Chains.ARBITRUM_ONE,
        tokenAddress: zeroAddress,
        amount: GreaterThanOrEqual(parseEther('.2')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 ETH tx', async () => {
      const transaction = WITHDRAW_ETH
      const filter = await bridge({
        sourceChainId: Chains.ARBITRUM_ONE,
        destinationChainId: Chains.ETHEREUM,
        tokenAddress: zeroAddress,
        amount: GreaterThanOrEqual(parseEther('.259')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L1 Token tx', async () => {
      const transaction = DEPOSIT_ERC20
      const filter = await bridge({
        sourceChainId: Chains.ETHEREUM,
        destinationChainId: Chains.BINANCE_SMART_CHAIN,
        tokenAddress: ETHEREUM_USDC_ADDRESS,
        amount: GreaterThanOrEqual(parseUnits('9', 6)),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 token tx', async () => {
      const transaction = WITHDRAW_ERC20
      const filter = await bridge({
        sourceChainId: Chains.ARBITRUM_ONE,
        destinationChainId: Chains.ETHEREUM,
        tokenAddress: ARBITRUM_USDCE_ADDRESS,
        amount: GreaterThanOrEqual(parseUnits('4006', 6)),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    // These are going to fail ? Im not sure how the contract address thing works.
    test('should pass filter with valid CCTP Deposit tx', async () => {
      const transaction = DEPOSIT_CCTP
      const filter = await bridge({
        sourceChainId: Chains.ETHEREUM,
        destinationChainId: Chains.ARBITRUM_ONE,
        tokenAddress: ETHEREUM_USDC_ADDRESS,
        amount: GreaterThanOrEqual(parseUnits('300', 6)),
        contractAddress: '0xd359bc471554504f683fbd4f6e36848612349ddf',
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid CCTP Withdraw tx', async () => {
      const transaction = WITHDRAW_CCTP
      const filter = await bridge({
        sourceChainId: Chains.ARBITRUM_ONE,
        destinationChainId: Chains.ETHEREUM,
        tokenAddress: ARBITRUM_USDC_ADDRESS,
        amount: GreaterThanOrEqual(parseUnits('95', 6)),
        contractAddress: '0xd359bc471554504f683fbd4f6e36848612349ddf',
      })
      expect(apply(transaction, filter)).to.be.true
    })
  })

  describe('should pass filter with valid transactions', () => {
    passingTestCases.forEach((testCase) => {
      const { transaction, description, params } = testCase
      test(description, async () => {
        const filter = await bridge(params)
        expect(apply(transaction, filter)).to.be.true
      })
    })
  })

  describe('should not pass filter with invalid transactions', () => {
    failingTestCases.forEach((testCase) => {
      const { transaction, description, params } = testCase
      test(description, async () => {
        const filter = await bridge(params)
        expect(apply(transaction, filter)).to.be.false
      })
    })
  })

  describe('should return a valid list of tokens for each supported chain', () => {
    CHAIN_ID_ARRAY.forEach((chainId) => {
      // chain 5395 DFK_CHAIN has no tokens at the moment
      if (chainId !== 5395) {
        test(`for chainId: ${chainId}`, async () => {
          const tokens = await getSupportedTokenAddresses(chainId)
          const addressRegex = /^0x[a-fA-F0-9]{40}$/
          expect(tokens).to.be.an('array')
          expect(tokens).to.have.length.greaterThan(1)
          expect(tokens).to.have.length.lessThan(100)
          tokens.forEach((token) => {
            expect(token).to.match(
              addressRegex,
              `Token address ${token} is not a valid Ethereum address`,
            )
          })
        })
      }
    })
  })
})
