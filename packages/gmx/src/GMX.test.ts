import { GreaterThanOrEqual, apply, type FilterOperator } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { GMX_SWAP_ABI } from './abi.js'
import { swap } from './GMX.js'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'
import { SWAP_ETH } from './test-transactions.js'
import { parseEther } from 'viem'

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
        _path: [BRIDGED_USDC_ADDRESS, USDT_ADDRESS],
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

    test('should pass filter with valid transactions',  async() => {
      const transaction = SWAP_ETH
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: GMX_ROUTER_ADDRESS,
        tokenIn: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        tokenOut: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        amountIn: GreaterThanOrEqual(3400000),
        amountOut: GreaterThanOrEqual(parseEther(".57")),
        recipient: "0xDA63F22BF4bDC0B88536bDf4375fc9E14862ABD8",
      })
      expect(apply(transaction, filter)).to.be.true
    })
  

  })
})
