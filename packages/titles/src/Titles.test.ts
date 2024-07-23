import { create, getFees, mint, simulateMint } from './Titles'
import {
  failingTestCasesCreate,
  failingTestCasesMint,
  passingTestCasesCreate,
  passingTestCasesMint,
} from './test-transactions'
import { apply } from '@rabbitholegg/questdk'
import { Chains, type MintIntentParams } from '@rabbitholegg/questdk-plugin-utils'
import { parseEther, type Address } from 'viem'
import { describe, expect, test } from 'vitest'

describe('Given the titles plugin', () => {
  describe('When handling the create action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid create action', async () => {
        const filter = await create({
          chainId: 8453,
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
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCasesCreate.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await create(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCasesCreate.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await create(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })

  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid mint action', async () => {
        const filter = await mint({
          chainId: 8453,
          contractAddress: '0x04e4d53374a5e6259ce06cfc6850a839bd960d01',
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
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCasesMint.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCasesMint.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})

describe('Given the getFee function', () => {
  test('should return the correct fee for V2 mint', async () => {
    const contractAddress: Address =
      '0x06d7D870a41a44B5b7eBF46019bD5f8487362de3'
    const mintParams = {
      contractAddress,
      chainId: Chains.BASE,
      tokenId: 5,
    }

    const fee = await getFees(mintParams)
    expect(fee.projectFee).toEqual(parseEther('0.0005'))
    expect(fee.actionFee).toEqual(parseEther('0'))
  })
})

describe('simulateMint function', () => {
  test('should simulate a V2 mint', async () => {
    const contractAddress: Address =
      '0x432f4Ccc39AB8DD8015F590a56244bECb8D16933'
    const mintParams = {
      contractAddress,
      chainId: Chains.BASE,
      tokenId: 4,
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
    }
    const value = parseEther('0.0005')
    const address = mintParams.recipient as Address

    const result = await simulateMint(
      mintParams as MintIntentParams,
      value,
      address,
    )

    const request = result.request
    expect(request.address).toBe('0x432f4Ccc39AB8DD8015F590a56244bECb8D16933')
    expect(request.functionName).toBe('mint')
    expect(request.value).toBe(value)
  })

  test('should simulate a V2 mint', async () => {
    const contractAddress: Address =
      '0x06d7D870a41a44B5b7eBF46019bD5f8487362de3'
    const mintParams = {
      contractAddress,
      chainId: Chains.BASE,
      tokenId: 5,
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
    }
    const value = parseEther('0.0005')
    const address = mintParams.recipient as Address

    const result = await simulateMint(
      mintParams as MintIntentParams,
      value,
      address,
    )

    const request = result.request
    expect(request.address).toBe('0x06d7D870a41a44B5b7eBF46019bD5f8487362de3')
    expect(request.functionName).toBe('mint')
    expect(request.value).toBe(value)
  })
})
