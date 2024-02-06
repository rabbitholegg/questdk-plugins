import { Chains } from "@rabbitholegg/questdk-plugin-utils";
import { GreaterThanOrEqual, apply } from "@rabbitholegg/questdk/filter";
import { parseEther, parseUnits } from "viem";
import { describe, expect, test } from "vitest";

import { AGGREGATOR_V3_ADDRESS } from "./constants";
import { swap } from "./oneinch";
import { failingTestCases, passingTestCases } from "./test-transactions";
import { ONEINCH_SWAP_ABI } from "./abi";

describe("Given the project plugin", () => {
  describe("When handling the {actionType} action", () => {
    describe("should return a valid action filter", () => {
      test("when making a swap", async () => {
        const filter = await swap({
          chainId: Chains.ETHEREUM,
          contractAddress: AGGREGATOR_V3_ADDRESS,
          tokenIn: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          tokenOut: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDC.e
          amountIn: GreaterThanOrEqual(parseEther("1")),
          amountOut: GreaterThanOrEqual(parseUnits("2300", 6)),
          recipient: "0xa99f898530df1514a566f1a6562d62809e99557d",
        });

        expect(filter).to.deep.equal({
          chainId: Chains.ETHEREUM,
          to: AGGREGATOR_V3_ADDRESS,
          input: {
            $abi: ONEINCH_SWAP_ABI,
            desc: {
              amount: GreaterThanOrEqual(parseEther("1")),
              srcToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
              dstToken: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
              dstReceiver: "0xa99f898530df1514a566f1a6562d62809e99557d",
              minReturnAmount: GreaterThanOrEqual(parseUnits("2300", 6)),
            },
          },
        });
      });
    });

    describe("should pass filter with valid transactions", () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase;
        test(description, async () => {
          const filter = await swap(params);
          expect(apply(transaction, filter)).to.be.true;
        });
      });
    });

    describe("should not pass filter with invalid transactions", () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase;
        test(description, async () => {
          const filter = await swap(params);
          expect(apply(transaction, filter)).to.be.false;
        });
      });
    });
  });
});
