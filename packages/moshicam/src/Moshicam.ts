import {
  type TransactionFilter,
  type MintActionParams,
  GreaterThanOrEqual,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  type Address,
  type TransactionRequest,
  encodeFunctionData,
  type SimulateContractReturnType,
  createPublicClient,
  http,
  parseEther,
} from 'viem'
import {
  DEFAULT_MINT_PRICE,
} from "./constants"
import {
  Chains,
  DEFAULT_ACCOUNT,
  type MintIntentParams,
  chainIdToViemChain,
} from '@rabbitholegg/questdk-plugin-utils'
import { IMOSHI_PIC1155_ABI } from './abi'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint
  return compressJson({
    chainId: chainId,
    to: contractAddress,
    input: {
      $abi: IMOSHI_PIC1155_ABI,
      to: recipient,
      id: tokenId,
      quantity: amount,
    },
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const amountToMint = amount ? amount : 1n

  const data = encodeFunctionData({
    abi: IMOSHI_PIC1155_ABI,
    functionName: 'collect',
    args: [recipient, tokenId, amountToMint],
  })

  return {
    from: recipient,
    to: contractAddress,
    data,
  }
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
  const { chainId, contractAddress, tokenId, amount, recipient } = mint
  const client = createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  })
  const amountToMint = amount ? amount : 1n
  try {
    const data = await client.readContract({
      address: contractAddress,
      abi: IMOSHI_PIC1155_ABI,
      functionName: 'mintPrice',
    })
    return { actionFee: data * amountToMint, projectFee: parseEther('0') }
  } catch (error) {
    console.error(`failed to get fees: ${error}`)
    return {
      actionFee: DEFAULT_MINT_PRICE * amountToMint,
      projectFee: parseEther('0'),
    }
  }
}

export const simulateMint = async (
  mint: MintIntentParams,
  value: bigint,
  account?: Address,
  client?: PublicClient,
): Promise<SimulateContractReturnType> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint
  if (!tokenId && tokenId !== 0) {
    throw new Error('No tokenId specified to mint')
  }

  if (!(await getSupportedChainIds()).includes(chainId)) {
    throw new Error(`${chainId} is not supported`)
  }

  const amountToMint = amount ? amount : 1n

  client =
    client ??
    createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })

  try {
    return await client.simulateContract({
      address: contractAddress,
      value: value,
      abi: IMOSHI_PIC1155_ABI,
      functionName: 'collect',
      args: [recipient, tokenId, amountToMint],
      account: account || DEFAULT_ACCOUNT,
    })
  } catch (error) {
    throw new Error(`failed to simulate mint: ${error}`)
  }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.BASE]
}
