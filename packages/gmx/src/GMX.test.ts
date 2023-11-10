import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { getAddress } from 'viem'
import { GMX_SWAPV1_ABI, GMX_SWAPV2_ABI } from './abi.js'
import { getSupportedTokenAddresses, swap } from './GMX.js'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'
import { Tokens } from './utils.js'
import {
  DEFAULT_TOKEN_LIST_URL,
  GMX_ROUTERV1_ADDRESS,
  GMX_ROUTERV2_ADDRESS,
} from './contract-addresses.js'
import {
  passingTestCasesV1,
  failingTestCasesV1,
  passingTestCasesV2,
  failingTestCasesV2,
} from './test-setup.js'

describe('Given the gmx plugin', () => {
  describe('When handling the swap', () => {
    describe('should return a valid action filter', () => {
      test('when swapping tokens', async () => {
        const filter = await swap({
          chainId: ARB_ONE_CHAIN_ID,
          contractAddress: GMX_ROUTERV1_ADDRESS,
          tokenIn: Tokens.USDCe,
          tokenOut: Tokens.USDT,
          amountIn: GreaterThanOrEqual(100000n),
          amountOut: GreaterThanOrEqual(100000n),
          recipient: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        })

        expect(filter).to.deep.equal({
          chainId: ARB_ONE_CHAIN_ID,
          to: {
            $or: [
              getAddress(GMX_ROUTERV1_ADDRESS),
              getAddress(GMX_ROUTERV2_ADDRESS),
            ],
          },
          input: {
            $or: [
              {
                // V1 Path
                $abi: GMX_SWAPV1_ABI,
                _path: [Tokens.USDCe, Tokens.USDT],
                _amountIn: {
                  $gte: '100000',
                },
                _minOut: {
                  $gte: '100000',
                },
                _receiver: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
              },
              {
                // V2 Path
                $and: [
                  {
                    $abiAbstract: GMX_SWAPV2_ABI,
                    params: {
                      numbers: { minOutputAmount: { $gte: '100000' } },
                      orderType: 0,
                      addresses: {
                        initialCollateralToken: Tokens.USDCe,
                        receiver: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
                        swapPath: {
                          $last: '0xB686BcB112660343E6d15BDb65297e110C8311c4',
                        },
                      },
                      shouldUnwrapNativeToken: false,
                    },
                  },
                  {
                    $abiAbstract: GMX_SWAPV2_ABI,
                    amount: { $gte: '100000' },
                  },
                ],
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

    describe('should not pass filter with invalid V1 transactions', () => {
      failingTestCasesV1.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap({ ...params })
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    describe('should pass filter with valid V2 transactions', () => {
      passingTestCasesV2.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap({ ...params })
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid V2 transactions', () => {
      failingTestCasesV2.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap({ ...params })
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    test('should return the correct list of tokens', async () => {
      const tokens = await getSupportedTokenAddresses(ARB_ONE_CHAIN_ID)
      expect(tokens.sort()).to.deep.equal(DEFAULT_TOKEN_LIST_URL.sort())
    })
  })
})
