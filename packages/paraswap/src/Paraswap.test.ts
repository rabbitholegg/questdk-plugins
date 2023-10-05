import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { SWAP_MULTI, SWAP_SIMPLE } from './test-transactions'
import { swap } from './Paraswap.js'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'

const USDT_ADDRESS = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
const USDCE_ADDRESS = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'

const AUGUSTUS_SWAPPER_ARBITRUM = '0xdef171fe48cf0115b1d80b88dc8eab59176fee57'

describe('Given the paraswap plugin', () => {
  describe('When handling the bridge', () => {

    test('should return a valid action filter', () => {
      
    })

    test('should pass filter with valid transactions',  () => {
      
    })
    
    test('should not pass filter with invalid transactions',  async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: "0xdef171fe48cf0115b1d80b88dc8eab59176fee57",
        tokenIn: USDT_ADDRESS.toLowerCase(),
        tokenOut: USDCE_ADDRESS.toLowerCase(),
        amountIn: GreaterThanOrEqual(339000000),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should not pass filter with invalid transactions',  async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase(),
        tokenOut: USDCE_ADDRESS.toLowerCase(),
        amountOut: GreaterThanOrEqual(338000000),
      })
      expect(apply(transaction, filter)).to.be.true
    })

  })
})
