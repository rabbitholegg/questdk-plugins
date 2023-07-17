import erc20ABI from '../abi/erc20.json'
import { getChainById } from '../utils/chains.js'
import { QUEST_FACTORY_ADDRESS } from './constants.js'
import {
  type Address,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  http,
} from 'viem'

export const approveIfNeeded = async ({
  amount,
  chainId,
  tokenAddress,
  ownerAddress,
}: {
  amount: bigint
  chainId: number
  tokenAddress: Address
  ownerAddress: Address
}): Promise<Partial<TransactionRequest> | undefined> => {
  const chain = getChainById(chainId)

  const client = createPublicClient({
    chain,
    transport: http(),
  })

  const result = (await client.readContract({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [ownerAddress, QUEST_FACTORY_ADDRESS(chainId)],
  })) as bigint

  if (result >= amount) {
    const data = encodeFunctionData({
      abi: erc20ABI,
      functionName: 'approve',
      args: [QUEST_FACTORY_ADDRESS(chainId), amount],
    })

    return {
      to: tokenAddress,
      data,
    }
  }

  return
}
