import { getFees, mint } from './Foundation'
import { failingTestCases, passingTestCases } from './test-transactions'
import { apply } from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { Address, parseEther } from 'viem'
import { describe, expect, test } from 'vitest'

describe('Given the foundation plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid mint action', async () => {
        const contractAddress = '0x42cfdEa063311DFE9BbB3d7B598FeA24067909b4'
        const filter = await mint({
          chainId: 1,
          contractAddress,
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
        expect(filter.input).toHaveProperty('nftContract', contractAddress)
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

  describe('Given the getFee function', () => {
    test('should return the correct fee for fixed fee mint', async () => {
      const contractAddress: Address =
        '0xead6dca70b0465725a57eb81f7d3ab8b5e0b81b4'
      const mintParams = {
        contractAddress,
        chainId: Chains.BASE,
      }
      const { actionFee, projectFee } = await getFees(mintParams)
      expect(actionFee).equals(parseEther('0.005'))
      expect(projectFee).equals(parseEther('0.0008'))
    })

    test('should return the correct fee for dutch auction mint', async () => {
      const contractAddress: Address =
        '0x6a41fcce9d075a9f6324b626af56cf632c509ec9'
      const mintParams = {
        contractAddress,
        chainId: Chains.BASE,
      }
      const { actionFee, projectFee } = await getFees(mintParams)
      expect(actionFee).equals(parseEther('0.0008'))
      expect(projectFee).equals(parseEther('0.0008'))
    })

    test('should return the fallback fee if contract not found or error occurs', async () => {
      const contractAddress: Address =
        '0x68adf0c109e63c6141c509fea0864431ba55bfa5'
      const mintParams = {
        contractAddress,
        chainId: Chains.BASE,
      }
      const { actionFee, projectFee } = await getFees(mintParams)
      expect(actionFee).equals(parseEther('0'))
      expect(projectFee).equals(parseEther('0.0008'))
    })
  })
})
