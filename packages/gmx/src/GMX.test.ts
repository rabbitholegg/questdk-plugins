import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { GMX_SWAPV1_ABI, GMX_SWAPV2_ABI } from './abi.js'
import { getSupportedTokenAddresses, swap } from './GMX.js'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'
import { SWAP_ETH_V2 } from './test-transactions.js'
import {
  DEFAULT_TOKEN_LIST_URL,
  GMX_ROUTERV1_ADDRESS,
  GMX_ROUTERV2_ADDRESS,
} from './contract-addresses.js'
import { passingTestCasesV1 } from './test-setup.js'

describe('Given the gmx plugin', () => {
  const BRIDGED_USDC_ADDRESS = '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
  const USDT_ADDRESS = '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'
  const TEST_USER = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'
  describe('When handling the swap', () => {
    describe('should return a valid action filter', () => {
      test('when swapping tokens', async () => {
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
          chainId: ARB_ONE_CHAIN_ID,
          to: {
            $or: [
              '0xabbc5f99639c9b6bcb58544ddf04efa6802f4064',
              '0x3b070aa6847bd0fb56efadb351f49bbb7619dbc2',
            ],
          },
          input: {
            $abiAbstract: [...GMX_SWAPV1_ABI, ...GMX_SWAPV2_ABI],
            $or: [
              {
                // V1 Path
                _path: [BRIDGED_USDC_ADDRESS, USDT_ADDRESS],
                _amountIn: {
                  $gte: '100000',
                },
                _minOut: {
                  $gte: '100000',
                },
                _receiver: TEST_USER,
              },
              {
                // V2 Path
                params: {
                  numbers: { minOutputAmount: { $gte: '100000' } },
                  orderType: 0,
                  addresses: {
                    receiver: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
                    swapPath: [
                      '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
                      '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                    ],
                  },
                },
              },
            ],
          },
        })
      })
    })
    describe('should pass filter with valid V1 transactions', () => {
      passingTestCasesV1.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap({ ...params })
          expect(apply(transaction, filter)).to.be.true
        })
      })
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
    test('should return the correct list of tokens', async () => {
      const tokens = await getSupportedTokenAddresses(ARB_ONE_CHAIN_ID)
      expect(tokens).to.deep.equal(DEFAULT_TOKEN_LIST_URL)
    })
  })
})
