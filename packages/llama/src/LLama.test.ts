import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { vote } from './Llama'
import { LLAMA_ABI_CAST_APPROVE } from './abi'
import { OPTIMISM_CHAIN_ID } from './chain-ids'
import { OP_CAST_APPROVAL } from './test-transactions'

describe('Given the llama plugin', () => {
  describe('When handling the vote action', () => {
    describe('should return a valid action filter', async () => {
      // chainId: number;
      // project: Address | string;
      // support?: bigint | boolean | FilterOperator;
      // proposalId?: bigint | FilterOperator;
      const filter = await vote({
        chainId: OPTIMISM_CHAIN_ID,
        project: OP_CAST_APPROVAL.to,
        support: true,
        proposalId: 31,
      })
      expect(filter).to.deep.equal({
        chainId: OPTIMISM_CHAIN_ID,
        to: OP_CAST_APPROVAL.to,
        input: {
          $abi: LLAMA_ABI_CAST_APPROVE,
          actionInfo: {
            id: 31,
          },
        },
      })
    })

    describe('should pass filter with valid transactions', () => {})

    describe('should not pass filter with invalid transactions', () => {})
  })
})
