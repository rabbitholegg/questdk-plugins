import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { TOKENFARM_ABI, TOKENFARM_ABI2, VAULT_ABI } from './abi.js'
import { swap, mint, stake } from './Vela.js'
import { CHAIN_ID_ARRAY } from './chain-ids.js'
import {
  VAULT_CONTRACT,
  VLP_CONTRACT,
  VELA_CONTRACT,
  TOKENFARM_CONTRACT,
} from './contract-addresses.js'
import {
  passingTestCases,
  failingTestCases,
} from './test-setup.js'

describe('Given the vela plugin', () => {
  describe('When handling the swap', () => {
    describe('should return a valid action filter', () => {
      test('when trading', async () => {
        const filter = await swap({
          chainId: CHAIN_ID_ARRAY[0],
          contractAddress: VAULT_CONTRACT,
          amountIn: GreaterThanOrEqual(100000),
          amountOut: GreaterThanOrEqual(100000),
          deadline: GreaterThanOrEqual(100000),
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
                $abi: VAULT_ABI,
                a: {
                  $gte: '100000',
                },
                b: {
                  $gte: '100000',
                },
                c: {
                  $gte: '100000',
                },
              },
            ],
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap({ ...params })
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await swap({ ...params })
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })

  describe('When handling mint vlp', () => {
    describe('should return a valid action filter', () => {
      test('when swapping tokens', async () => {
        const filter = await swap({
          chainId: CHAIN_ID_ARRAY[0],
          contractAddress: VAULT_CONTRACT,
          tokenIn: '0xc5b2d9fda8a82e8dcecd5e9e6e99b78a9188eb05',
          amountIn: GreaterThanOrEqual(100000),
          recipient: '0x786B201f4E0DBfBadd2F0BA89d8240591D25B2c7',
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
                $abi: VAULT_ABI,
                _token: '0xc5b2d9fda8a82e8dcecd5e9e6e99b78a9188eb05',
                _amount: {
                  $gte: '100000',
                },
                _account: '0x786B201f4E0DBfBadd2F0BA89d8240591D25B2c7',
              },
            ],
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await mint({ ...params })
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await mint({ ...params })
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })

  describe('When handling stake vlp', () => {
    describe('should return a valid action filter', () => {
      test('when staking vlp', async () => {
        const filter = await stake({
          chainId: CHAIN_ID_ARRAY[0],
          contractAddress: TOKENFARM_CONTRACT,
          amountOne: GreaterThanOrEqual(100000),
          tokenOne: '0xc5b2d9fda8a82e8dcecd5e9e6e99b78a9188eb05',
        })

        expect(filter).to.deep.equal({
          chainId: CHAIN_ID_ARRAY[0],
          to: {
            $or: [
              TOKENFARM_CONTRACT.toLowerCase(),
            ],
          },
          input: {
            $or: [
              {
                $abi: TOKENFARM_ABI,
                _amount: {
                  $gte: '100000',
                },
              },
            ],
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await stake({ ...params })
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await stake({ ...params })
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })

  describe('When handling stake vela', () => {
    describe('should return a valid action filter', () => {
      test('when staking vela', async () => {
        const filter = await stake({
          chainId: CHAIN_ID_ARRAY[0],
          contractAddress: TOKENFARM_CONTRACT,
          amountOne: GreaterThanOrEqual(100000),
          tokenOne: '0x088cd8f5ef3652623c22d48b1605dcfe860cd704',
        })

        expect(filter).to.deep.equal({
          chainId: CHAIN_ID_ARRAY[0],
          to: {
            $or: [
              TOKENFARM_CONTRACT.toLowerCase(),
            ],
          },
          input: {
            $or: [
              {
                $abi: TOKENFARM_ABI2,
                _amount: {
                  $gte: '100000',
                },
              },
            ],
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await stake({ ...params })
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await stake({ ...params })
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})