import { apply } from '@rabbitholegg/questdk'
import {
  Chains,
  type MintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address, parseEther } from 'viem'
import { describe, expect, test, vi } from 'vitest'
import { passingTestCases, failingTestCases } from './test-transactions'
import { getFees, mint } from './ThirdWeb'

describe('Given the thirdweb plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid mint action', async () => {
        const filter = await mint({
          chainId: 8453,
          contractAddress: '0xc7DeD9c1BD13A19A877d196Eeea9222Ff6d40736',
        })
        expect(filter).toBeTypeOf('object')
        expect(Number(filter.chainId)).toBe(8453)
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
          try {
            const filter = await mint(params)
            const result = apply(transaction, filter)
            expect(result).toBe(false)
          } catch (error) {
            expect(error).toBeDefined()
          }
        })
      })
    })
  })

  describe('Given the getFee function', () => {
    test('should return the correct fee for OpenEditionERC721 mint', async () => {
      const contractAddress: Address =
        '0xc7DeD9c1BD13A19A877d196Eeea9222Ff6d40736'
      const mintParams = {
        contractAddress,
        chainId: Chains.BASE,
      }

      // // mock
      // const mockFns = {
      //   getFees: async (_mint: MintActionParams) => ({
      //     projectFee: parseEther('0'),
      //     actionFee: parseEther('0.000777'),
      //   }),
      // }
      // const getProjectsFeeSpy = vi.spyOn(mockFns, 'getFees')
      // const fee = await mockFns.getFees(mintParams)
      // expect(getProjectsFeeSpy).toHaveBeenCalledWith(mintParams)
      // expect(fee.projectFee).toEqual(parseEther('0'))
      // expect(fee.actionFee).toEqual(parseEther('0.000777'))

      const { actionFee, projectFee } = await getFees(mintParams)
      expect(actionFee).equals(parseEther('0.000777'))
      expect(projectFee).equals(parseEther('0'))
    })

    test('should return the correct fee for DropERC1155 mint', async () => {
      const contractAddress: Address =
        '0x5625e0ae98C035407258D6752703fed917417Add'
      const mintParams = {
        contractAddress,
        chainId: Chains.BASE,
        tokenId: 0,
      }

      // // mock
      // const mockFns = {
      //   getFees: async (_mint: MintActionParams) => ({
      //     projectFee: parseEther('0'),
      //     actionFee: parseEther('0.000777'),
      //   }),
      // }
      // const getProjectsFeeSpy = vi.spyOn(mockFns, 'getFees')
      // const fee = await mockFns.getFees(mintParams)
      // expect(getProjectsFeeSpy).toHaveBeenCalledWith(mintParams)
      // expect(fee.projectFee).toEqual(parseEther('0'))
      // expect(fee.actionFee).toEqual(parseEther('0.000777'))

      const { actionFee, projectFee } = await getFees(mintParams)
      expect(actionFee).equals(parseEther('0.000777'))
      expect(projectFee).equals(parseEther('0'))
    })

    test('should return the fallback fee if contract not found or error occurs', async () => {
      const contractAddress: Address =
        '0x68adf0c109e63c6141c509fea0864431ba55bfa5'
      const mintParams = {
        contractAddress,
        chainId: Chains.BASE,
      }

      // // mock
      // const mockFns = {
      //   getFees: async (_mint: MintActionParams) => ({
      //     projectFee: parseEther('0'),
      //     actionFee: parseEther('0'),
      //   }),
      // }
      // const getFeesSpy = vi.spyOn(mockFns, 'getFees')
      // const fee = await mockFns.getFees(mintParams)
      // expect(getFeesSpy).toHaveBeenCalledWith(mintParams)
      // expect(fee.projectFee).toEqual(parseEther('0'))
      // expect(fee.actionFee).toEqual(parseEther('0'))

      const { actionFee, projectFee } = await getFees(mintParams)
      expect(actionFee).equals(parseEther('0'))
      expect(projectFee).equals(parseEther('0'))
    })
  })
})
