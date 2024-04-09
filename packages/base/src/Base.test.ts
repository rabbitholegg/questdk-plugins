import { bridge } from './Base'
import {
  BASE_ERC20_ABI,
  BASE_ERC20_BRIDGE_ADDRESS,
  BASE_ETH_ABI,
  BASE_ETH_BRIDGE_ADDRESS,
  ETH,
  ETHEREUM_ERC20_ABI,
  ETHEREUM_ERC20_BRIDGE_ADDRESS,
  ETHEREUM_ETH_ABI,
  ETHEREUM_ETH_BRIDGE_ADDRESS,
} from './constants'
import { failingTestCases, passingTestCases } from './test-transactions'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk/filter'
import { parseEther } from 'viem'
import { describe, expect, test } from 'vitest'

describe('Given the base plugin', () => {
  describe('When handling the bridge action', () => {
    describe('should return a valid action filter', () => {
      test('when bridge eth from ethereum to base', async () => {
        const amount = parseEther('0.008').toString()
        const filter = await bridge({
          sourceChainId: Chains.ETHEREUM,
          destinationChainId: Chains.BASE,
          tokenAddress: ETH,
          amount,
        })
        expect(filter).to.deep.equal({
          chainId: Chains.ETHEREUM,
          to: ETHEREUM_ETH_BRIDGE_ADDRESS,
          input: {
            $abi: ETHEREUM_ETH_ABI,
            _value: amount,
          },
        })
      })

      test('when bridge erc20 from ethereum to base', async () => {
        const amount = parseEther('0.008').toString()
        const filter = await bridge({
          sourceChainId: Chains.ETHEREUM,
          destinationChainId: Chains.BASE,
          tokenAddress: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4333',
          amount,
        })
        expect(filter).to.deep.equal({
          chainId: Chains.ETHEREUM,
          to: ETHEREUM_ERC20_BRIDGE_ADDRESS,
          input: {
            $abi: ETHEREUM_ERC20_ABI,
            amount,
            burnToken: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4333',
          },
        })
      })

      test('when bridge eth from base to ethereum', async () => {
        const amount = parseEther('0.008').toString()
        const filter = await bridge({
          sourceChainId: Chains.BASE,
          destinationChainId: Chains.ETHEREUM,
          tokenAddress: ETH,
          amount,
        })
        expect(filter).to.deep.equal({
          chainId: Chains.BASE,
          to: BASE_ETH_BRIDGE_ADDRESS,
          value: amount,
          input: {
            $abi: BASE_ETH_ABI,
          },
        })
      })

      test('when bridge erc20 from base to ethereum', async () => {
        const amount = parseEther('0.008').toString()
        const filter = await bridge({
          sourceChainId: Chains.BASE,
          destinationChainId: Chains.ETHEREUM,
          tokenAddress: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4333',
          amount,
        })
        expect(filter).to.deep.equal({
          chainId: Chains.BASE,
          to: BASE_ERC20_BRIDGE_ADDRESS,
          input: {
            $abi: BASE_ERC20_ABI,
            amount,
            burnToken: '0x990D07a69f23d69618e3Bb2444fA07f499193Fe4333',
          },
        })
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
  })
})
