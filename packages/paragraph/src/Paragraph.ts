import { ERC_721_ABI, MINT_ABI } from './abi'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  BOOST_TREASURY_ADDRESS,
  Chains,
  DEFAULT_ACCOUNT,
  type MintIntentParams,
  chainIdToViemChain,
  getExitAddresses,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  http,
  parseEther,
} from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, recipient } = mint

  return compressJson({
    chainId,
    to: getExitAddresses(chainId, contractAddress),
    input: {
      $abi: MINT_ABI,
      to: recipient,
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
  const { chainId, contractAddress } = mint

  try {
    const client = createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })

    const contract = {
      address: contractAddress,
      abi: ERC_721_ABI,
    }

    const [actionFee, projectFee] = await client.multicall({
      contracts: [
        {
          ...contract,
          functionName: 'priceWei',
        },
        {
          ...contract,
          functionName: 'getMintFee',
        },
      ],
    })

    return {
      actionFee: actionFee.result as bigint,
      projectFee: projectFee.result as bigint,
    }
  } catch {
    return {
      actionFee: parseEther('0'),
      projectFee:
        chainId === Chains.POLYGON_POS
          ? parseEther('2') // 2 MATIC
          : parseEther('0.000777'), // 0.000777 ETH
    }
  }
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { contractAddress, recipient } = mint

  const mintArgs = [recipient, BOOST_TREASURY_ADDRESS]

  const data = encodeFunctionData({
    abi: ERC_721_ABI,
    functionName: 'mintWithReferrer',
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
  const { chainId, contractAddress, recipient } = mint

  const _client =
    client ??
    createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })
  const from = account ?? DEFAULT_ACCOUNT

  const mintArgs = [recipient, BOOST_TREASURY_ADDRESS]
  const result = await _client.simulateContract({
    address: contractAddress,
    value,
    abi: ERC_721_ABI,
    functionName: 'mintWithReferrer',
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
  return [Chains.OPTIMISM, Chains.POLYGON_POS, Chains.BASE, Chains.ZORA]
}
