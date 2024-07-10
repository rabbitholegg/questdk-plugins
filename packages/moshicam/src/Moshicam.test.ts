import {
  getFees,
  getMintIntent,
  getProjectFees,
  mint,
  simulateMint,
} from './Moshicam'
import { IMOSHI_PIC1155_ABI } from './abi'
import { DEFAULT_MINT_PRICE, MOSHIMINTER_ADMIN } from './constants'
import { failingTestCases, passingTestCases } from './test-transactions'
import { COLLECT_FROM_USER_MOSHICAM } from './test-transactions'
import { apply } from '@rabbitholegg/questdk'
import { Chains, MintIntentParams } from '@rabbitholegg/questdk-plugin-utils'
import { encodeFunctionData, parseEther } from 'viem'
import { describe, expect, test } from 'vitest'

describe('Given the moshicam plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      const { params } = COLLECT_FROM_USER_MOSHICAM
      test('when minting direct from user Moshicam contract', async () => {
        const filter = await mint(params)
        expect(filter).to.deep.equal({
          chainId: Chains.BASE,
          to: params.contractAddress,
          input: {
            $abi: IMOSHI_PIC1155_ABI,
            id: params.tokenId,
            quantity: {
              $gte: '1',
            },
          },
        })
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
  test('it returns the expected transaction request', async () => {
    const params: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: COLLECT_FROM_USER_MOSHICAM.params.contractAddress,
      recipient: COLLECT_FROM_USER_MOSHICAM.transaction.from,
      amount: 1n,
      tokenId: 1,
    }
    const data = encodeFunctionData({
      abi: IMOSHI_PIC1155_ABI,
      functionName: 'collect',
      args: [params.recipient, params.tokenId, params.tokenId],
    })

    const result = await getMintIntent(params)

    expect(result).toEqual({
      from: params.recipient,
      to: params.contractAddress,
      data: data,
    })
  })
})

describe('Given the getProjectFees function', () => {
  test('it should return the expected project fees', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: COLLECT_FROM_USER_MOSHICAM.params.contractAddress,
      amount: 1n,
      recipient: COLLECT_FROM_USER_MOSHICAM.transaction.from,
      tokenId: 0,
    }

    const result = await getProjectFees(mint)

    expect(result).toEqual(DEFAULT_MINT_PRICE)
  })
})

describe('Given the getFee function', () => {
  test('it should return the expected fee', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: COLLECT_FROM_USER_MOSHICAM.params.contractAddress,
      amount: 1n,
      recipient: COLLECT_FROM_USER_MOSHICAM.transaction.from,
      tokenId: 0,
    }

    const result = await getFees(mint)

    expect(result.actionFee).toEqual(DEFAULT_MINT_PRICE * mint.amount)
    expect(result.projectFee).toEqual(parseEther('0'))
  })

  test('it should return the expected fee if amount is not provided', async () => {
    const mint = {
      chainId: Chains.BASE,
      contractAddress: COLLECT_FROM_USER_MOSHICAM.params.contractAddress,
      recipient: COLLECT_FROM_USER_MOSHICAM.transaction.from,
      tokenId: 0,
    }

    const result = await getFees(mint)

    expect(result.actionFee).toEqual(DEFAULT_MINT_PRICE)
    expect(result.projectFee).toEqual(parseEther('0'))
  })

  test('it should return the expected fee if failed to fetch', async () => {
    const mint = {
      chainId: Chains.BLAST, // unsupported chain
      contractAddress: COLLECT_FROM_USER_MOSHICAM.params.contractAddress,
      recipient: COLLECT_FROM_USER_MOSHICAM.transaction.from,
      tokenId: 0,
    }

    const result = await getFees(mint)

    expect(result.actionFee).toEqual(DEFAULT_MINT_PRICE)
    expect(result.projectFee).toEqual(parseEther('0'))
  })
})

describe('Given the simulateMint function', () => {
  test('it should simulate a mint', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: COLLECT_FROM_USER_MOSHICAM.params.contractAddress,
      amount: 1n,
      recipient: COLLECT_FROM_USER_MOSHICAM.transaction.from,
      tokenId: 0,
    }

    const result = await simulateMint(
      mint,
      DEFAULT_MINT_PRICE,
      MOSHIMINTER_ADMIN,
    )

    expect(result.request.account?.address).toEqual(MOSHIMINTER_ADMIN)
    expect(result.request.address).toEqual(
      COLLECT_FROM_USER_MOSHICAM.params.contractAddress,
    )
  })

  test('it should throw an error if no tokenId', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: COLLECT_FROM_USER_MOSHICAM.params.contractAddress,
      amount: BigInt(1),
      recipient: COLLECT_FROM_USER_MOSHICAM.transaction.from,
    }

    expect(
      async () =>
        await simulateMint(mint, DEFAULT_MINT_PRICE, MOSHIMINTER_ADMIN),
    ).rejects.toThrowError()
  })

  test('it should throw error if chain is not supported', async () => {
    const mint: MintIntentParams = {
      chainId: Chains.BLAST,
      contractAddress: COLLECT_FROM_USER_MOSHICAM.params.contractAddress,
      amount: BigInt(1),
      recipient: COLLECT_FROM_USER_MOSHICAM.transaction.from,
    }

    expect(
      async () =>
        await simulateMint(mint, DEFAULT_MINT_PRICE, MOSHIMINTER_ADMIN),
    ).rejects.toThrowError()
  })
})
