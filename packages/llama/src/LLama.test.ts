import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { vote } from './Llama'
import { LLAMA_ABI_CAST_APPROVE, LLAMA_ABI_CAST_DISAPPROVE } from './abi'
import {
  // OP_CAST_APPROVAL,
  SEP_CAST_APPROVAL,
  SEP_CAST_DISAPPROVAL,
} from './test-transactions'

const _CHAIN_SEP = 11155111
const _APPROVAL_ID = 346
const _DISAPPROVAL_ID = 9

describe('Given the llama plugin', () => {
  describe('When handling the vote action', () => {
    describe('should return a valid action filter', async () => {
      test('casting approval', async () => {
        const filter = await vote({
          chainId: _CHAIN_SEP,
          project: SEP_CAST_APPROVAL.to,
          support: true,
          proposalId: _APPROVAL_ID,
        })
        expect(filter).to.deep.equal({
          chainId: _CHAIN_SEP,
          to: SEP_CAST_APPROVAL.to,
          input: {
            $abi: LLAMA_ABI_CAST_APPROVE,
            actionInfo: {
              id: _APPROVAL_ID,
            },
          },
        })
      })
      test('casting disapproval', async () => {
        const filter = await vote({
          chainId: _CHAIN_SEP,
          project: SEP_CAST_DISAPPROVAL.to,
          support: false,
          proposalId: _DISAPPROVAL_ID,
        })
        expect(filter).to.deep.equal({
          chainId: _CHAIN_SEP,
          to: SEP_CAST_DISAPPROVAL.to,
          input: {
            $abi: LLAMA_ABI_CAST_DISAPPROVE,
            actionInfo: {
              id: _DISAPPROVAL_ID,
            },
          },
        })
      })
    })
    describe('should pass filter with valid transactions', async () => {
      test('casting approval', async () => {
        const transaction = SEP_CAST_APPROVAL

        let filter = await vote({
          chainId: _CHAIN_SEP,
          project: SEP_CAST_APPROVAL.to,
          support: true,
        })
        expect(apply(transaction, filter)).to.be.true

        filter = await vote({
          chainId: _CHAIN_SEP,
          project: SEP_CAST_APPROVAL.to,
          support: true,
          proposalId: _APPROVAL_ID,
        })
        expect(apply(transaction, filter)).to.be.true
      })

      test('casting disapproval', async () => {
        const transaction = SEP_CAST_DISAPPROVAL

        let filter = await vote({
          chainId: _CHAIN_SEP,
          project: SEP_CAST_DISAPPROVAL.to,
          support: false,
        })
        expect(apply(transaction, filter)).to.be.true

        filter = await vote({
          chainId: _CHAIN_SEP,
          project: SEP_CAST_DISAPPROVAL.to,
          support: false,
          proposalId: _DISAPPROVAL_ID,
        })
        expect(apply(transaction, filter)).to.be.true
      })

      test('casting either', async () => {
        const filter = await vote({
          chainId: _CHAIN_SEP,
          project: SEP_CAST_DISAPPROVAL.to,
        })
        expect(apply(SEP_CAST_DISAPPROVAL, filter)).to.be.true
        expect(apply(SEP_CAST_APPROVAL, filter)).to.be.true
      })
    })

    describe('should not pass filter with invalid transactions', async () => {
      test('should not pass filter with bad proposal', async () => {
        const transaction = SEP_CAST_DISAPPROVAL
        const _BAD_PROPOSAL = 1
        const filter = await vote({
          chainId: _CHAIN_SEP,
          project: SEP_CAST_DISAPPROVAL.to,
          support: false,
          proposalId: _BAD_PROPOSAL,
        })
        expect(apply(transaction, filter)).to.be.false
      })

      test('should not pass filter with opposite action', async () => {
        const transaction = SEP_CAST_APPROVAL
        const filter = await vote({
          chainId: _CHAIN_SEP,
          project: SEP_CAST_APPROVAL.to,
          support: false,
          proposalId: _APPROVAL_ID,
        })
        expect(apply(transaction, filter)).to.be.false
      })
    })
  })
})
