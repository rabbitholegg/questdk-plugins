import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { getAddress } from 'viem'
import { GMX_SWAPV1_ABI, GMX_SWAPV2_ABI } from './abi.js'
import { getSupportedTokenAddresses, swap } from './GMX.js'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'
import { SWAP_TOKENS_FOR_TOKENS_V2 } from './test-transactions.js'
import {
  DEFAULT_TOKEN_LIST_URL,
  GMX_ROUTERV1_ADDRESS,
  GMX_ROUTERV2_ADDRESS,
} from './contract-addresses.js'
import { passingTestCasesV1, failingTestCasesV1 } from './test-setup.js'

describe('Given the gmx plugin', () => {
  const BRIDGED_USDC_ADDRESS = '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
  const USDT_ADDRESS = '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'
  const TEST_USER = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'
  describe('When handling the swap', () => {
    // describe('should return a valid action filter', () => {
    //   test('when swapping tokens', async () => {
    //     const filter = await swap({
    //       chainId: ARB_ONE_CHAIN_ID,
    //       contractAddress: GMX_ROUTERV1_ADDRESS,
    //       tokenIn: BRIDGED_USDC_ADDRESS,
    //       tokenOut: USDT_ADDRESS,
    //       amountIn: GreaterThanOrEqual(100000n),
    //       amountOut: GreaterThanOrEqual(100000n),
    //       recipient: TEST_USER,
    //     })

    //     expect(filter).to.deep.equal({
    //       chainId: ARB_ONE_CHAIN_ID,
    //       to: {
    //         $or: [
    //           getAddress(GMX_ROUTERV1_ADDRESS),
    //           getAddress(GMX_ROUTERV2_ADDRESS),
    //         ],
    //       },
    //       input: {
    //         $abiAbstract: [...GMX_SWAPV1_ABI, ...GMX_SWAPV2_ABI],
    //         $or: [
    //           {
    //             // V1 Path
    //             _path: [BRIDGED_USDC_ADDRESS, USDT_ADDRESS],
    //             _amountIn: {
    //               $gte: '100000',
    //             },
    //             _minOut: {
    //               $gte: '100000',
    //             },
    //             _receiver: TEST_USER,
    //           },
    //           {
    //             // V2 Path
    //             $and: [
    //               {
    //                 params: {
    //                   numbers: { minOutputAmount: { $gte: '100000' } },
    //                   orderType: 0,
    //                   addresses: {
    //                     initialCollateralToken: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    //                     receiver: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    //                     // swapPath: [
    //                     //   '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    //                     //   '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    //                     // ],
    //                   },
    //                   shouldUnwrapNativeToken: false
    //                 },
    //               }
    //             ]
    //           },
    //         ],
    //       },
    //     })
    //   })
    // })

    describe('should pass filter with valid V1 transactions', () => {
      passingTestCasesV1.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap({ ...params })
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid V1 transactions', () => {
      failingTestCasesV1.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap({ ...params })
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    test('should pass filter with valid V2 transactions', async () => {
      const transaction = SWAP_TOKENS_FOR_TOKENS_V2
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        tokenIn: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        amountIn: GreaterThanOrEqual(1n),
      })
      expect(apply(transaction, filter)).to.be.true
    })
    test('should not pass filter with invalid tokenIn', async () => {
      const transaction = SWAP_TOKENS_FOR_TOKENS_V2
      const filter = await swap({
        chainId: ARB_ONE_CHAIN_ID,
        tokenIn: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
        amountIn: GreaterThanOrEqual(1n),
      })
      expect(apply(transaction, filter)).to.be.false
    })
    test('should return the correct list of tokens', async () => {
      const tokens = await getSupportedTokenAddresses(ARB_ONE_CHAIN_ID)
      expect(tokens.sort()).to.deep.equal(DEFAULT_TOKEN_LIST_URL.sort())
    })
  })
})
