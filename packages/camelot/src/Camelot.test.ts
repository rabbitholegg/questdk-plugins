import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { SWAP_ETH, SWAP_TOKENS } from './test-transactions'
import { CAMELOT_ROUTER } from './contract-addresses'
import { ARBITRUM_CHAIN_ID } from './chain-ids'
import { parseEther } from 'viem'
import { swap } from './Camelot'
import { CAMELOT_ABI } from './abi'
describe('Given the camelot plugin', () => {
  describe('When handling the bridge', () => {
    test('should return a valid action filter', async () => {
      const filter = await swap({
        chainId: ARBITRUM_CHAIN_ID,
        contractAddress: CAMELOT_ROUTER,
        tokenOut: '0xBfbCFe8873fE28Dfa25f1099282b088D52bbAD9C',
        amountOut: GreaterThanOrEqual(parseEther('0.0005')),
      })

      expect(filter).to.deep.equal({
        chainId: 42161,
        to: '0xc873fEcbd354f5A56E00E710B90EF4201db2448d',
        input: {
          $abi: CAMELOT_ABI,
          path: {
            $and: [{ $last: '0xBfbCFe8873fE28Dfa25f1099282b088D52bbAD9C' }],
          },
          amountOutMin: { $gte: '500000000000000' },
        },
      })
    })
    test('should pass filter with valid ETH transactions', async () => {
      const transaction = SWAP_ETH
      const filter = await swap({
        chainId: ARBITRUM_CHAIN_ID,
        contractAddress: CAMELOT_ROUTER,
        tokenOut: '0xBfbCFe8873fE28Dfa25f1099282b088D52bbAD9C',
        amountOut: GreaterThanOrEqual(parseEther('0.0005')),
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should not pass filter with valid tokens transactions', async () => {
      const transaction = SWAP_TOKENS
      const filter = await swap({
        chainId: ARBITRUM_CHAIN_ID,
        tokenIn: '0x5190F06EaceFA2C552dc6BD5e763b81C73293293', // WOMBEX
        tokenOut: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // TETHER
        amountIn: GreaterThanOrEqual(parseEther('750')),
      })
      expect(apply(transaction, filter)).to.be.true
    })
  })
})
