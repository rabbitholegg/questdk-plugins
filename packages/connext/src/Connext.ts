import {
  type ChainData,
  MultisendAbi,
  chainIdToDomain,
  domainToChainId,
  getChainData,
} from "@connext/nxtp-utils";

import { getDeployedMultisendContract } from "@connext/nxtp-txservice";

import { ConnextAbi } from "@connext/smart-contracts";

import { type BridgeActionParams, compressJson } from "@rabbitholegg/questdk";
import { type Address, toHex } from "viem";
import { ConnextContract } from "./contract-addresses.js";

let _chainDataCache: Map<string, ChainData> | null = null;

const ETH_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";

const _getChainData = async () => {
  if (!_chainDataCache) {
    const chainData = await getChainData();
    _chainDataCache = chainData;
  }

  return _chainDataCache;
};

const getWETHAddress = async (chainId: number) => {
  const chains = await _getChainData();
  const domainId = chainIdToDomain(chainId);
  const chainData = chains?.get(String(domainId));
  const wethAddress = Object.keys(chainData?.assetId || {});

  for (const address of wethAddress) {
    if (chainData?.assetId[address].symbol === "WETH") {
      return address;
    }
  }
};

export const bridge = async (bridge: BridgeActionParams) => {
  const {
    sourceChainId,
    destinationChainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  const defaultContractAddress = ConnextContract[sourceChainId]
  const destinationDomain = chainIdToDomain(destinationChainId)

  // https://docs.connext.network/developers/reference/contracts/calls#xcall
  return compressJson({
    chainId: toHex(sourceChainId),
    to: contractAddress || defaultContractAddress,
    input: {
      $abi: XCALL_ABI_FRAGMENTS,
      _destination: Number(destinationDomain),
      _asset: tokenAddress,
      _amount: amount,
      _to: recipient,
    },
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  const chains = await _getChainData()
  try {
    const domainId = chainIdToDomain(_chainId)
    const chainData = chains?.get(String(domainId))
    if (!chainData) {
      return []
    }
    return Object.keys(chainData.assetId).filter((addr) => !!addr) as Address[]
  } catch (_e) {
    return []
  }
}

export const getSupportedChainIds = async () => {
  const chains = await _getChainData()

  if (!chains || !(chains instanceof Map)) {
    return []
  }

  return Array.from(chains.keys())
    .map((domainId) => {
      try {
        return domainToChainId(Number(domainId))
      } catch (_e) {
        return undefined
      }
    })
    .filter((chain) => chain !== undefined) as number[]
}
