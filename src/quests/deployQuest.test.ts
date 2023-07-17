import { Any } from '../filter/operators.js'
import type { LogicalOperator } from '../index.js'
import { QUEST_FACTORY_ADDRESS } from './constants.js'
import { deployQuest } from './deployQuest.js'
import type { ParticipantsSpec, RewardSpec } from './types.js'
import { beforeEach, describe, expect, test } from 'vitest'

describe('deployQuest', () => {
  let reward: RewardSpec
  let participants: ParticipantsSpec
  let actions: LogicalOperator

  beforeEach(() => {
    reward = {
      chainId: 10,
      type: 'erc20',
      amount: 100,
      tokenAddress: '0x4200000000000000000000000000000000000006',
    }

    participants = {
      max: 5000,
    }

    actions = Any([])
  })

  test('should create a transaction with expected values', async () => {
    const quest = {
      startTime: new Date().getTime(),
      endTime: new Date().getTime(),
      reward,
      participants,
      actions,
    }

    const result = deployQuest(quest)

    expect(result.to).to.be.equal(QUEST_FACTORY_ADDRESS(quest.reward.chainId))
  })
})

// const signer = ethers.provider.getSigner()

// const approveTx = approveIfNeeded({

// const deployTx = deployQuest({
//   reward: {
//     chainId: 10,
//     type: 'erc20',
//     amount: 100,
//     tokenAddress: '0x42000000000000000000000000000000006',
//   },
//   actions: Any([
//     UniversalRouter.Swap({
//       chainId: 10,
//       tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
//       amountOut: GreaterThanOrEqualTo(1000000n)
//     }),
//   ]),
// })

// await signer.sendTransaction(deployTx)
