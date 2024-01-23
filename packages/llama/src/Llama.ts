import {
  type DelegateActionParams,
  compressJson,
  type VoteActionParams,
} from "@rabbitholegg/questdk";
import { LLAMA_ABI_CAST_APPROVE, LLAMA_ABI_CAST_DISAPPROVE } from "./abi.js";
import { CHAIN_ID_ARRAY } from "./chain-ids.js";
import { TALLY_TOKENS } from "./token-addresses.js";

// export type VoteActionParams = {
//   chainId: number;
//   project: Address | string;
//   contractAddress: Address;
//   proposalId?: bigint | FilterOperator;
//   support?: boolean | FilterOperator;
// };

export const vote = async (delegateParams: VoteActionParams) => {
  // This is the information we'll use to compose the Transaction object
  const { chainId, project, contractAddress, proposalId, support } =
    delegateParams;

  let supportAsBool = typeof support === "boolean";

  let abi = [];
  if (supportAsBool) {
    // if the support param is a boolean, we only want to use the abi that matches the boolean
    if (support) {
      abi = LLAMA_ABI_CAST_APPROVE;
    } else {
      abi = LLAMA_ABI_CAST_DISAPPROVE;
    }
  } else {
    // if the support param is a filter, then we can match either a yes vote or a no vote
    abi = LLAMA_ABI_CAST_APPROVE.concat(LLAMA_ABI_CAST_DISAPPROVE);
  }

  return compressJson({
    chainId: chainId, // The chainId of the source chain
    to: contractAddress, // The contract address of the governance platform
    input: {
      $abi: abi,
      support: support,
      ...(proposalId != undefined && { proposalId: proposalId }),
    },
  });
};

export const getSupportedTokenAddresses = async (_chainId: number) => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return TALLY_TOKENS[_chainId];
};

export const getSupportedChainIds = async () => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return CHAIN_ID_ARRAY; // only supporting ARB right now
};
