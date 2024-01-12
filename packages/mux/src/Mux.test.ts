import { apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import {
  options,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Mux'
import { GNS_ABI } from './abi'
import {
  AggregatorProxyFactory__factory,
  AggregatorGmxV2Adapter__factory,
  OrderBook__factory,
} from '@mux-network/mux.js'
import {
  passingTestCases,
  failingTestCases,
  MUX_ETH_MARKET_LONG,
} from './test-transactions'

describe('Given the mux plugin', () => {
  describe('When handling the options action', () => {
    describe('should return a valid action filter', () => {
      test('when making a valid trade', async () => {
        const { params } = MUX_ETH_MARKET_LONG
        const filter = await options(params)
        expect(filter).to.deep.equal({
          chainId: 42161,
          to: {
            $or: [
              '0xa19fd5ab6c8dcffa2a295f78a5bb4ac543aaf5e3',
              '0x2ff2f1d9826ae2410979ae19b88c361073ab0918',
              '0x2c7e82641f03fa077f88833213210a86027f15dc',
            ],
          },
          input: {
            $or: [
              {
                // mux contract
                $abi: OrderBook__factory.abi,
                subAccountId: {
                  $and: [
                    {
                      $regex: '^0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
                    },
                    {
                      $regex: '0x[a-fA-F0-9]{40}03',
                    },
                  ],
                },
                collateralAmount: {
                  $gte: '1000000000000000',
                },
                deadline: 0,
              },
              {
                // aggregator contract gmx V2
                $abi: AggregatorProxyFactory__factory.abi,
                args: {
                  tokenIn: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                  amountIn: {
                    $gte: '1000000000000000',
                  },
                  flags: {
                    $bitmask: {
                      bitmask: '0x40',
                      value: 64,
                    },
                  },
                },
              },
              {
                // aggregator contract gmx V2 multicall
                $abiAbstract: AggregatorGmxV2Adapter__factory.abi,
                createParams: {
                  swapPath: {
                    $regex: '^0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
                  },
                  initialCollateralAmount: {
                    $gte: '1000000000000000',
                  },
                  orderType: 2,
                },
              },
              {
                // gns contract
                $abi: GNS_ABI,
                t: {
                  trader: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
                  positionSizeDai: {
                    $gte: '1000000000000000',
                  },
                },
                orderType: 0,
                referrer: '0x10C2CbfE29f4f5e4C24d54d36C8F283A61eB0c2f',
              },
            ],
          },
        })
      })
    })

    describe('should pass filter with valid transactions', () => {
      passingTestCases.forEach((testCase) => {
        const { description, transaction, params } = testCase
        test(description, async () => {
          const filter = await options(params)
          expect(apply(transaction, filter)).to.be.true
        })
      })
    })

    describe('should not pass filter with invalid transactions', () => {
      failingTestCases.forEach((testCase) => {
        const { description, transaction, params } = testCase
        test(description, async () => {
          const filter = await options(params)
          expect(apply(transaction, filter)).to.be.false
        })
      })
    })

    describe('should return a valid list of tokens for each supported chain', async () => {
      const CHAIN_ID_ARRAY = await getSupportedChainIds()
      CHAIN_ID_ARRAY.forEach((chainId) => {
        test(`for chainId: ${chainId}`, async () => {
          const tokens = await getSupportedTokenAddresses(chainId)
          const addressRegex = /^0x[a-fA-F0-9]{40}$/
          expect(tokens).to.be.an('array')
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
