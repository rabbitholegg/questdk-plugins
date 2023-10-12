import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { SWAP_MULTI, SWAP_SIMPLE } from './test-transactions'
import { swap } from './Paraswap.js'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'
import { parseEther, type Address } from 'viem'
import { PARASWAP_ABI } from './abi.js'
const USDT_ADDRESS = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
const USDCE_ADDRESS = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
const VELA_ADDRESS = '0x088cd8f5ef3652623c22d48b1605dcfe860cd704'
const AUGUSTUS_SWAPPER_ARBITRUM = '0xdef171fe48cf0115b1d80b88dc8eab59176fee57'

describe('Given the paraswap plugin', () => {
  describe('When handling the bridge', () => {
    test('should return a valid action filter', async () => {
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: USDCE_ADDRESS.toLowerCase() as Address,
        amountIn: GreaterThanOrEqual(339000000),
      })
      console.log(filter.input)

      expect(filter).to.deep.equal({
        chainId: ARB_ONE_CHAIN_ID,
        to: AUGUSTUS_SWAPPER_ARBITRUM,
        input: {
          $abiAbstract: PARASWAP_ABI,
          $or: [
            {
              assets: [
                '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              ],
              fromAmount: {
                $gte: '339000000',
              },
              funds: {},
            },
            {
              assets: [
                '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              ],
              fromAmount: {
                $gte: '339000000',
              },
              funds: {},
            },
            {
              fromAmount: {
                $gte: '339000000',
              },
              fromToken: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
              toToken: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
            },
            {
              fromAmount: {
                $gte: '339000000',
              },
              fromToken: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
              toToken: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
            },
            {
              params: {
                amountIn: {
                  $gte: '339000000',
                },
                tokenIn: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                tokenOut: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              },
            },
            {
              params: {
                amountIn: {
                  $gte: '339000000',
                },
                path: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9ff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              },
            },
            {
              data: {
                fromAmount: {
                  $gte: '339000000',
                },
                fromToken: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                path: {
                  $last: {
                    to: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
                  },
                },
              },
            },
          ],
        },
      })
    })

    test('should pass filter with valid simple transactions', async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: USDCE_ADDRESS.toLowerCase() as Address,
        amountIn: GreaterThanOrEqual(339000000),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should not pass filter with invalid simple transactions', async () => {
      const transaction = SWAP_SIMPLE
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: USDCE_ADDRESS.toLowerCase() as Address,
        amountIn: GreaterThanOrEqual(339000000000),
      })
      expect(apply(transaction, filter)).to.be.false
    })
    test('should pass filter with valid multi transactions', async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDCE_ADDRESS.toLowerCase() as Address,
        tokenOut: VELA_ADDRESS.toLowerCase() as Address,
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should not pass filter with invalid transactions', async () => {
      const transaction = SWAP_MULTI
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        contractAddress: AUGUSTUS_SWAPPER_ARBITRUM,
        tokenIn: USDT_ADDRESS.toLowerCase() as Address,
        tokenOut: VELA_ADDRESS.toLowerCase() as Address,
        amountOut: GreaterThanOrEqual(parseEther('0.037')),
      })
      expect(apply(transaction, filter)).to.be.false
    })
  })
})
