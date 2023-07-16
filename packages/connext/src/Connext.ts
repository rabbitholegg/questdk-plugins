import chainData from './chain-data.json'
import connextContracts from '@connext/smart-contracts/deployments.json'
import { type BridgeAction, compressJson } from '@rabbitholegg/questdk'
import { type Abi, toHex } from 'viem'

const _getChainData = async (chainId: number) => {
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

type ConnextContractsJson = {
  [chainId: string]: {
    chainId: string
    name: string
    contracts: {
      [name: string]: {
        address: string
        abi: Abi
      }
    }
  }[]
}

const _getContractAddress = (chainId: number, name: string) => {
  const contracts = connextContracts as ConnextContractsJson
  const contract = contracts[chainId][0].contracts[name]
  return contract?.address
}

export const bridge = async (
  bridge: BridgeAction & { destinationChainId: number },
) => {
  const {
    sourceChainId,
    destinationChainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  const chain = await _getChainData(destinationChainId)

  if (!chain?.domainId) {
    throw new Error(
      `Connext domain ID does not exist for chain: ${destinationChainId}`,
    )
  }

  // https://docs.connext.network/developers/reference/contracts/calls#xcall
  return compressJson({
    chainId: toHex(sourceChainId),
    to: contractAddress || _getContractAddress(sourceChainId, 'Connext'),
    input: {
      $abi: XCALL_ABI_FRAGMENTS,
      _destination: chain.domainId,
      _asset: tokenAddress,
      _amount: amount,
      _to: recipient,
    },
  })
}
