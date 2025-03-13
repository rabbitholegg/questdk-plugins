import {
  Chains,
  type MintIntentParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk'
import { type Address, parseEther, getAddress, zeroAddress } from 'viem'
import { describe, expect, test } from 'vitest'
import {
  getExternalUrl,
  getFees,
  getMintIntent,
  mint,
  simulateMint,
} from './Coop'
import {
  failingTestCases,
  noTokenIdTestCase,
  passingTestCases,
} from './test-setup'
import { EXPECTED_ENCODED_DATA_1155 } from './test-transactions'

describe('Given the coop plugin', () => {
  describe('When handling the mint', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid mint action', async () => {
        const filter = await mint({
          chainId: 8453,
          contractAddress: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
          tokenId: 1,
        })
        expect(filter).toBeTypeOf('object')
        expect(Number(filter.chainId)).toBe(8453)
        if (typeof filter.to === 'string') {
          expect(filter.to).toMatch(/^0x[a-fA-F0-9]{40}$/)
        } else {
          // if to is an object, it should have a logical operator as the only key
          expect(filter.to).toBeTypeOf('object')
          // @ts-expect-error "to exists on filter"
          expect(Object.keys(filter.to)).toHaveLength(1)
          expect(
            ['$or', '$and'].some((prop) =>
              Object.hasOwnProperty.call(filter.to, prop),
            ),
          ).to.be.true
          // @ts-expect-error "to exists on filter"
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
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await mint(params)
          // @ts-expect-error "transaction is a Transaction"
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await mint(params)
          // @ts-expect-error "transaction is a Transaction"
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    describe('should throw an error when tokenId is not provided', async () => {
      const { params, description } = noTokenIdTestCase
      test(description, async () => {
        try {
          await mint(params)
        } catch (error) {
          expect(error).toBeDefined()
          expect((error as Error).message).toContain('tokenId is required')
        }
      })
    })
  })
})

describe('Given the getMintIntent function', () => {
  // Define the constant for the contract address
  const CONTRACT_ADDRESS = '0x7cac19a3ac8ad29f2c1cea4ad0a16135b969c52c'
  const RECIPIENT_ADDRESS = '0x1234567890123456789012345678901234567890'

  test('returns a TransactionRequest with correct properties when tokenId is set', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      tokenId: 1,
      contractAddress: CONTRACT_ADDRESS,
      amount: BigInt('3'),
      recipient: RECIPIENT_ADDRESS,
    }

    const result = await getMintIntent(mint)

    expect(result).toEqual({
      from: mint.recipient,
      to: mint.contractAddress,
      data: EXPECTED_ENCODED_DATA_1155,
    })
  })
})

describe('Given the getFee function', () => {
  test('should return the correct fee for an 1155 mint', async () => {
    const contractAddress: Address =
      '0x7cac19a3ac8ad29f2c1cea4ad0a16135b969c52c'
    const mintParams = {
      contractAddress,
      tokenId: 1,
      chainId: Chains.BASE,
    }

    const fee = await getFees(mintParams)
    expect(fee.projectFee).toEqual(parseEther('0.0004'))
    expect(fee.actionFee).toEqual(parseEther('0'))
  })
})

describe('simulateMint function', () => {
  test('should simulate a 1155 mint when tokenId is not 0', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: '0x7cac19a3ac8ad29f2c1cea4ad0a16135b969c52c',
      tokenId: 1,
      amount: BigInt(1),
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
    }
    const value = parseEther('0.0004')
    const address = mint.recipient as Address

    const result = await simulateMint(mint as MintIntentParams, value, address)

    const request = result.request
    expect(request.address).toBe(mint.contractAddress)
    expect(request.value).toBe(value)
  })
})

describe('getExternalUrl function', () => {
  // test('should return correct url for mint w/tokenId', async () => {
  //   const params = {
  //     chainId: Chains.BASE,
  //     contractAddress: getAddress('0x7caC19A3aC8aD29F2C1CEA4ad0a16135b969C52c'),
  //     tokenId: 1,
  //   }
  //   const result = await getExternalUrl(params)
  //   expect(result).toBe('https://cooprecords.xyz')
  // })

  test('should return fallback url if error occurs', async () => {
    const params = {
      chainId: Chains.BASE,
      contractAddress: zeroAddress,
    }
    const result = await getExternalUrl(params)
    expect(result).toBe('https://cooprecords.xyz')
  })
})
