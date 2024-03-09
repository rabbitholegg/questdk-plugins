import type { TransactionEIP1559, Address, Hash } from 'viem'

interface TestTransaction {
  transaction: TransactionEIP1559
  rewardToken?: Address
  rewardAmount?: bigint
  startTime?: bigint
  endTime?: bigint
  totalParticipants?: number
  description: string
}

const CREATE_AND_QUEUE_QUEST_TX: TransactionEIP1559 = {
  accessList: [],
  blockHash:
    '0xc49a728f6cc2838a5d908578034620e7cfd0b2f153c90ebb1a039a83e9a07f5e' as Hash,
  blockNumber: 111583253n,
  chainId: 10,
  from: '0xcd01a3aced67e266be21117376c7025b384cd4d7' as Address,
  gas: 598450n,
  //gasPrice: 65425428n,
  hash: '0x0e0b58546a0370af36de762bc80fd640357bcd2eaa47035bc03c7da7c93dbc6f' as Hash,
  input:
    '0x81589b1f0000000000000000000000004200000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000006567600000000000000000000000000000000000000000000000000000000000654119d9000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000014d1120d7b160000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002431333032623765662d313034322d343963652d393839372d666564396439363231653632000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' as Hash,
  maxFeePerGas: 204238186n,
  maxPriorityFeePerGas: 8351427n,
  nonce: 1234,
  r: '0xa412708d837481ae00e8dae092298693eeff2f22f800d235f57e555035e20fab' as Hash,
  s: '0x61980066e926b15123a6d35025d6ce9448e8c0c25e88b99374e5354cb0e11f06' as Hash,
  to: '0x52629961f71c1c2564c5aa22372cb1b9fa9eba3e' as Hash,
  transactionIndex: 4,
  type: 'eip1559' as const,
  v: 1n,
  value: 0n,
  typeHex: '0x2' as Hash,
  yParity: 0,
} as TransactionEIP1559

export const controlTransaction: TestTransaction = {
  transaction: CREATE_AND_QUEUE_QUEST_TX,
  rewardToken: '0x4200000000000000000000000000000000000042',
  rewardAmount: 1500000000000000000n,
  startTime: 1698765273n,
  endTime: 1701273600n,
  totalParticipants: 1,
  description: 'Control Create and Queue Quest TCX',
}

export const PASSING_TEST_TRANSACTIONS: TestTransaction[] = [
  controlTransaction,
  {
    ...controlTransaction,
    rewardToken: undefined,
    description: 'when reward token is undefined',
  },
  {
    ...controlTransaction,
    rewardAmount: undefined,
    description: 'when reward amount is undefined',
  },
  {
    ...controlTransaction,
    startTime: undefined,
    description: 'when start time is undefined',
  },
  {
    ...controlTransaction,
    endTime: undefined,
    description: 'when end time is undefined',
  },
  {
    ...controlTransaction,
    totalParticipants: undefined,
    description: 'when total participants is undefined',
  },
]

export const FAILING_TEST_TRANSACTIONS: TestTransaction[] = [
  {
    ...controlTransaction,
    rewardToken: '0x0',
    description: 'when reward token is incorrect',
  },
  {
    ...controlTransaction,
    rewardAmount: controlTransaction.rewardAmount! + 1000000n,
    description: 'when reward amount is incorrect',
  },
  {
    ...controlTransaction,
    startTime: controlTransaction.startTime! - 100n,
    description: 'when start time is incorrect',
  },
  {
    ...controlTransaction,
    endTime: controlTransaction.endTime! + 100n,
    description: 'when end time is incorrect',
  },
  {
    ...controlTransaction,
    totalParticipants: controlTransaction.totalParticipants! + 1,
    description: 'when total participants is incorrect',
  },
]
