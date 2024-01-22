import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { getSupportedTokenAddresses, swap } from './Pendle.js'
import {
  SWAP_EXACT_TOKEN_FOR_YT,
  SWAP_EXACT_YT_FOR_TOKEN,
} from './test-transactions'
import { getRouterAddress } from './contract-addresses.js'
import { SUPPORTED_CHAINS, SUPPORTED_CHAINS_ARRAY } from './chain-ids.js'
import * as abi from './abi.js'
import { getDefaultTokenAddresses } from './pendle-backend.js'

describe('Given the Pendle plugin', () => {
  describe('When handling Pendle backend', () => {
    test.each(SUPPORTED_CHAINS_ARRAY)(
      'should return tokens for chain %s',
      async (chainId) => {
        const tokens = await getSupportedTokenAddresses(chainId)
        expect(tokens.length).greaterThan(0)
      },
    )
  })

  describe('When handling the swap', () => {
    test('should return a valid action filter', async () => {
      const tokenAddress = getDefaultTokenAddresses(
        SUPPORTED_CHAINS.ETHEREUM,
      )[0]
      const filter = await swap({
        chainId: SUPPORTED_CHAINS.ETHEREUM,
        tokenIn: tokenAddress,
        amountIn: GreaterThanOrEqual(1000000000000000000n),
      })

      expect(filter).to.deep.equal({
        chainId: SUPPORTED_CHAINS.ETHEREUM,
        to: getRouterAddress(SUPPORTED_CHAINS.ETHEREUM),
        input: {
          $abi: abi.SWAP_EXACT_TOKEN_FOR_YT,
          input: {
            tokenIn: tokenAddress,
            netTokenIn: { $gte: '1000000000000000000' },
          },
        },
      })
    })

    describe('should pass filter with valid transactions', async () => {
      const filters = await Promise.all([
        swap({
          chainId: SWAP_EXACT_TOKEN_FOR_YT.chainId,
          tokenIn: '0x0000000000000000000000000000000000000000',
          amountIn: GreaterThanOrEqual(250000000000000000n),
        }),
        swap({
          chainId: SWAP_EXACT_TOKEN_FOR_YT.chainId,
          tokenIn: '0x0000000000000000000000000000000000000000',
          amountIn: GreaterThanOrEqual(100000000000000000n),
        }),
      ])

      test.each(filters)('should pass filter %#', (filter) => {
        expect(apply(SWAP_EXACT_TOKEN_FOR_YT, filter)).to.be.true
      })
    })

    describe('should not pass filter with invalid transactions', async () => {
      test('invalid function', async () => {
        const filter = await swap({ chainId: SWAP_EXACT_YT_FOR_TOKEN.chainId })
        expect(apply(SWAP_EXACT_YT_FOR_TOKEN, filter)).to.be.false
      })

      test('tokenIn not correct', async () => {
        const filter = await swap({
          chainId: SWAP_EXACT_TOKEN_FOR_YT.chainId,
          tokenIn: '0x3175df0976dfa876431c2e9ee6bc45b65d3473cc',
          amountIn: GreaterThanOrEqual(250000000000000000n),
        })
        expect(apply(SWAP_EXACT_TOKEN_FOR_YT, filter)).to.be.false
      })

      test('amountIn not valid', async () => {
        const filter = await swap({
          chainId: SWAP_EXACT_TOKEN_FOR_YT.chainId,
          tokenIn: '0x3175df0976dfa876431c2e9ee6bc45b65d3473cc',
          amountIn: GreaterThanOrEqual(300000000000000000n),
        })
        expect(apply(SWAP_EXACT_TOKEN_FOR_YT, filter)).to.be.false
      })
    })
  })
})
