import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { getMintIntent, mint } from './Mirror'
import {
  passingTestCases,
  failingTestCases,
  OP_COLLECT_ENTRY,
  EXPECTED_ENCODED_DATA,
} from './test-transactions'
import { COLLECT_ENTRY_ABI } from './abi'
import { MintIntentParams } from '@rabbitholegg/questdk-plugin-utils'

describe("Given the mirror plugin", () => {
  describe("When handling the mint action", () => {
    describe("should return a valid action filter", () => {
      test("when collecting a mirror entry", async () => {
        const { params } = OP_COLLECT_ENTRY;
        const filter = await mint(params);
        expect(filter).to.deep.equal({
          chainId: 10,
          from: "0x6e40dc97a419b42490923677bbc803e55338c26e",
          to: "0x05b52003e4b3ce431f467de89a1d0b82b663fc6b",
          input: {
            $abi: COLLECT_ENTRY_ABI,
            tokenRecipient: "0x6e40dc97a419b42490923677bbc803e55338c26e",
          },
        });
      });
    });

    describe("should pass filter with valid transactions", () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase;
        test(description, async () => {
          const filter = await mint(params);
          expect(apply(transaction, filter)).to.be.true;
        });
      });
    });

    describe("should not pass filter with invalid transactions", () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase;
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })
})

describe('getMintIntent', () => {
  const test_address = '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb'
  test('returns a TransactionRequest with correct properties', async () => {
    const mint: MintIntentParams = {
      chainId: 1,
      tokenId: 0,
      contractAddress: '0x05b52003e4b3ce431f467de89a1d0b82b663fc6b',
      amount: BigInt('10'),
      recipient: test_address,
    }

    const result = await getMintIntent(mint)

    expect(result).toEqual({
      from: mint.recipient,
      to: mint.contractAddress,
      data: EXPECTED_ENCODED_DATA,
    })
  })

  test('throws an error if required parameters are missing', async () => {
    const mint: Partial<MintIntentParams> = {
      contractAddress: test_address,
      amount: BigInt('10'),
      // recipient is missing
    }

    await expect(getMintIntent(mint as MintIntentParams)).rejects.toThrow()
  })
})
