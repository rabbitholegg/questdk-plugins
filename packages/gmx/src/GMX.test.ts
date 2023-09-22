import {
  GreaterThanOrEqual,
  apply
} from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { GMX_SWAPV1_ABI } from './abi.js'
import { swap } from './GMX.js'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'
import { SWAP_ETH, SWAP_ETH_V2 } from './test-transactions.js'
import { parseEther } from 'viem'
import { GMX_ROUTERV1_ADDRESS, GMX_ROUTERV2_ADDRESS } from './contract-addresses.js'

describe('Given the gmx plugin', () => {
  const BRIDGED_USDC_ADDRESS = '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
  const USDT_ADDRESS = '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'
  const TEST_USER = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'
  describe('When handling the swap', () => {
    test('should return a valid action filter', async () => {
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: GMX_ROUTERV1_ADDRESS,
        tokenIn: BRIDGED_USDC_ADDRESS,
        tokenOut: USDT_ADDRESS,
        amountIn: GreaterThanOrEqual(100000n),
        amountOut: GreaterThanOrEqual(100000n),
        recipient: TEST_USER,
      })

      expect(filter).to.deep.equal({
        to: GMX_ROUTERV1_ADDRESS,
        chainId: ARB_ONE_CHAIN_ID,
        input: {
          $abi: GMX_SWAPV1_ABI,
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

    test('should pass filter with valid V1 transactions', async () => {
      const transaction = SWAP_ETH
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: GMX_ROUTERV1_ADDRESS,
        tokenIn: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
        tokenOut: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        amountIn: GreaterThanOrEqual(3400000),
        amountOut: GreaterThanOrEqual(parseEther('.57')),
        recipient: '0xDA63F22BF4bDC0B88536bDf4375fc9E14862ABD8',
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid V2 transactions', async () => {
      const transaction = SWAP_ETH_V2
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: GMX_ROUTERV2_ADDRESS,
        tokenIn: '0x0CCB4fAa6f1F1B30911619f1184082aB4E25813c',
        tokenOut: '0xC25cEf6061Cf5dE5eb761b50E4743c1F5D7E5407',
        amountOut: GreaterThanOrEqual(1900000000000000),
        recipient: '0x38B8b00ec79f43E3Ec9b8142F32ea2210D2A7aff',
      })
      expect(apply(transaction, filter)).to.be.true
    })
  })
})
