import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from "@rabbitholegg/questdk";
import { type Address } from "viem";
import { COLLECT_ENTRY_ABI } from "./abi";
import { Chains } from "./utils";

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, recipient } = mint;

  return compressJson({
    chainId,
    to: contractAddress,
    from: recipient,
    input: {
      $abi: COLLECT_ENTRY_ABI,
      tokenRecipient: recipient,
    },
  });
};

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []; // supported tokens don't apply for the mint action
};

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.OPTIMISM, Chains.ZORA, Chains.BASE, Chains.LINEA];
};
