import { SUPPORTED_REWARD_CHAINS, SUPPORTED_TASK_CHAINS } from '../constants.js'
import type { Chain } from 'viem'

export const isRewardChainSupported = (chainId: number) => {
  return Object.hasOwnProperty.call(SUPPORTED_REWARD_CHAINS, chainId)
}

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
