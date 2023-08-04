import { ConnextContract } from './contract-addresses.js'
import {
  type ChainData,
  chainIdToDomain,
  domainToChainId,
  getChainData,
} from '@connext/nxtp-utils'
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address, toHex } from 'viem'

let _chainDataCache: Map<string, ChainData> | null = null

const _getChainData = async () => {
  if (!_chainDataCache) {
    const chainData = await getChainData()
    _chainDataCache = chainData
  }

  return _chainDataCache
}

export const XCALL_ABI_FRAGMENTS = [
  {
    inputs: [
      { internalType: 'uint32', name: '_destination', type: 'uint32' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'address', name: '_asset', type: 'address' },
      { internalType: 'address', name: '_delegate', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint256', name: '_slippage', type: 'uint256' },
      { internalType: 'bytes', name: '_callData', type: 'bytes' },
    ],
    name: 'xcall',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'payable',
    type: 'function',
  },
  // This overloaded function is not found in the Connext ABI json for some reason
  {
    inputs: [
      { internalType: 'uint32', name: '_destination', type: 'uint32' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'address', name: '_asset', type: 'address' },
      { internalType: 'address', name: '_delegate', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint256', name: '_slippage', type: 'uint256' },
      { internalType: 'bytes', name: '_callData', type: 'bytes' },
      { internalType: 'uint256', name: '_relayerFee', type: 'uint256' },
    ],
    name: 'xcall',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'payable',
    type: 'function',
  },
]

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
  const chainData = chains?.get(String(_chainId))
  console.log(chains, chainData)
  if (!chainData) {
    return []
  }

  return Object.keys(chainData.assetId) as Address[]
}

export const getSupportedChainIds = async () => {
  const chains = await _getChainData()
  console.log(chains)
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
