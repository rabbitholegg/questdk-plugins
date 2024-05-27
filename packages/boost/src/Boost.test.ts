import { apply } from '@rabbitholegg/questdk'
import { beforeEach, describe, expect, it, test, vi, MockedFunction } from 'vitest'
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
    task_id: "489539ce-d6f7-4101-9db7-b44b2d321a3b",
    task_type: "swap",
    quest_id: "2c35ab7c-8dbd-45a9-9248-0e6ede56e23a",
    quest_start_time: "2024-04-15T19:17:00.000Z",
    updated_at: "2024-04-15T19:20:48.703Z"
  },
  {
    task_id: "4502c969-95e1-474a-bd4a-3c9c4cf7c3ea",
    task_type: "swap",
    quest_id: "23bcbf8a-32af-4115-9a08-13a50cb3c473",
    quest_start_time: "2024-04-15T19:05:00.918Z",
    updated_at: "2024-04-15T19:09:01.048Z"
  },
  {
    task_id: "fc115ffc-4294-4905-9d89-dbfeac72d19e",
    task_type: "swap",
    quest_id: "fce20b0b-c3d7-44e1-bf1b-99d13064b6da",
    quest_start_time: "2024-04-15T19:05:00.000Z",
    updated_at: "2024-04-15T19:08:01.057Z"
  }
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
    describe.skip('should return a valid action filter', () => {})

    describe('validateComplete function', () => {
      beforeEach(() => {
        vi.resetAllMocks()
      })

      it('should return true if actor has completed a boost', async () => {
        ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
          status: 200,
          data: MockedCompletedBoostsResponse,
        })

        const completeAfter = Math.floor((new Date('2024-04-15T00:00:00.000Z')).getTime() / 1000)
        const actor = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' // vitalik.eth
        const actionParams = { completeAfter }
        const result = await validateComplete(actionParams, { actor })
        expect(result).to.be.true
      })
    })
  })
})
