import { apply } from '@rabbitholegg/questdk'
import {
  Chains,
  type MintIntentParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { describe, expect, test } from 'vitest'
import { passingTestCases, failingTestCases } from './test-transactions'
import { mint, getFees, getMintIntent, simulateMint } from './Paragraph'
import { type Address } from 'viem'

describe('Given the paragraph plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid mint action', async () => {
        const filter = await mint({
          chainId: 1,
          contractAddress: '0x23d87d8c9704b8bcdbac042b9a59a142f0f10298',
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

describe('Given the getMintIntent function', () => {
  // Define the constant for the contract address
  const CONTRACT_ADDRESS = '0x48cE2aA2c8B8c321883Ea9f2459a5dA9279DcA88'
  const RECIPIENT_ADDRESS = '0x1234567890123456789012345678901234567890'

  test('returns a TransactionRequest with correct properties when tokenId is set', async () => {
    const mint = {
      chainId: Chains.BASE,
      contractAddress: CONTRACT_ADDRESS,
      recipient: RECIPIENT_ADDRESS,
    }
    const result = await getMintIntent(mint as MintIntentParams)
    expect(result).toEqual({
      from: mint.recipient,
      to: mint.contractAddress,
      data: '0x13c84557000000000000000000000000123456789012345678901234567890123456789000000000000000000000000048e6a039bcf6d99806ce4595fc59e4a7c0caab19',
    })
  })
})

describe('simulateMint function', () => {
  test('should simulate a 1155 mint when tokenId is not 0', async () => {
    const mint = {
      chainId: Chains.BASE,
      contractAddress: '0x48cE2aA2c8B8c321883Ea9f2459a5dA9279DcA88',
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
    }
    const value = 1077000000000000n
    const account = '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF'

    const result = await simulateMint(mint as MintIntentParams, value, account)
    const request = result.request
    expect(request.address).toBe(mint.contractAddress)
    expect(request.value).toBe(value)
  })
})

describe('Given the getFee function', () => {
  test('should return the correct project + action fee for a 721 mint', async () => {
    const contractAddress: Address =
      '0x48cE2aA2c8B8c321883Ea9f2459a5dA9279DcA88'
    const mintParams = { contractAddress, chainId: Chains.BASE }

    const fee = await getFees(mintParams)
    expect(fee.projectFee).equals(777000000000000n)
    expect(fee.actionFee).equals(300000000000000n)
  })
})
