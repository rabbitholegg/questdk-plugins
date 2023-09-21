import { GreaterThanOrEqual, apply, type FilterOperator } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { GMX_SWAP_ABI } from './abi.js'
import { swap } from './GMX.js'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'
import { buildPathQuery } from './utils.js'


describe('Given the gmx plugin', () => {
  const GMX_ROUTER_ADDRESS = '0xabbc5f99639c9b6bcb58544ddf04efa6802f4064'
  const BRIDGED_USDC_ADDRESS = '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
  const USDT_ADDRESS = '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'
  const TEST_USER = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'
  describe('When handling the swap', () => {

    test('should return a valid action filter', async () => {

    const filter = await swap({
      chainId: ARB_ONE_CHAIN_ID,
      contractAddress: GMX_ROUTER_ADDRESS,
      tokenIn: BRIDGED_USDC_ADDRESS,
      tokenOut: USDT_ADDRESS,
      amountIn: GreaterThanOrEqual(100000n),
      amountOut: GreaterThanOrEqual(100000n),
      recipient: TEST_USER,
    })

    expect(filter).to.deep.equal({
      to: GMX_ROUTER_ADDRESS,
      chainId: ARB_ONE_CHAIN_ID,
      input: {
        $abi: GMX_SWAP_ABI,
        _path: buildPathQuery(BRIDGED_USDC_ADDRESS, USDT_ADDRESS),
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
