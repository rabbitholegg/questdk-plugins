import { GreaterThanOrEqual } from '@rabbitholegg/questdk/filter'
import { bridge, XCALL_ABI_FRAGMENTS } from './Connext.js'
import { describe, expect, test } from 'vitest'

describe('Connext', () => {
  describe('Bridge', () => {
    const USDC = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607'

    test('should return a valid bridge action filter', async () => {
      const filter = await bridge({
        sourceChainId: 10,
        destinationChainId: 137,
        tokenAddress: USDC,
        amount: GreaterThanOrEqual(100000n),
      })

      expect(filter).to.deep.equal({
        chainId: '0xa',
        to: '0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA',
        input: {
          $abi: XCALL_ABI_FRAGMENTS,
          _destination: '1886350457',
          _asset: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
          _amount: {
            $gte: '100000',
          },
        },
      })
    })
  })
})
