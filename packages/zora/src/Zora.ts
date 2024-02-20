import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from "@rabbitholegg/questdk";
import { zoraUniversalMinterAddress } from "@zoralabs/universal-minter";
import {
  type Address,
  getAddress,
  type TransactionRequest,
  encodeFunctionData,
  zeroHash,
} from "viem";
import { CHAIN_ID_ARRAY } from "./chain-ids";
import {
  UNIVERSAL_MINTER_ABI,
  ZORA_MINTER_ABI_1155,
  ZORA_MINTER_ABI_721,
} from "./abi";
import { type MintIntentParams } from "@rabbitholegg/questdk-plugin-utils";
export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint;

  const universalMinter =
    zoraUniversalMinterAddress[
      chainId as keyof typeof zoraUniversalMinterAddress
    ];

  const mintContract = universalMinter
    ? { $or: [contractAddress.toLowerCase(), universalMinter.toLowerCase()] }
    : contractAddress;

  const andArray721 = [];
  const andArray1155 = [];
  if (recipient) {
    andArray721.push({
      $or: [{ recipient }, { tokenRecipient: recipient }, { to: recipient }],
    });
    andArray1155.push({
      $or: [{ recipient }, { tokenRecipient: recipient }, { to: recipient }],
    });
  }
  if (tokenId || amount) {
    andArray721.push({
      quantity: amount,
    });
    andArray1155.push({
      quantity: amount,
      tokenId,
    });
  }

  const ERC721_FILTER = {
    $abi: ZORA_MINTER_ABI_721,
    $and: andArray721.length !== 0 ? andArray721 : undefined,
  };

  const ERC1155_FILTER = {
    $abi: ZORA_MINTER_ABI_1155,
    $and: andArray1155.length !== 0 ? andArray1155 : undefined,
  };

  return compressJson({
    chainId,
    to: mintContract,
    input: {
      $or: [
        {
          // batchmint function
          $abiAbstract: UNIVERSAL_MINTER_ABI,
          _targets: { $some: getAddress(contractAddress) },
          _calldatas: {
            $some: {
              $or: [ERC721_FILTER, ERC1155_FILTER],
            },
          },
        },
        ERC721_FILTER,
        ERC1155_FILTER,
      ],
    },
  });
};

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { contractAddress, tokenId, amount, recipient } = mint;
  let data;
  if (tokenId !== 0) {
    const mintArgs = [recipient, tokenId, amount, zeroHash];
    // Assume it's an 1155 mint
    data = encodeFunctionData({
      abi: ZORA_MINTER_ABI_1155,
      functionName: "mint",
      args: mintArgs,
    });
  } else {
    // Assume it's a 721 mint
    data = encodeFunctionData({
      abi: ZORA_MINTER_ABI_721,
      functionName: "purchase",
      args: [amount],
    });
  }

  return {
    from: recipient,
    to: contractAddress,
    data,
  };
};

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []; /// Supported tokens don't apply for the mint action
};

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY as number[];
};
