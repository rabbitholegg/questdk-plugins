import { bridge } from './Across'
import {
  DEPOSIT_ERC20,
  DEPOSIT_ETH,
  WITHDRAW_ERC20,
  WITHDRAW_ETH,
  failingTestCases,
  passingTestCases,
} from './test-transactions'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk'
import { parseEther } from 'viem'
import { describe, expect, test } from 'vitest'

export const WETH_ADRESS_MAINNET = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
export const WETH_ADDRESS_ARBITRUM =
  '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
export const USDT_ADDRESS_ARBITRUM =
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
export const USDT_ADDRESS_MAINNET = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

describe('Given the Across plugin', () => {
  describe('When generating the filter', () => {
    test('when making a valid bridge action', async () => {
      const filter = await bridge({
        sourceChainId: 1,
        destinationChainId: 10,
      })
      expect(filter).toBeTypeOf('object')
      expect(Number(filter.chainId)).toBe(1)
      if (typeof filter.to === 'string') {
        expect(filter.to).toMatch(/^0x[a-fA-F0-9]{40}$/)
      } else {
        // if to is an object, it should have a logical operator as the only key
        expect(filter.to).toBeTypeOf('object')
        expect(Object.keys(filter.to)).toHaveLength(1)
        expect(
          ['$or', '$and'].some((prop) =>
            Object.hasOwnProperty.call(filter.to, prop),
          ),
        ).to.be.true
        expect(Object.values(filter.to)[0]).to.satisfy((arr: string[]) =>
          arr.every((val) => val.match(/^0x[a-fA-F0-9]{40}$/)),
        )
      }
      // Check the input property is the correct type and has a valid filter operator
      expect(filter.input).toBeTypeOf('object')
      expect(
        ['$abi', '$abiParams', '$abiAbstract', '$or', '$and'].some((prop) =>
          Object.hasOwnProperty.call(filter.input, prop),
        ),
      ).to.be.true
    })
  })
  describe('When applying the filter', () => {
    test('should pass filter with valid L1 ETH tx', async () => {
      const transaction = DEPOSIT_ETH
      const filter = await bridge({
        sourceChainId: Chains.ETHEREUM,
        destinationChainId: Chains.OPTIMISM,
        tokenAddress: WETH_ADRESS_MAINNET,
        amount: GreaterThanOrEqual(parseEther('.315')),
        recipient: '0xE751378EC5E5c0b64c4D16A077E8f11FBcfC958A',
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 ETH tx', async () => {
      const transaction = WITHDRAW_ETH
      const filter = await bridge({
        sourceChainId: Chains.ARBITRUM_ONE,
        destinationChainId: Chains.ETHEREUM,
        tokenAddress: WETH_ADDRESS_ARBITRUM,
        amount: GreaterThanOrEqual(parseEther('.15')),
        recipient: '0xbfe7A294ceD3Ce8C33c22c4dcAa6FD4522d6D32a',
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L1 Token tx', async () => {
      const transaction = DEPOSIT_ERC20
      const filter = await bridge({
        sourceChainId: Chains.ETHEREUM,
        destinationChainId: Chains.POLYGON_POS,
        tokenAddress: USDT_ADDRESS_MAINNET,
        amount: GreaterThanOrEqual('9900000'), // $250 USDC,
        recipient: '0xb3b873a999cff617307A351e32a3dd7A94adD5B2',
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should pass filter with valid L2 token tx', async () => {
      const transaction = WITHDRAW_ERC20
      const filter = await bridge({
        sourceChainId: Chains.ARBITRUM_ONE,
        destinationChainId: Chains.POLYGON_POS,
        tokenAddress: USDT_ADDRESS_ARBITRUM,
        amount: GreaterThanOrEqual('19000000'),
        recipient: '0x49b887e3f64C7007E76f72C17cE29c7bcFb9Af55',
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
})
