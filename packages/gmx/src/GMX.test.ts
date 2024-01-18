import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { GMX_SEND_TOKENS_ABI, GMX_SWAPV1_ABI, GMX_SWAPV2_ABI } from './abi.js'
import {
  getOrderType,
  getSupportedTokenAddresses,
  options,
  swap,
} from './GMX.js'
import { ARB_ONE_CHAIN_ID } from './chain-ids.js'
import { Tokens } from './utils.js'
import {
  DEFAULT_TOKEN_LIST,
  GMX_ROUTERV2_ADDRESS,
} from './contract-addresses.js'
import {
  passingTestCasesV2,
  failingTestCasesV2,
  failingOptionsTestCases,
  passingOptionsTestCases,
} from './test-setup.js'
import { OrderType, type OptionsActionParams } from '@rabbitholegg/questdk'
import { parseUnits } from 'viem'

describe('Given the gmx plugin', () => {
  describe('When handling the swap', () => {
    describe('should return a valid action filter', () => {
      test('when swapping tokens', async () => {
        const filter = await swap({
          chainId: ARB_ONE_CHAIN_ID,
          contractAddress: GMX_ROUTERV2_ADDRESS,
          tokenIn: Tokens.USDCe,
          tokenOut: Tokens.USDT,
          amountIn: GreaterThanOrEqual(100000n),
          amountOut: GreaterThanOrEqual(100000n),
          recipient: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        })

        expect(filter).to.deep.equal({
          chainId: ARB_ONE_CHAIN_ID,
          to: {
            $or: [GMX_ROUTERV2_ADDRESS.toLowerCase()],
          },
          input: {
            $or: [
              {
                // V1 Path
                $abi: GMX_SWAPV1_ABI,
                _path: {
                  $and: [{ $first: Tokens.USDCe }, { $last: Tokens.USDT }],
                },
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
                      orderType: { $lte: 1 },
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
      expect(tokens.sort()).to.deep.equal(DEFAULT_TOKEN_LIST.sort())
    })
  })
  describe('When handling the options', () => {
    describe('should return a valid action filter', () => {
      test('when handling options', async () => {
        const optionsParams: OptionsActionParams = {
          chainId: 42161,
          contractAddress: '0x7c68c7866a64fa2160f78eeae12217ffbf871fa8',
          token: '0x1d2107fa8bcb78826ce30c9bbc05e97b114cf6d1',
          amount: GreaterThanOrEqual(parseUnits('0.0019', 18)),
          recipient: '0x1d2107fa8bcb78826ce30c9bbc05e97b114cf6d1',
          orderType: OrderType.Limit,
        }

        const filter = await options(optionsParams)

        const expectedFilter = {
          chainId: optionsParams.chainId,
          to: GMX_ROUTERV2_ADDRESS.toLowerCase(),
          $and: [
            {
              input: {
                $abiAbstract: GMX_SWAPV2_ABI,
                params: {
                  ...getOrderType(optionsParams.orderType),
                  addresses: {
                    initialCollateralToken: optionsParams.token,
                    receiver: optionsParams.recipient,
                  },
                },
              },
            },
            {
              $or: [
                {
                  input: {
                    $abiAbstract: GMX_SEND_TOKENS_ABI,
                    amount: {
                      $gte: '1900000000000000',
                    },
                  },
                },
                {
                  value: {
                    $gte: '1900000000000000',
                  },
                },
              ],
            },
          ],
        }

        expect(filter).toEqual(expectedFilter)
      })
    })
    describe('should not pass filter with invalid V2 transactions', () => {
      failingOptionsTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await options({ ...params })
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
    describe('should pass filter with valid V2 transactions', () => {
      passingOptionsTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await options({ ...params })
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })
  })
})
