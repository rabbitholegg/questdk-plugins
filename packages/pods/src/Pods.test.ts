import {
  Chains,
  type MintActionParams,
  type MintIntentParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { apply } from '@rabbitholegg/questdk/filter'
import { mintResponseTokenId, mintResponseUndefined } from './mockedValues'
import { type Address, parseEther } from 'viem'
import { describe, expect, test, vi } from 'vitest'
import { getMintIntent, mint } from './Pods'
// import { getFees, simulateMint } from './Pods'
import { failingTestCases, passingTestCases } from './test-setup'
import { EXPECTED_ENCODED_DATA_1155 } from './test-transactions'

describe('Given the pods plugin', () => {
  describe('When handling the mint', () => {
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
        const { transaction, params, description } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, params, description } = testCase
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
  const CONTRACT_ADDRESS = '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb'
  const RECIPIENT_ADDRESS = '0x1234567890123456789012345678901234567890'

  test('returns a TransactionRequest with correct properties when tokenId is set', async () => {
    const mint: MintIntentParams = {
      chainId: 1,
      tokenId: 1,
      contractAddress: CONTRACT_ADDRESS,
      amount: BigInt('10'),
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
      '0x36cb061f9655368ebae79127c0e8bd34fd5a89c2'
    const mintParams = {
      contractAddress,
      tokenId: 1,
      chainId: Chains.BASE,
    }

    // mock
    const mockFns = {
      getFees: async (_mint: MintActionParams) => ({
        projectFee: parseEther('0'),
        actionFee: parseEther('0.0007'),
      }),
    }
    const getFeesSpy = vi.spyOn(mockFns, 'getFees')
    const fee = await mockFns.getFees(mintParams)
    expect(getFeesSpy).toHaveBeenCalledWith(mintParams)
    expect(fee.projectFee).toEqual(parseEther('0'))
    expect(fee.actionFee).toEqual(parseEther('0.0007'))

    // const { actionFee, projectFee } = await getFees(mintParams)
    // expect(actionFee).equals(parseEther('0'))
    // expect(projectFee).equals(parseEther('0.0007'))
  })
})

describe('simulateMint function', () => {
  test('should simulate a 1155 mint when tokenId is not 0', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: '0x36cb061f9655368ebae79127c0e8bd34fd5a89c2',
      tokenId: 1,
      amount: BigInt(1),
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
    }
    const value = parseEther('0.0007')
    const address = mint.recipient as Address

    // mock
    const mockFns = {
      simulateMint: async (
        _mint: MintIntentParams,
        _value: bigint,
        _address: Address,
      ) => mintResponseTokenId,
    }
    const simulateMintSpy = vi.spyOn(mockFns, 'simulateMint')
    const result = await mockFns.simulateMint(
      mint as MintIntentParams,
      value,
      address,
    )
    expect(simulateMintSpy).toHaveBeenCalledWith(
      mint as MintIntentParams,
      value,
      address,
    )

    // const result = await simulateMint(mint, value, account)

    const request = result.request
    expect(request.address).toBe(mint.contractAddress)
    expect(request.value).toBe(value)
  })

  test('should simulate a 1155 mint when tokenId is undefined', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: '0x7e0b40af1d6f26f2141b90170c513e57b5edd74e',
      amount: BigInt(1),
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
    }
    const value = parseEther('0.0007')
    const address = mint.recipient as Address

    // mock
    const mockFns = {
      simulateMint: async (
        _mint: MintIntentParams,
        _value: bigint,
        _address: Address,
      ) => mintResponseUndefined,
    }
    const simulateMintSpy = vi.spyOn(mockFns, 'simulateMint')
    const result = await mockFns.simulateMint(
      mint as MintIntentParams,
      value,
      address,
    )
    expect(simulateMintSpy).toHaveBeenCalledWith(
      mint as MintIntentParams,
      value,
      address,
    )

    // const result = await simulateMint(mint as MintIntentParams, value, address)

    const request = result.request
    expect(request.address).toBe('0x7e0b40af1d6f26f2141b90170c513e57b5edd74e')
    expect(request.functionName).toBe('mint')
    expect(request.value).toBe(value)
  })
})
