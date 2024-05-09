import {
  getDynamicNameParams,
  getProjectFees,
  mint,
  simulateMint,
} from './Soundxyz'
import { SUPERMINTER, SUPERMINTER_V2, SUPERMINTER_V2_ABI } from './constants'
import {
  OP_SUPERMINTER_V2,
  failingTestCases,
  passingTestCases,
} from './test-transactions'
import { Chains } from './utils'
import { apply } from '@rabbitholegg/questdk'
import {
  ActionType,
  type DisctriminatedActionParams,
  type MintActionParams,
  type MintIntentParams,
  getExitAddresses,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address, parseEther } from 'viem'
import { describe, expect, test, vi } from 'vitest'

describe('Given the soundxyz plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      const { params } = OP_SUPERMINTER_V2
      test('when minting a sound on the superminter contract', async () => {
        const filter = await mint(params)
        expect(filter).to.deep.equal({
          chainId: Chains.OPTIMISM,
          to: getExitAddresses(Chains.OPTIMISM, [SUPERMINTER, SUPERMINTER_V2]), 
          input: {
            $abi: SUPERMINTER_V2_ABI,
            p: {
              edition: params.contractAddress,
              quantity: {
                $gte: '1',
              },
              to: params.recipient,
            },
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { description, params, transaction } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { description, params, transaction } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})

describe('getDynamicNameParams function', () => {
  test('should return correct values for valid input', async () => {
    const params = {
      type: ActionType.Mint,
      data: {
        amount: 1,
        chainId: 10,
      },
    }
    const metadata = {
      tokenImage: 'image.png',
      author: 'Author Name',
      tokenCollection: 'Collection Name',
    }

    const result = await getDynamicNameParams(
      params as DisctriminatedActionParams,
      metadata,
    )

    expect(result).toEqual({
      actionType: 'Mint',
      originQuantity: 1,
      originTargetImage: 'image.png',
      originAuthor: ' by Author Name',
      originCollection: 'Collection Name',
      originNetwork: 10,
      projectImage:
        'https://rabbithole-assets.s3.amazonaws.com/projects/sound.jpeg&w=3840&q=75',
      project: 'Sound.XYZ',
    })
  })

  test('should throw error for invalid action type', async () => {
    const params = {
      type: ActionType.Swap, // invalid action type
      data: {
        amount: 1,
        chainId: 10,
      },
    }
    const metadata = {
      tokenImage: 'image.png',
      author: 'Author Name',
      tokenCollection: 'Collection Name',
    }

    await expect(
      getDynamicNameParams(params as DisctriminatedActionParams, metadata),
    ).rejects.toThrow(`Invalid action type "${params.type}"`)
  })
})

describe('getProjectFees', () => {
  test('should return the correct fee', async () => {
    // If actually testing this contract, may not work if it is no longer mintable
    const contractAddress: Address =
      '0xFCB12A059C722AEaaFc4AC5531493cad49cA1848'
    const mintParams = { contractAddress, chainId: Chains.BASE, tokenId: 1 }

    const mockFns = {
      getProjectFees: async (_mint: MintActionParams) =>
        BigInt('777000000000000'),
    }

    const getProjectFeesSpy = vi.spyOn(mockFns, 'getProjectFees')
    const fee = await mockFns.getProjectFees(mintParams)
    expect(getProjectFeesSpy).toHaveBeenCalledWith(mintParams)
    expect(fee).toEqual(BigInt('777000000000000'))
  })

  test('should return the correct fee for a legacy mint', async () => {
    const contractAddress: Address =
      '0x0c418874315698096ecA7ce0e1Dccf0A517DC9DE'
    const mintParams = { contractAddress, chainId: Chains.OPTIMISM }

    const fee = await getProjectFees(mintParams)
    expect(fee).equals(777000000000000n)
  })
})
describe('getFees', () => {
  test('should return the correct fee for project and action', async () => {
    const contractAddress: Address =
      '0xFCB12A059C722AEaaFc4AC5531493cad49cA1848'
    const mintParams = { contractAddress, chainId: Chains.BASE }

    const mockFns = {
      getFees: async (_mint: MintActionParams) => ({
        projectFee: BigInt('777000000000000'),
        actionFee: BigInt('0'),
      }),
    }

    const getProjectFeesSpy = vi.spyOn(mockFns, 'getFees')
    const fee = await mockFns.getFees(mintParams)
    expect(getProjectFeesSpy).toHaveBeenCalledWith(mintParams)
    expect(fee.projectFee).toEqual(BigInt('777000000000000'))
    expect(fee.actionFee).toEqual(BigInt('0'))
  })
})

describe('simulateMint function', () => {
  test('should simulate a mint', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.OPTIMISM,
      contractAddress: '0xdf71F2F15bCcDC7c7A89F01dd45cDE5A43F7e79f',
      amount: BigInt(1),
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
    }
    const value = parseEther('0.000777')
    const account = '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF'

    const result = await simulateMint(mint, value, account)
    const request = result.request
    expect(request.address).toBe(SUPERMINTER_V2)
    expect(request.value).toBe(value)
  })

  test('should simulate a legacy mint', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.OPTIMISM,
      contractAddress: '0x0c418874315698096ecA7ce0e1Dccf0A517DC9DE',
      amount: BigInt(1),
      recipient: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
    }
    const value = parseEther('0.000777')
    const account = '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF'

    const result = await simulateMint(mint, value, account)
    const request = result.request
    expect(request.address).toBe(SUPERMINTER)
    expect(request.value).toBe(value)
  })
})
