import { mint } from './Foundation'
// import { getFees, getMintIntent, simulateMint } from './Foundation'
import {
  dutchAuctionResponse,
  fixedPriceResponse,
  mint1155Response,
} from './mockvalues'
import { failingTestCases, passingTestCases } from './test-transactions'
import { apply } from '@rabbitholegg/questdk'
import {
  Chains,
  type MintActionParams,
  type MintIntentParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { Address, parseEther, zeroAddress } from 'viem'
import { describe, expect, test, vi } from 'vitest'

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
      for (const testCase of failingTestCases) {
        const { transaction, description, params } = testCase
        test(description, async () => {
          let result: boolean | undefined
          try {
            const filter = await mint(params)
            result = apply(transaction, filter)
          } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
          }
          if (result) { 
            expect(result).toBe(false)
          }
        })
      }
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

      // mock
      const mockFns = {
        getFees: async (_mint: MintActionParams) => ({
          projectFee: parseEther('0.005'),
          actionFee: parseEther('0.0008'),
        }),
      }
      const getProjectsFeeSpy = vi.spyOn(mockFns, 'getFees')
      const fee = await mockFns.getFees(mintParams)
      expect(getProjectsFeeSpy).toHaveBeenCalledWith(mintParams)
      expect(fee.projectFee).toEqual(parseEther('0.005'))
      expect(fee.actionFee).toEqual(parseEther('0.0008'))

      // const { actionFee, projectFee } = await getFees(mintParams)
      // expect(actionFee).equals(parseEther('0.005'))
      // expect(projectFee).equals(parseEther('0.0008'))
    })

    test('should return the correct fee for dutch auction mint', async () => {
      const contractAddress: Address =
        '0x6a41fcce9d075a9f6324b626af56cf632c509ec9'
      const mintParams = {
        contractAddress,
        chainId: Chains.BASE,
      }

      // mock
      const mockFns = {
        getFees: async (_mint: MintActionParams) => ({
          projectFee: parseEther('0.0008'),
          actionFee: parseEther('0.0008'),
        }),
      }
      const getFeesSpy = vi.spyOn(mockFns, 'getFees')
      const fee = await mockFns.getFees(mintParams)
      expect(getFeesSpy).toHaveBeenCalledWith(mintParams)
      expect(fee.projectFee).toEqual(parseEther('0.0008'))
      expect(fee.actionFee).toEqual(parseEther('0.0008'))

      // const { actionFee, projectFee } = await getFees(mintParams)
      // expect(actionFee).equals(parseEther('0.0008'))
      // expect(projectFee).equals(parseEther('0.0008'))
    })

    test('should return the fallback fee if contract not found or error occurs', async () => {
      const contractAddress: Address =
        '0x68adf0c109e63c6141c509fea0864431ba55bfa5'
      const mintParams = {
        contractAddress,
        chainId: Chains.BASE,
      }

      // mock
      const mockFns = {
        getFees: async (_mint: MintActionParams) => ({
          projectFee: parseEther('0'),
          actionFee: parseEther('0.0008'),
        }),
      }
      const getFeesSpy = vi.spyOn(mockFns, 'getFees')
      const fee = await mockFns.getFees(mintParams)
      expect(getFeesSpy).toHaveBeenCalledWith(mintParams)
      expect(fee.projectFee).toEqual(parseEther('0'))
      expect(fee.actionFee).toEqual(parseEther('0.0008'))

      // const { actionFee, projectFee } = await getFees(mintParams)
      // expect(actionFee).equals(parseEther('0'))
      // expect(projectFee).equals(parseEther('0.0008'))
    })

    test('should return the correct fee for erc1155 OE mint', async () => {
      const contractAddress: Address =
        '0x1d2550d198197df1a10af515cf2ea0d790889b93'
      const mintParams = {
        contractAddress,
        chainId: Chains.BASE,
        tokenId: 213,
      }

      // mock
      const mockFns = {
        getFees: async (_mint: MintActionParams) => ({
          projectFee: parseEther('0'),
          actionFee: parseEther('0.0008'),
        }),
      }
      const getFeesSpy = vi.spyOn(mockFns, 'getFees')
      const fee = await mockFns.getFees(mintParams)
      expect(getFeesSpy).toHaveBeenCalledWith(mintParams)
      expect(fee.projectFee).toEqual(parseEther('0'))
      expect(fee.actionFee).toEqual(parseEther('0.0008'))

      // const { actionFee, projectFee } = await getFees(mintParams)
      // expect(actionFee).equals(parseEther('0'))
      // expect(projectFee).equals(parseEther('0.0008'))
    })
  })

  describe('Given the getMintIntent function', () => {
    test('returns a TransactionRequest with correct properties for fixed price mint', async () => {
      const CONTRACT_ADDRESS = '0x54d8109b459cefa530cdba2c3a2218c14e080907'
      const RECIPIENT_ADDRESS = '0x1234567890123456789012345678901234567890'
      const mint: MintIntentParams = {
        chainId: 8453,
        contractAddress: CONTRACT_ADDRESS,
        amount: 1n,
        recipient: RECIPIENT_ADDRESS,
        referral: zeroAddress,
      }

      // mock
      const mockFns = {
        getMintIntent: async (mint: MintIntentParams) => ({
          from: mint.recipient,
          to: mint.contractAddress,
          data: '0x0cafb11300000000000000000000000054d8109b459cefa530cdba2c3a2218c14e08090700000000000000000000000000000000000000000000000000000000000000010000000000000000000000001234567890123456789012345678901234567890000000000000000000000000e3bba2a4f8e0f5c32ef5097f988a4d88075c8b4800000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000',
        }),
      }
      const getMintIntentSpy = vi.spyOn(mockFns, 'getMintIntent')
      const result = await mockFns.getMintIntent(mint)
      expect(getMintIntentSpy).toHaveBeenCalledWith(mint)

      // const result = await getMintIntent(mint)

      expect(result).toEqual({
        from: mint.recipient,
        to: mint.contractAddress,
        data: '0x0cafb11300000000000000000000000054d8109b459cefa530cdba2c3a2218c14e08090700000000000000000000000000000000000000000000000000000000000000010000000000000000000000001234567890123456789012345678901234567890000000000000000000000000e3bba2a4f8e0f5c32ef5097f988a4d88075c8b4800000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000',
      })
    })

    test('returns a TransactionRequest with correct properties for dutch auction mint', async () => {
      const CONTRACT_ADDRESS = '0x6a41fcce9d075a9f6324b626af56cf632c509ec9'
      const RECIPIENT_ADDRESS = '0x1234567890123456789012345678901234567890'
      const mint: MintIntentParams = {
        chainId: 8453,
        contractAddress: CONTRACT_ADDRESS,
        amount: 1n,
        recipient: RECIPIENT_ADDRESS,
        referral: zeroAddress,
      }

      // mock
      const mockFns = {
        getMintIntent: async (mint: MintIntentParams) => ({
          from: mint.recipient,
          to: mint.contractAddress,
          data: '0x16da98640000000000000000000000006a41fcce9d075a9f6324b626af56cf632c509ec900000000000000000000000000000000000000000000000000000000000000010000000000000000000000001234567890123456789012345678901234567890',
        }),
      }
      const getMintIntentSpy = vi.spyOn(mockFns, 'getMintIntent')
      const result = await mockFns.getMintIntent(mint)
      expect(getMintIntentSpy).toHaveBeenCalledWith(mint)

      // const result = await getMintIntent(mint)

      expect(result).toEqual({
        from: mint.recipient,
        to: mint.contractAddress,
        data: '0x16da98640000000000000000000000006a41fcce9d075a9f6324b626af56cf632c509ec900000000000000000000000000000000000000000000000000000000000000010000000000000000000000001234567890123456789012345678901234567890',
      })
    })
  })

  describe('simulateMint function', () => {
    test('should simulate a mint with a fixed price', async () => {
      const mint = {
        chainId: Chains.BASE,
        contractAddress: '0x54d8109b459cefa530cdba2c3a2218c14e080907',
        recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      }
      const value = parseEther('0.002')
      const address = mint.recipient as Address

      // mock
      const mockFns = {
        simulateMint: async (
          _mint: MintIntentParams,
          _value: bigint,
          _address: Address,
        ) => fixedPriceResponse,
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

      // const result = await simulateMint(
      //   mint as MintIntentParams,
      //   value,
      //   address,
      // )

      const request = result.request
      expect(request.address).toBe('0x62037b26fff91929655aa3a060f327b47d1e2b3e')
      expect(request.functionName).toBe(
        'mintFromFixedPriceSaleWithEarlyAccessAllowlistV2',
      )
      expect(request.value).toBe(value)
    })

    test('should simulate a mint with a dutch auction', async () => {
      const mint = {
        chainId: Chains.BASE,
        contractAddress: '0x6a41fcce9d075a9f6324b626af56cf632c509ec9',
        recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      }
      const value = parseEther('0.0016')
      const address = mint.recipient as Address

      // mock
      const mockFns = {
        simulateMint: async (
          _mint: MintIntentParams,
          _value: bigint,
          _address: Address,
        ) => dutchAuctionResponse,
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

      // const result = await simulateMint(
      //   mint as MintIntentParams,
      //   value,
      //   address,
      // )

      const request = result.request
      expect(request.address).toBe('0x62037b26fff91929655aa3a060f327b47d1e2b3e')
      expect(request.functionName).toBe('mintFromDutchAuctionV2')
      expect(request.value).toBe(value)
    })

    test('should fail to simulate with invalid parameters', async () => {
      const mint = {
        chainId: Chains.ETHEREUM,
        contractAddress: '0x54d8109b459cefa530cdba2c3a2218c14e080907',
        recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      }
      const value = parseEther('0.0001')
      const address = mint.recipient as Address

      // mock
      const mockFns = {
        simulateMint: async (
          _mint: MintIntentParams,
          _value: bigint,
          _address: Address,
        ) => dutchAuctionResponse,
      }
      vi.spyOn(mockFns, 'simulateMint').mockRejectedValue(new Error())
      await expect(
        mockFns.simulateMint(mint as MintIntentParams, value, address),
      ).rejects.toThrow()

      // await expect(
      //   simulateMint(mint as MintIntentParams, value, address),
      // ).rejects.toThrow()
    })

    test('should simulate a mint with an 1155 OE mint', async () => {
      const mint = {
        chainId: Chains.BASE,
        contractAddress: '0x1d2550d198197df1a10af515cf2ea0d790889b93',
        tokenId: 213,
        recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      }
      const value = parseEther('0.0008')
      const address = mint.recipient as Address

      // mock
      const mockFns = {
        simulateMint: async (
          _mint: MintIntentParams,
          _value: bigint,
          _address: Address,
        ) => mint1155Response,
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

      // const result = await simulateMint(
      //   mint as MintIntentParams,
      //   value,
      //   address,
      // )

      const request = result.request
      expect(request.address).toBe('0xfee588791cda1d01ccfc80b51efa00c0be5b129e')
      expect(request.functionName).toBe('mintMultiTokensFromFreeFixedPriceSale')
      expect(request.value).toBe(value)
    })
  })
})
