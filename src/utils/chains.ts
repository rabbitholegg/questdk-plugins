import { SUPPORTED_REWARD_CHAINS, SUPPORTED_TASK_CHAINS } from '../constants.js'
import type { Chain } from 'viem'

/**
 * Checks if a reward chain is supported
 * @param {number} chainId - The id of the chain to check
 * @return {boolean} - Returns true if the chain is supported, false otherwise
 */
export const isRewardChainSupported = (chainId: number) => {
  return Object.hasOwnProperty.call(SUPPORTED_REWARD_CHAINS, chainId)
}

/**
 * Retrieves a chain by its id
 * @param {number} chainId - The id of the chain to retrieve
 * @return {Chain} - Returns the chain object
 * @throws {Error} - Throws an error if the chain is not supported
 */
export const getChainById = (chainId: number) => {
  const allChains: Record<number, Chain> = {
    ...SUPPORTED_REWARD_CHAINS,
    ...SUPPORTED_TASK_CHAINS,
  }

  if (!Object.hasOwnProperty.call(allChains, chainId)) {
    throw new Error(`Chain with id ${chainId} is not supported`)
  }

  return allChains[chainId]
}
