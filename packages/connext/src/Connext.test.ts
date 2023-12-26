import { getDeployedMultisendContract } from '@connext/nxtp-txservice'
import { MultisendAbi } from '@connext/nxtp-utils'
import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Connext.js'
import { XCALL_ABI_FRAGMENTS } from './abi.js'
import { passingTestCases, failingTestCases } from './test-transactions.js'
import { zeroAddress as ETH } from 'viem'

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
        chainId: 10,
        to: '0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA',
        input: {
          $abi: XCALL_ABI_FRAGMENTS,
          _destination: 1886350457,
          _asset: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
          _amount: {
            $gte: '100000',
          },
        },
      })
    })
  })

  test('should use the WETH wrapper multisend contract when bridging ETH', async () => {
    const filter = await bridge({
      sourceChainId: 10,
      destinationChainId: 137,
      tokenAddress: ETH,
      amount: GreaterThanOrEqual(100000n),
    })

    const multiSendContract = getDeployedMultisendContract(10)

    expect(filter).to.deep.equal({
      chainId: 10,
      to: multiSendContract?.address,
      value: {
        $gte: '100000',
      },
      input: {
        $abi: MultisendAbi,
      },
    })
  })

  describe('Apply filter', () => {
    passingTestCases.forEach((testCase) => {
      const { transaction, description, params } = testCase
      test(description, async () => {
        const filter = await bridge(params)
        expect(apply(transaction, filter)).to.be.true
      })
    })

    failingTestCases.forEach((testCase) => {
      const { transaction, description, params } = testCase
      test(description, async () => {
        const filter = await bridge(params)
        expect(apply(transaction, filter)).to.be.false
      })
    })
  })
})
