import { chainData } from './chain-data.js'
import { ConnextContract } from './contract-addresses.js'
import { type BridgeActionParams, compressJson } from '@rabbitholegg/questdk'
import { toHex } from 'viem'

const getChainData = async (chainId: number) => {
  return chainData.find((chain) => chain.chainId === chainId)
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

  const chain = await getChainData(destinationChainId)

  if (!chain?.domainId) {
    throw new Error(
      `Connext domain ID does not exist for chain: ${destinationChainId}`,
    )
  }

  const defaultContractAddress = ConnextContract[sourceChainId]

  // https://docs.connext.network/developers/reference/contracts/calls#xcall
  return compressJson({
    chainId: toHex(sourceChainId),
    to: contractAddress || defaultContractAddress,
    input: {
      $abi: XCALL_ABI_FRAGMENTS,
      _destination: Number(chain.domainId),
      _asset: tokenAddress,
      _amount: amount,
      _to: recipient,
    },
  })
}
