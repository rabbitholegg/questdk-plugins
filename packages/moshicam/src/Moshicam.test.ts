import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk'
import { describe, expect, test } from 'vitest'
import { passingTestCases, failingTestCases } from './test-transactions'
import { mint, getMintIntent } from './Moshicam'
import { COLLECT_FROM_USER_MOSHICAM } from './test-transactions'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { IMOSHI_PIC1155_ABI } from './abi.ts'
import { encodeFunctionData } from 'viem'

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
  const { transaction } = COLLECT_FROM_USER_MOSHICAM

  test('returns the expected transaction request', async () => {
    const params: MintIntentParams = {
      chainId: Chains.BASE,
      contractAddress: transaction.to,
      recipient: transaction.from,
      tokenId: 1,
    }
    const data = encodeFunctionData({
      abi: IMOSHI_PIC1155_ABI,
      functionName: 'collect',
      args: [params.recipient, params.tokenId, 1],
    })

    const result = await getMintIntent(params)

    expect(result).toEqual({
      from: params.recipient,
      to: params.contractAddress,
      data: data,
    })
  })
})
