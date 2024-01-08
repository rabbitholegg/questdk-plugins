import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { VAULT_ABI } from './abi.js'
import { getSupportedTokenAddresses, swap, mint, stake } from './Vela.js'
import { CHAIN_ID_ARRAY } from './chain-ids.js'
import {
  VAULT_CONTRACT,
  VLP_CONTRACT,
  VELA_CONTRACT,
} from './contract-addresses.js'
import {
  passingTestCasesV1,
  failingTestCasesV1,
} from './test-setup.js'

describe('Given the vela plugin', () => {
  describe('When handling the swap', () => {
    describe('should return a valid action filter', () => {
      test('when swapping tokens', async () => {
        const filter = await swap({
          chainId: CHAIN_ID_ARRAY[0],
          contractAddress: VAULT_CONTRACT,
          amountIn: GreaterThanOrEqual(100000),
          amountOut: GreaterThanOrEqual(100000),
          deadline: GreaterThanOrEqual(100000),
          recipient: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        })

        expect(filter).to.deep.equal({
          chainId: CHAIN_ID_ARRAY[0],
          to: {
            $or: [
              VAULT_CONTRACT.toLowerCase(),
            ],
          },
          input: {
            $or: [
              {
                // V1 Path
                $abi: VAULT_ABI,
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

    test('should return the correct list of tokens', async () => {
      const tokens = await getSupportedTokenAddresses(ARB_ONE_CHAIN_ID)
      expect(tokens.sort()).to.deep.equal(DEFAULT_TOKEN_LIST.sort())
    })
  })

  describe('When handling mint vlp', () => {
    describe('should return a valid action filter', () => {
      test('when swapping tokens', async () => {
        const filter = await swap({
          chainId: CHAIN_ID_ARRAY[0],
          contractAddress: VAULT_CONTRACT,
          tokenIn: Tokens.USDCe,
          tokenOut: Tokens.USDT,
          amountIn: GreaterThanOrEqual(100000n),
          amountOut: GreaterThanOrEqual(100000n),
          recipient: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        })

        expect(filter).to.deep.equal({
          chainId: CHAIN_ID_ARRAY[0],
          to: {
            $or: [
              VAULT_CONTRACT.toLowerCase(),
            ],
          },
          input: {
            $or: [
              {
                // V1 Path
                $abi: VAULT_ABI,
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

    test('should return the correct list of tokens', async () => {
      const tokens = await getSupportedTokenAddresses(ARB_ONE_CHAIN_ID)
      expect(tokens.sort()).to.deep.equal(DEFAULT_TOKEN_LIST.sort())
    })
  })

  describe('When handling stake vlp', () => {
    describe('should return a valid action filter', () => {
      test('when swapping tokens', async () => {
        const filter = await swap({
          chainId: CHAIN_ID_ARRAY[0],
          contractAddress: VAULT_CONTRACT,
          tokenIn: Tokens.USDCe,
          tokenOut: Tokens.USDT,
          amountIn: GreaterThanOrEqual(100000n),
          amountOut: GreaterThanOrEqual(100000n),
          recipient: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        })

        expect(filter).to.deep.equal({
          chainId: CHAIN_ID_ARRAY[0],
          to: {
            $or: [
              VAULT_CONTRACT.toLowerCase(),
            ],
          },
          input: {
            $or: [
              {
                // V1 Path
                $abi: VAULT_ABI,
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

    test('should return the correct list of tokens', async () => {
      const tokens = await getSupportedTokenAddresses(ARB_ONE_CHAIN_ID)
      expect(tokens.sort()).to.deep.equal(DEFAULT_TOKEN_LIST.sort())
    })
  })

  describe('When handling stake vela', () => {
    describe('should return a valid action filter', () => {
      test('when swapping tokens', async () => {
        const filter = await swap({
          chainId: CHAIN_ID_ARRAY[0],
          contractAddress: VAULT_CONTRACT,
          tokenIn: Tokens.USDCe,
          tokenOut: Tokens.USDT,
          amountIn: GreaterThanOrEqual(100000n),
          amountOut: GreaterThanOrEqual(100000n),
          recipient: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        })

        expect(filter).to.deep.equal({
          chainId: CHAIN_ID_ARRAY[0],
          to: {
            $or: [
              VAULT_CONTRACT.toLowerCase(),
            ],
          },
          input: {
            $or: [
              {
                // V1 Path
                $abi: VAULT_ABI,
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

    test('should return the correct list of tokens', async () => {
      const tokens = await getSupportedTokenAddresses(ARB_ONE_CHAIN_ID)
      expect(tokens.sort()).to.deep.equal(DEFAULT_TOKEN_LIST.sort())
    })
  })
})