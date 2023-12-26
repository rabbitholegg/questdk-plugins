import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Connext.js'
import { MultisendAbi } from '@connext/nxtp-utils'
import { XCALL_ABI_FRAGMENTS } from './abi.js'
import { passingTestCases, failingTestCases } from './test-transactions.js'

describe('Given the Connext plugin', () => {
  describe('When handling the bridge action', () => {
    describe('should return a valid action filter', () => {
      test('when doing a valid bridge action', async () => {
        const { params } = passingTestCases[0]
        const filter = await bridge(params)
        expect(filter).to.deep.equal({
          chainId: 10,
          to: {
            $or: [
              '0x8f7492de823025b4cfaab1d34c58963f2af5deda',
              '0xb0eef3e1de973d045c3858e072c540299585252d',
            ],
          },
          from: '0xd59a74e615c9d55422ed8c5ce64cb50fda0bb58d',
          input: {
            $or: [
              {
                $abi: MultisendAbi,
                transactions: {
                  $regex: 'd59a74e615c9d55422ed8c5ce64cb50fda0bb58d',
                },
              },
              {
                $abi: XCALL_ABI_FRAGMENTS,
                _destination: 6778479,
                _asset: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
                _amount: {
                  $gte: '2000000000000000000',
                },
                _delegate: '0xd59a74e615c9d55422ed8c5ce64cb50fda0bb58d',
              },
            ],
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await bridge(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { transaction, description, params } = testCase
        test(description, async () => {
          const filter = await bridge(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    describe('should return a valid list of tokens for each supported chain', async () => {
      const chainIdArray = await getSupportedChainIds()
      chainIdArray.forEach((chainId) => {
        test(`for chainId: ${chainId}`, async () => {
          const tokens = await getSupportedTokenAddresses(chainId)
          const addressRegex = /^0x[a-fA-F0-9]{40}$/
          expect(tokens).to.be.an('array')
          expect(tokens).to.have.length.greaterThan(0)
          expect(tokens).to.have.length.lessThan(100)
          tokens.forEach((token) => {
            expect(token).to.match(
              addressRegex,
              `Token address ${token} is not a valid Ethereum address`,
            )
          })
        })
      })
    })
  })
})
