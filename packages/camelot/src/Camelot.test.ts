import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk'
import { describe, expect, test } from 'vitest'
import {
  CAMELOT_V2_ROUTER,
  CAMELOT_V3_ROUTER,
  DEFAULT_TOKEN_LIST,
  PARASWAP_ROUTER,
} from './contract-addresses'
import {
  CAMELOT_V2_ABI,
  CAMELOT_V3_EXACT_INPUT_ABI,
  CAMELOT_V3_EXACT_OUTPUT_ABI,
  PARASWAP_ABI,
} from './abi'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { parseEther, getAddress } from 'viem'
import { swap } from './Camelot'
import { Tokens } from './utils'
import { failingTestCases, passingTestCases } from './test-setup'

describe('Given the camelot plugin', () => {
  describe('should return a valid action filter', () => {
    test('when making a valid swap action', async () => {
      const filter = await swap({
        chainId: 1,
      })
      expect(filter).toBeTypeOf('object')
      expect(Number(filter.chainId)).toBe(1)
      if (typeof filter.to === 'string') {
        expect(filter.to).toMatch(/^0x[a-fA-F0-9]{40}$/)
      } else {
        // if to is an object, it should have a logical operator as the only key
        expect(filter.to).toBeTypeOf('object')
        expect(Object.keys(filter.to)).toHaveLength(1)
        expect(
          ['$or', '$and'].some((prop) =>
            Object.hasOwnProperty.call(filter.to, prop),
          ),
        ).to.be.true
        expect(Object.values(filter.to)[0]).to.satisfy((arr: string[]) =>
          arr.every((val) => val.match(/^0x[a-fA-F0-9]{40}$/)),
        )
      }
      // Check the input property is the correct type and has a valid filter operator
      expect(filter.input).toBeTypeOf('object')
      expect(
        ['$abi', '$abiParams', '$abiAbstract', '$or', '$and'].some((prop) =>
          Object.hasOwnProperty.call(filter.input, prop),
        ),
      ).to.be.true
    })
  })

  describe('should pass filter when all parameters are valid', () => {
    passingTestCases.forEach((testCase) => {
      const { transaction, params, description } = testCase
      test(description, async () => {
        const filter = await swap({ ...params })
        expect(apply(transaction, filter)).to.be.true
      })
    })
  })

  describe('should not pass filter when parameters are invalid', () => {
    failingTestCases.forEach((testCase) => {
      const { transaction, params, description } = testCase
      test(description, async () => {
        const filter = await swap({ ...params })
        expect(apply(transaction, filter)).to.be.false
      })
    })
  })

  describe('all supported tokens addresses are properly checksummed', () => {
    test('should have all addresses properly checksummed', () => {
      const notChecksummed = DEFAULT_TOKEN_LIST.filter(
        (tokenAddress) => tokenAddress !== getAddress(tokenAddress),
      )
      expect(notChecksummed).to.be.empty
    })
  })
})
