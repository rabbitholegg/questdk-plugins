import { type VoteActionParams } from '@rabbitholegg/questdk'
import {
  createTestCase,
  type TestParams,
} from '@rabbitholegg/questdk-plugin-utils'

export const JOKERACE_VOTE_WITHOUT_PROOF: TestParams<VoteActionParams> = {
  transaction: {
    chainId: 10,
    from: '0xcEd09CCFc82b091195bdE04E6Cd65374518E7b95',
    hash: '0x465dfa83d66c4536952a97958933bf695ec331051c5c012b4176ad216c458790',
    input:
      '0x65f162631deb78e9b19ec93d5269a317479e7d79053d9375a0318433e755fdb74e8904b30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004e1003b28d9280000',
    to: '0xaEB8722de564846dEd437E4D6Ee257B72eA8377c',
    value: '69000000000000',
  },
  params: {
    chainId: 10,
    project: '0xaEB8722de564846dEd437E4D6Ee257B72eA8377c',
    support: 0,
    proposalId: 13533116179072430328851703657304235715448937558538095270613423517546182149299,
    weight: 90000000000000000000,
  },
}

export const passingTestCases = [
  createTestCase(JOKERACE_VOTE_WITHOUT_PROOF, 'when voting in an anyone can vote jokerace'),
]

export const failingTestCases = [
  createTestCase(JOKERACE_VOTE_WITHOUT_PROOF, 'when chainId is not correct', {
    chainId: 42161,
  }),
  createTestCase(JOKERACE_VOTE_WITHOUT_PROOF, 'when contractAddress is not correct', {
    contractAddress: '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
  }),
]
