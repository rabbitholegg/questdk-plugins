import { FABRIC_ABI, SUBSCRIPTION_ABI } from './abi'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  Chains,
  DEFAULT_ACCOUNT,
  type MintIntentParams,
  chainIdToViemChain,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  http,
  zeroAddress,
} from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, recipient } = mint
  return compressJson({
    chainId,
    to: contractAddress,
    input: {
      $abi: FABRIC_ABI,
      account: recipient,
    },
  })
}

export const getProjectFees = async (
  mint: MintActionParams,
): Promise<bigint> => {
  const fees = await getFees(mint)
  return fees.projectFee + fees.actionFee
}

export const getFees = async (
  mint: MintActionParams,
): Promise<{ actionFee: bigint; projectFee: bigint }> => {
  const { chainId, contractAddress, amount } = mint

  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  })

  const contract = {
    address: contractAddress,
    abi: SUBSCRIPTION_ABI,
  }

  const [erc20Address, minPurchaseSeconds, tps] = (
    await client.multicall({
      contracts: [
        { ...contract, functionName: 'erc20Address' },
        { ...contract, functionName: 'minPurchaseSeconds' },
        { ...contract, functionName: 'tps' },
      ],
    })
  ).map((v) => v.result)

  if (erc20Address !== zeroAddress) {
    throw new Error('ERC20 not supported')
  }

  const mintUnits = typeof amount === 'number' ? BigInt(amount) : BigInt(1)

  const mintCost = (minPurchaseSeconds as bigint) * (tps as bigint) * mintUnits

  return { actionFee: mintCost, projectFee: BigInt(0) }
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { chainId, amount, contractAddress, recipient } = mint

  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  })

  const contract = {
    address: contractAddress,
    abi: SUBSCRIPTION_ABI,
  }

  const [erc20Address, minPurchaseSeconds, tps] = (
    await client.multicall({
      contracts: [
        { ...contract, functionName: 'erc20Address' },
        { ...contract, functionName: 'minPurchaseSeconds' },
        { ...contract, functionName: 'tps' },
      ],
    })
  ).map((v) => v.result)

  if (erc20Address !== zeroAddress) {
    throw new Error('ERC20 not supported')
  }

  const mintArgs = [(minPurchaseSeconds as bigint) * (tps as bigint) * amount]

  const data = encodeFunctionData({
    abi: FABRIC_ABI,
    functionName: 'mint',
    args: mintArgs,
  })

  return {
    from: recipient,
    to: contractAddress,
    data,
  }
}

export const simulateMint = async (
  mint: MintIntentParams,
  value: bigint,
  account?: Address,
  client?: PublicClient,
): Promise<SimulateContractReturnType> => {
  const { chainId, contractAddress, amount } = mint
  const _client =
    client ??
    createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })
  const from = account ?? DEFAULT_ACCOUNT

  const contract = {
    address: contractAddress,
    abi: SUBSCRIPTION_ABI,
  }

  const [erc20Address, minPurchaseSeconds, tps] = (
    await _client.multicall({
      contracts: [
        { ...contract, functionName: 'erc20Address' },
        { ...contract, functionName: 'minPurchaseSeconds' },
        { ...contract, functionName: 'tps' },
      ],
    })
  ).map((v) => v.result)

  if (erc20Address !== zeroAddress) {
    throw new Error('ERC20 not supported')
  }

  const mintArgs = [(minPurchaseSeconds as bigint) * (tps as bigint) * amount]

  const result = await _client.simulateContract({
    address: contractAddress,
    value,
    abi: FABRIC_ABI,
    functionName: 'mint',
    args: mintArgs,
    account: from,
  })
  return result
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.OPTIMISM, Chains.BASE, Chains.ZORA]
}
