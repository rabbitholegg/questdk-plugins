import erc20ABI from '../abi/erc20.js'
import { getChainById } from '../utils/chains.js'
import { QUEST_FACTORY_ADDRESS } from './constants.js'
import {
  type Address,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  http,
} from 'viem'

/**
 * This function checks if the owner has enough allowance to perform a transaction.
 * If not, it approves the transaction.
 * @param {Object} params - The parameters for the function.
 * @param {bigint} params.amount - The amount of tokens to be transacted.
 * @param {number} params.chainId - The ID of the blockchain chain.
 * @param {Address} params.tokenAddress - The address of the token to be transacted.
 * @param {Address} params.ownerAddress - The address of the owner of the tokens.
 * @returns {Promise<Partial<TransactionRequest> | undefined>} - A promise that resolves to a partial transaction request or undefined.
 */
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
