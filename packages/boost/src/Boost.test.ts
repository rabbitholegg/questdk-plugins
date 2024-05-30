import { apply, CompleteActionParams } from '@rabbitholegg/questdk'
import {
  beforeEach,
  describe,
  expect,
  it,
  test,
  vi,
  MockedFunction,
} from 'vitest'
import axios from 'axios'
import {
  passingTestCases,
  failingTestCases,
  BOOST_PASS_MINT,
} from './test-transactions'
import { mint, validateComplete } from './Boost'
import { BOOST_PASS_ABI } from './constants'
import { CompletedBoostResponse } from './types'

const MockedCompletedBoostsResponse: CompletedBoostResponse = [
  {
    task_id: '3bc0103f-cb96-4744-b1a0-6dc58ec96ce2',
    task_type: 'create',
    quest_id: '40374898-9b98-4488-af2d-2288e6aef4ae',
    quest_start_time: '2024-05-21T20:12:23.704Z',
    updated_at: '2024-05-21T20:24:24.811Z',
    claim_tx_hash: '0xd400270e811538cf61d02e1b8001cc888a6ed2792db4ffd3bd193d77d3fcd7db',
    claim_chain_id: 11155111
  },
  {
    task_id: '2b517b89-9bc3-40f5-8289-8e562d176dfc',
    task_type: 'create',
    quest_id: '9ec52f66-0ec9-4646-9f4e-cd74c8506a66',
    quest_start_time: '2024-05-21T19:32:51.129Z',
    updated_at: '2024-05-21T20:04:26.636Z',
    claim_tx_hash: '0xd400270e811538cf61d02e1b8001cc888a6ed2792db4ffd3bd193d77d3fcd7db',
    claim_chain_id: 11155111
  },
]

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  }
})

describe('Given the boost plugin', () => {
  describe('When handling the mint action', () => {
    describe('should return a valid action filter', () => {
      const { params } = BOOST_PASS_MINT
      test('when minting a boostpass', async () => {
        const filter = await mint(params)
        expect(filter).to.deep.equal({
          chainId: 11155111,
          to: '0x9a618d6302f27cdbb97206ce269a31c1f7da3913',
          input: {
            $abi: BOOST_PASS_ABI,
            data_: {
              $abiParams: ['address recipient', 'address referrer'],
              recipient: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
            },
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await mint(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })
  })

  describe('When handling the complete action', () => {
    beforeEach(() => {
      vi.resetAllMocks()
    })
    describe('validateComplete function', () => {
      it('should return true if actor has completed a boost after the specified time', async () => {
        const completeAfter = Math.floor(
          new Date('2024-04-15T00:00:00.000Z').getTime() / 1000,
        )
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: MockedCompletedBoostsResponse.filter(
            (boost) =>
              new Date(boost.quest_start_time).getTime() / 1000 >=
              completeAfter,
          ),
        })
        const actor = '0x865C301c46d64DE5c9B124Ec1a97eF1EFC1bcbd1'
        const actionParams: CompleteActionParams = { completeAfter }
        const result = await validateComplete(actionParams, { actor })
        expect(result.isCompleteValid).to.be.true
      })

      it('should return true if actor has completed a boost with the specified actiontype', async () => {
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: MockedCompletedBoostsResponse.filter(
            (boost) => boost.task_type === 'create',
          ),
        })
        const completeAfter = Math.floor(
          new Date('2024-04-25T00:00:00.000Z').getTime() / 1000,
        )
        const actor = '0x865C301c46d64DE5c9B124Ec1a97eF1EFC1bcbd1'
        const actionParams: CompleteActionParams = {
          completeAfter,
          actionType: 'create',
        }
        const result = await validateComplete(actionParams, { actor })
        expect(result.isCompleteValid).to.be.true
      })

      it('should return true if actor has completed a boost with a specific Boost ID', async () => {
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: MockedCompletedBoostsResponse.filter(
            (boost) =>
              boost.quest_id === '9ec52f66-0ec9-4646-9f4e-cd74c8506a66',
          ),
        })
        const completeAfter = Math.floor(
          new Date('2024-04-15T00:00:00.000Z').getTime() / 1000,
        )
        const actor = '0x865C301c46d64DE5c9B124Ec1a97eF1EFC1bcbd1'
        const actionParams: CompleteActionParams = {
          completeAfter,
          boostId: '9ec52f66-0ec9-4646-9f4e-cd74c8506a66',
        }
        const result = await validateComplete(actionParams, { actor })
        expect(result.isCompleteValid).to.be.true
      })

      it('should return true if actor has completed a boost with the specified ChainId', async () => {
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: MockedCompletedBoostsResponse,
        })
        const completeAfter = Math.floor(
          new Date('2024-04-25T00:00:00.000Z').getTime() / 1000,
        )
        const actor = '0x865C301c46d64DE5c9B124Ec1a97eF1EFC1bcbd1'
        const actionParams: CompleteActionParams = {
          completeAfter,
          chainId: '0xaa36a7',
        }
        const result = await validateComplete(actionParams, { actor })
        expect(result.isCompleteValid).to.be.true
      })

      it('should return false if actor has not completed a boost', async () => {
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: [],
        })
        const completeAfter = Math.floor(
          new Date('2024-04-25T00:00:00.000Z').getTime() / 1000,
        )
        const actor = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' // vitalik.eth
        const actionParams: CompleteActionParams = { completeAfter }
        const result = await validateComplete(actionParams, { actor })
        expect(result.isCompleteValid).to.be.false
      })

      it('should return false if actor has not completed a boost after the specified time', async () => {
        const completeAfter = Math.floor(
          new Date('2024-05-25T00:00:00.000Z').getTime() / 1000,
        )
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: MockedCompletedBoostsResponse.filter(
            (boost) =>
              new Date(boost.quest_start_time).getTime() / 1000 >=
              completeAfter,
          ),
        })

        const actor = '0x865C301c46d64DE5c9B124Ec1a97eF1EFC1bcbd1'
        const actionParams: CompleteActionParams = { completeAfter }
        const result = await validateComplete(actionParams, { actor })
        expect(result.isCompleteValid).to.be.false
      })

      it('should return false if actor has not completed a boost with the specified actiontype', async () => {
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: MockedCompletedBoostsResponse.filter(
            (boost) => boost.task_type === 'stake',
          ),
        })
        const completeAfter = Math.floor(
          new Date('2024-04-25T00:00:00.000Z').getTime() / 1000,
        )
        const actor = '0x865C301c46d64DE5c9B124Ec1a97eF1EFC1bcbd1'
        const actionParams: CompleteActionParams = {
          completeAfter,
          actionType: 'stake',
        }
        const result = await validateComplete(actionParams, { actor })
        expect(result.isCompleteValid).to.be.false
      })

      it('should return false if actor has not completed a boost with the specified Boost ID', async () => {
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: MockedCompletedBoostsResponse.filter(
            (boost) => boost.task_id === '9ec52f66-0ec9-4646-9f4e-cd74c8506a65',
          ),
        })
        const completeAfter = Math.floor(
          new Date('2024-04-25T00:00:00.000Z').getTime() / 1000,
        )
        const actor = '0x865C301c46d64DE5c9B124Ec1a97eF1EFC1bcbd1'
        const actionParams: CompleteActionParams = {
          completeAfter,
          boostId: '9ec52f66-0ec9-4646-9f4e-cd74c8506a65',
        }
        const result = await validateComplete(actionParams, { actor })
        expect(result.isCompleteValid).to.be.false
      })

      it('should return false if actor has not completed a boost with the specified ChainId', async () => {
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: [],
        })
        const completeAfter = Math.floor(
          new Date('2024-04-25T00:00:00.000Z').getTime() / 1000,
        )
        const actor = '0x865C301c46d64DE5c9B124Ec1a97eF1EFC1bcbd1'
        const actionParams: CompleteActionParams = {
          completeAfter,
          chainId: '0xa',
        }
        const result = await validateComplete(actionParams, { actor })
        expect(result.isCompleteValid).to.be.false
      })
    })
  })
})
