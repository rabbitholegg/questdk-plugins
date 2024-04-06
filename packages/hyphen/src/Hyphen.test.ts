import { bridge } from './Hyphen'
import { ABI } from './abi'
import { CHAIN_TO_CONTRACT } from './chain-to-contract'
import { CHAIN_TO_TOKENS } from './chain-to-tokens'
import { failingTestCases, passingTestCases } from './test-transactions'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { zeroAddress } from 'viem'
import { describe, expect, test } from 'vitest'

describe('Given the Hyphen plugin', () => {
  describe('When handling the bridge', () => {
    const TEST_ADDRESS = '0x081F992BB28E1D32E138FFAB57AF8F8B932573B5'

    test('should return a valid bridge action filter using native token', async () => {
      // bridge ETH from Mainnet to Polygon
      const sourceChainId = Chains.ETHEREUM
      const destinationChainId = Chains.POLYGON_POS

      const filter = await bridge({
        sourceChainId,
        destinationChainId,
        tokenAddress: zeroAddress,
        recipient: TEST_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
      })
      expect(filter).to.deep.equal({
        chainId: sourceChainId,
        to: CHAIN_TO_CONTRACT[sourceChainId],
        value: {
          $gte: '100000',
        },
        input: {
          $abi: ABI,
          toChainId: destinationChainId,
          receiver: TEST_ADDRESS,
        },
      })
    })

    test('should return a valid bridge action filter using erc-20 token', async () => {
      // bridge erc-20 from Optimism to Polygon
      const tokenAddress = CHAIN_TO_TOKENS[Chains.OPTIMISM][0]
      const sourceChainId = Chains.OPTIMISM
      const destinationChainId = Chains.POLYGON_POS

      const filter = await bridge({
        sourceChainId,
        destinationChainId,
        tokenAddress,
        recipient: TEST_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
      })
      expect(filter).to.deep.equal({
        chainId: sourceChainId,
        to: CHAIN_TO_CONTRACT[sourceChainId],
        input: {
          $abi: ABI,
          toChainId: destinationChainId,
          receiver: TEST_ADDRESS,
          tokenAddress,
          amount: {
            $gte: '100000',
          },
        },
      })
    })

    describe('should pass filter when all parameters are valid', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await bridge({ ...params })
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter when parameters are invalid', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await bridge({ ...params })
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})
