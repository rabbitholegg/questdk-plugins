import { apply } from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { describe, expect, test } from 'vitest'
import { passingTestCases, failingTestCases } from './test-transactions'
import { mint, getFees, getProjectFees } from './Manifold'
import { parseEther, type Address } from 'viem'

describe('Given the manifold plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid mint action', async () => {
        const filter = await mint({
          chainId: 1,
          contractAddress: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
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

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})

describe('Given the getProjectFee function', () => {
  test('should return the correct fee for a 721 mint', async () => {
    const contractAddress: Address =
      '0x6935cd348193bab133f3081f53eb99ee6f0d685b'
    const mintParams = { contractAddress, chainId: Chains.OPTIMISM }
    const fee = await getProjectFees(mintParams)
    expect(fee).equals(parseEther('0.0005'))
  })

  test('should return the correct fee for an 1155 mint', async () => {
    const contractAddress: Address =
      '0xe096f28c87f331758af3da402add89b33a2853d8'
    const mintParams = {
      contractAddress,
      tokenId: 1,
      chainId: Chains.BASE,
      amount: 1,
    }
    const fee = await getProjectFees(mintParams)
    expect(fee).equals(parseEther('0.00102'))
  })
})

describe('Given the getFee function', () => {
  test('should return the correct project + action fee for a 721 mint', async () => {
    const contractAddress: Address =
      '0x6935cd348193bab133f3081f53eb99ee6f0d685b'
    const mintParams = { contractAddress, chainId: Chains.OPTIMISM }
    const fee = await getFees(mintParams)
    expect(fee.projectFee).equals(parseEther('0.0005'))
    expect(fee.actionFee).equals(0n)
  })

  test('should return the correct project + action fee for an 1155 mint', async () => {
    const contractAddress: Address =
      '0xe096f28c87f331758af3da402add89b33a2853d8'
    const tokenId = 1
    const mintParams = {
      contractAddress,
      tokenId,
      chainId: Chains.BASE,
      amount: 1,
    }
    const fee = await getFees(mintParams)
    expect(fee.projectFee).equals(parseEther('0.0005'))
    expect(fee.actionFee).equals(parseEther('0.00052'))
  })
})