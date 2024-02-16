import type { LogicalOperator } from '../index.js'
import type { Address } from 'viem'

export type RewardSpec = {
  chainId: number
  type: 'erc20' | 'erc1155'
  tokenAddress: string
  tokenId?: string
  amount: number
}

export type ParticipantsSpec = {
  include?: Address[] | 'string'
  exclude?: Address[] | 'string'
  max: number
}

export type Quest = {
  startTime: number
  endTime: number
  reward: RewardSpec
  participants: ParticipantsSpec
  actions: LogicalOperator
}
