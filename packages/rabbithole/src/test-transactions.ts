import type { TransactionEIP1559, Address, Hash } from 'viem'
import { parseEther } from 'viem'

interface TestTransaction {
  transaction: TransactionEIP1559
  rewardTokenId?: Address
  rewardAmount?: number
  startTime?: number
  endTime?: number
  totalParticipants?: number
  description: string
}

const CREATE_AND_QUEUE_QUEST_TX = {
  accessList: [],
  blockHash:
    '0xc49a728f6cc2838a5d908578034620e7cfd0b2f153c90ebb1a039a83e9a07f5e',
  blockNumber: '111583253',
  chainId: 10,
  from: '0xcd01a3aced67e266be21117376c7025b384cd4d7',
  gas: '598450',
  gasPrice: '65425428',
  hash: '0x0e0b58546a0370af36de762bc80fd640357bcd2eaa47035bc03c7da7c93dbc6f',
  input:
    '0x81589b1f0000000000000000000000004200000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000006567600000000000000000000000000000000000000000000000000000000000654119d9000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000014d1120d7b160000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002431333032623765662d313034322d343963652d393839372d666564396439363231653632000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: '204238186',
  maxPriorityFeePerGas: '8351427',
  nonce: 1234,
  r: '0xa412708d837481ae00e8dae092298693eeff2f22f800d235f57e555035e20fab',
  s: '0x61980066e926b15123a6d35025d6ce9448e8c0c25e88b99374e5354cb0e11f06',
  to: '0x52629961f71c1c2564c5aa22372cb1b9fa9eba3e',
  transactionIndex: 4,
  type: 'eip1559',
  v: '1',
  value: '0',
  typeHex: '0x2',
}
export const controlTransaction: TestTransaction = {
  transaction: CREATE_AND_QUEUE_QUEST_TX,
  rewardTokenId: '0x4200000000000000000000000000000000000042',
  rewardAmount: 1500000000000000000,
  startTime: 1698765273,
  endTime: 1701273600,
  totalParticipants: 1,
  description: 'Control Create and Queue Quest TCX',
}

export const PASSING_TEST_TRANSACTIONS: TestTransaction[] = [controlTransaction]

export const FAILING_TEST_TRANSACTIONS: TestTransaction[] = [
  {
    ...controlTransaction,
    rewardTokenId: '0x0',
    description: 'when reward token is incorrect',
  },
  {
    ...controlTransaction,
    rewardAmount: controlTransaction.rewardAmount + 1000000,
    description: 'when reward amount is incorrect',
  },
  {
    ...controlTransaction,
    startTime: controlTransaction.startTime - 100,
    description: 'when start time is incorrect',
  },
  {
    ...controlTransaction,
    endTime: controlTransaction.endTime + 100,
    description: 'when end time is incorrect',
  },
  {
    ...controlTransaction,
    totalParticipants: controlTransaction.totalParticipants + 1,
    description: 'when total participants is incorrect',
  },
]
