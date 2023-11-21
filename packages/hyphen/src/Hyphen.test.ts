import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { bridge } from './Hyphen'
import { describe, expect, test } from 'vitest'
import { ABI } from './abi'
import { CHAIN_TO_CONTRACT } from './chain-to-contract'
import { NATIVE_TOKEN_ADDRESS, CHAIN_TO_TOKENS } from './chain-to-tokens'
import {
  ARBITRUM_CHAIN_ID,
  BINANCE_CHAIN_ID,
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
} from './chain-ids'
import {
  NATIVE_TRANSFER,
  ERC20_TRANSFER,
  ERC20_BRIDGE_SWAP,
} from './test-transactions'

describe('Given the Hyphen plugin', () => {
  describe('When handling the bridge', () => {
    const TEST_ADDRESS = '0x081F992BB28E1D32E138FFAB57AF8F8B932573B5'

    test('should return a valid bridge action filter using native token', async () => {
      // bridge ETH from Mainnet to Polygon
      const sourceChainId = ETH_CHAIN_ID
      const destinationChainId = POLYGON_CHAIN_ID

      const filter = await bridge({
        sourceChainId,
        destinationChainId,
        tokenAddress: NATIVE_TOKEN_ADDRESS,
        recipient: TEST_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
      })
      expect(filter).to.deep.equal({
        chainId: sourceChainId,
        to: CHAIN_TO_CONTRACT[sourceChainId],
        value: {
          $gte: '100000',
        },
        input: {
          $abi: ABI,
          toChainId: destinationChainId,
          receiver: TEST_ADDRESS,
        },
      })
    })

    test('should return a valid bridge action filter using erc-20 token', async () => {
      // bridge erc-20 from Optimism to Polygon
      const tokenAddress = CHAIN_TO_TOKENS[OPTIMISM_CHAIN_ID][0]
      const sourceChainId = OPTIMISM_CHAIN_ID
      const destinationChainId = POLYGON_CHAIN_ID

      const filter = await bridge({
        sourceChainId,
        destinationChainId,
        tokenAddress,
        recipient: TEST_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
      })
      expect(filter).to.deep.equal({
        chainId: sourceChainId,
        to: CHAIN_TO_CONTRACT[sourceChainId],
        input: {
          $abi: ABI,
          toChainId: destinationChainId,
          receiver: TEST_ADDRESS,
          tokenAddress,
          amount: {
            $gte: '100000',
          },
        },
      })
    })

    test('should pass filter when bridging native token', async () => {
      // Bridge ETH from Optimism to Arbitrum
      const filter = await bridge({
        sourceChainId: OPTIMISM_CHAIN_ID,
        destinationChainId: ARBITRUM_CHAIN_ID,
        tokenAddress: NATIVE_TOKEN_ADDRESS,
        amount: GreaterThanOrEqual(100000n),
      })

      expect(apply(NATIVE_TRANSFER, filter)).to.be.true
    })

    test('should pass filter when bridging erc20 token', async () => {
      // Bridge USDT from Mainnet to Binance Chain
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: BINANCE_CHAIN_ID,
        tokenAddress: CHAIN_TO_TOKENS[ETH_CHAIN_ID][0], // USDT
        amount: GreaterThanOrEqual(100000n),
      })

      expect(apply(ERC20_TRANSFER, filter)).to.be.true
    })

    test('should pass filter when using bridge and swap function', async () => {
      // Bridge USDC from Mainnet to Optimism
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: OPTIMISM_CHAIN_ID,
        tokenAddress: CHAIN_TO_TOKENS[ETH_CHAIN_ID][1], // USDC
        amount: GreaterThanOrEqual(100000n),
      })

      expect(apply(ERC20_BRIDGE_SWAP, filter)).to.be.true
    })
  })
})
