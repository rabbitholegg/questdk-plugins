import { FABRIC_MINT_ABI, FABRIC_MINTFOR_ABI } from './abi'
import { getContractData } from './utils'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
  GreaterThanOrEqual,
} from '@rabbitholegg/questdk'
import {
  Chains,
  DEFAULT_ACCOUNT,
  chainIdToViemChain,
  formatAmountToInteger,
  type MintIntentParams,
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
  const { chainId, contractAddress, amount, recipient } = mint

  const { minPurchaseSeconds, tps } = await getContractData(
    chainId,
    contractAddress,
  )

  if (minPurchaseSeconds == null || tps == null) {
    throw new Error('Contract data not found')
  }

  const numTokens = minPurchaseSeconds * tps * formatAmountToInteger(amount)

  return compressJson({
    chainId,
    to: contractAddress,
    input: {
      $or: [
        {
          $abi: FABRIC_MINT_ABI,
          numTokens: GreaterThanOrEqual(numTokens),
        },
        {
          $abi: FABRIC_MINTFOR_ABI,
          numTokens: GreaterThanOrEqual(numTokens),
          account: recipient,
        },
      ],
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

  const { erc20Address, minPurchaseSeconds, tps } = await getContractData(
    chainId,
    contractAddress,
  )

  if (erc20Address !== zeroAddress) {
    throw new Error('ERC20 not supported')
  }

  if (!minPurchaseSeconds || !tps) {
    throw new Error('Contract data not found')
  }

  const mintUnits = formatAmountToInteger(amount)

  const mintCost = minPurchaseSeconds * tps * mintUnits

  return { actionFee: mintCost, projectFee: BigInt(0) }
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { chainId, amount, contractAddress, recipient } = mint

  const { erc20Address, minPurchaseSeconds, tps } = await getContractData(
    chainId,
    contractAddress,
  )

  if (erc20Address !== zeroAddress) {
    throw new Error('ERC20 not supported')
  }

  if (!minPurchaseSeconds || !tps) {
    throw new Error('Contract data not found')
  }

  const mintArgs = [minPurchaseSeconds * tps * formatAmountToInteger(amount)]

  const data = encodeFunctionData({
    abi: FABRIC_MINT_ABI,
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
  const { erc20Address, minPurchaseSeconds, tps } = await getContractData(
    chainId,
    contractAddress,
    client,
  )

  // fail simulation if erc20 is used
  if (erc20Address !== zeroAddress) {
    throw new Error('ERC20 not supported')
  }

  if (!minPurchaseSeconds || !tps) {
    throw new Error('Contract data not found')
  }

  const mintArgs = [minPurchaseSeconds * tps * formatAmountToInteger(amount)]

  const result = await _client.simulateContract({
    address: contractAddress,
    value,
    abi: FABRIC_MINT_ABI,
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
