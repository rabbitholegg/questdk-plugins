import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { passingTestCases, failingTestCases } from './test-transactions'
import { metaBurnABI, metaRouteABI } from './abi'
import { zeroAddress, isAddress } from 'viem'
import { Chains } from './utils'
import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Symbiosis'

describe('Given the symbiosis plugin', () => {
  describe('When handling the bridge', () => {
    test('should return a valid action filter', async () => {
      const { params } = passingTestCases[0]
      const filter = await bridge(params)
      expect(filter).to.deep.equal({
        chainId: Chains.OPTIMISM,
        to: '0x0f91052dc5B4baE53d0FeA5DAe561A117268f5d2',
        input: {
          $abi: metaRouteABI,
          _metarouteTransaction: {
            approvedTokens: { $first: zeroAddress },
            amount: {
              $gte: '7500000000000000',
            },
            otherSideCalldata: {
              $abiAbstract: metaBurnABI,
              _metaBurnTransaction: {
                chainID: Chains.ARBITRUM_ONE,
                chain2address: '0xa99f898530df1514a566f1a6562d62809e99557d',
              },
            },
          },
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

  describe('should return a valid list of tokens for each supported chain', async () => {
    const chainIdArray = await getSupportedChainIds()
    chainIdArray.forEach((chainId) => {
      test(`for chainId: ${chainId}`, async () => {
        const tokens = await getSupportedTokenAddresses(chainId)
        expect(tokens).to.be.an('array')
        expect(tokens).to.have.length.greaterThan(0)
        expect(tokens).to.have.length.lessThan(100)
        tokens.forEach((token) => {
          const isValid = isAddress(token)
          if (!isValid) {
            console.error(
              `Token address ${token} is not a valid Ethereum address`,
            )
          }
          expect(isValid).to.be.true
        })
      })
    })
  })
})
