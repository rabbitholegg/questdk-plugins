import { GreaterThanOrEqual, apply, type FilterOperator } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { GMX_SWAP_ABI } from './abi.js'

const buildV3PathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v3 paths are formatted as 0x<token><fee><token>

  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $regex: `^${tokenIn}` })
  }

  if (tokenOut) {
    // Chop the 0x prefix before comparing
    conditions.push({ $regex: `${tokenOut.slice(2)}$` })
  }

  return {
    $and: conditions,
  }
}

describe('Given the gmx plugin', () => {
  const GMX_ROUTER_ADDRESS = '0xabbc5f99639c9b6bcb58544ddf04efa6802f4064'
  const BRIDGED_USDC_ADDRESS = '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
  const USDT_ADDRESS = '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'
  const TEST_USER = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'
  describe('When handling the swap', () => {

    test('should return a valid action filter', async () => {
      const USDC_POLYGON_AMM_ADDRESS =
      '0x76b22b8C1079A44F1211D867D68b1eda76a635A7'
    const filter = await swap({
      GMX_ROUTER_ADDRESS,
      BRIDGED_USDC_ADDRESS,
      USDT_ADDRESS,
      amountIn: GreaterThanOrEqual(100000n),
      amountOut: GreaterThanOrEqual(100000n),
    })

    expect(filter).to.deep.equal({
      to: USDC_POLYGON_AMM_ADDRESS,
      input: {
        $abi: GMX_SWAP_ABI,
        _path: buildV3PathQuery(USDT_ADDRESS, BRIDGED_USDC_ADDRESS),
        _amountIn: {
          $gte: '100000',
        },
        _minOut: {
          $gte: '100000',
        },
        _receiver: TEST_USER,
      },
    })
    })

    test('should pass filter with valid transactions',  () => {
      
    })
  

  })
})
