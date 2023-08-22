import { getDeployedMultisendContract } from "@connext/nxtp-txservice";
import { MultisendAbi } from "@connext/nxtp-utils";
import { GreaterThanOrEqual, apply } from "@rabbitholegg/questdk/filter";
import { describe, expect, test } from "vitest";
import { bridge } from "./Connext.js";
import { XCALL_ABI_FRAGMENTS } from "./abi.js";

describe("Connext", () => {
  describe("Bridge", () => {
    const USDC = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";

    test("should return a valid bridge action filter", async () => {
      const filter = await bridge({
        sourceChainId: 10,
        destinationChainId: 137,
        tokenAddress: USDC,
        amount: GreaterThanOrEqual(100000n),
      });

      expect(filter).to.deep.equal({
        chainId: "0xa",
        to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
        input: {
          $abi: XCALL_ABI_FRAGMENTS,
          _destination: 1886350457,
          _asset: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
          _amount: {
            $gte: "100000",
          },
        },
      });
    });
  });

  test("should use the WETH wrapper multisend contract when bridging ETH", async () => {
    const ETH = "0x0000000000000000000000000000000000000000";
    const OP_WETH = "0x4200000000000000000000000000000000000006";

    const filter = await bridge({
      sourceChainId: 10,
      destinationChainId: 137,
      tokenAddress: ETH,
      amount: GreaterThanOrEqual(100000n),
    });

    const multiSendContract = getDeployedMultisendContract(10);

    expect(filter).to.deep.equal({
      chainId: "0xa",
      to: multiSendContract?.address,
      value: {
        $gte: "100000",
      },
      input: {
        $abi: MultisendAbi,
        transactions: {
          $some: {
            $regex: `/${OP_WETH}/`,
          },
        },
      },
    });
  });

  describe("Apply filter", () => {
    test("transaction should pass filter", async () => {
      const transaction = {
        blockHash:
          "0x80ca121924779dc65f575409be05e7c2cbaf718858e6e20d66d130cf1acec4f3",
        blockNumber: "0x6606396",
        from: "0xd59a74e615c9d55422ed8c5ce64cb50fda0bb58d",
        gas: "0x73766",
        gasPrice: "0xc9",
        maxFeePerGas: "0x17a",
        maxPriorityFeePerGas: "0x71",
        hash: "0x22d3715ca5ae0bd0d87f9341fafc7a330fd6962e13bf318a6a541c93e4e6bc04",
        input:
          "0x93f18ac50000000000000000000000000000000000000000000000000000000000676e6f000000000000000000000000642c27a96dffb6f21443a89b789a3194ff8399fa000000000000000000000000da10009cbd5d07dd0cecc66161fc93d7c9000da1000000000000000000000000d59a74e615c9d55422ed8c5ce64cb50fda0bb58d000000000000000000000000000000000000000000000000204d764a78eac238000000000000000000000000000000000000000000000000000000000000012c000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000050b91c62117dc0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d59a74e615c9d55422ed8c5ce64cb50fda0bb58d",
        nonce: "0x3",
        to: "0x8f7492de823025b4cfaab1d34c58963f2af5deda",
        transactionIndex: "0x3",
        value: "0x0",
        type: "0x2",
        accessList: [],
        chainId: "0xa",
        v: "0x0",
        r: "0x4fcc9247c0b29a50b9db146191e93fbd503be520998f62c9445aa2eeb944d613",
        s: "0x78e1ace158ae1166687db900743fc7db36cc80e42a43a800577895c5cb2b95b3",
      };

      const filter = await bridge({
        sourceChainId: 10,
        destinationChainId: 100, // xDAI Chain
        tokenAddress: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        amount: GreaterThanOrEqual(2000000000000000000n),
      });

      expect(apply(transaction, filter)).to.be.true;
    });
  });
});
