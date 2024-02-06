import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from "@rabbitholegg/questdk";
import { type Address } from "viem";
import { CHAIN_TO_TOKENS, Chains } from "@rabbitholegg/questdk-plugin-utils";
import { AGGREGATOR_V3_ADDRESS } from "./constants";
import { ONEINCH_SWAP_ABI } from "./abi";

/*
 * Function templates for handling various blockchain action types.
 * It's adaptable for actions defined in ActionParams: Bridge, Swap, Stake, Mint, Delegate, Quest, Etc.
 * Duplicate and customize for each specific action type.
 * If you wish to use a different action other than swap, import one of the ActionParams types
 * from @rabbitholegg/questdk (ie: SwapActionParams) and change the function below to use
 * the action params you wish to use.
 */

export const swap = async (
  _params: SwapActionParams
): Promise<TransactionFilter> => {
  const { chainId, tokenIn, tokenOut, amountIn, amountOut, recipient } =
    _params;
  // the ActionParams for this function are populated in the Boost Manager when the actual Boost is launched.

  // In this function you should load the ABI, and translate any ActionParams into the input object defined below
  // which should match the parameter names in the transaction

  // You can also use the boostdk filter system to support operators on parameters, for example, greater than

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId,
    to: AGGREGATOR_V3_ADDRESS,
    input: {
      $abi: ONEINCH_SWAP_ABI,
      desc: {
        amount: amountIn,
        srcToken: tokenIn,
        dstToken: tokenOut,
        dstReceiver: recipient,
        minReturnAmount: amountOut,
      },
    },
  });
};

export const getSupportedTokenAddresses = async (
  _chainId: number
): Promise<Address[]> => {
  return CHAIN_TO_TOKENS[_chainId] ?? [];
};

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [
    Chains.ETHEREUM,
    Chains.OPTIMISM,
    Chains.BINANCE_SMART_CHAIN,
    Chains.GNOSIS,
    Chains.POLYGON_POS,
    Chains.ZK_SYNC_ERA,
    Chains.BASE,
    Chains.ARBITRUM_ONE,
    Chains.AVALANCHE,
  ];
};
