import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { bridge } from './Arbitrum'
import { OUTBOUND_TRANSFER_L1_TO_L2 } from './abi'
import { describe, expect, test } from 'vitest'
import { ETH_CHAIN_ID, ARB_ONE_CHAIN_ID, ARB_NOVA_CHAIN_ID } from './chain-ids'
import { MAINNET_TO_ARB_ONE_GATEWAY } from './contract-addresses'
import { parseEther, parseUnits, zeroAddress } from 'viem'
import {
  L1_ETH_TO_ONE,
  L1_ETH_TO_NOVA,
  L1_TOKEN_TO_ONE,
  L1_TOKEN_TO_NOVA,
  L2_ETH_TO_L1,
  L2_TOKEN_TO_L1,
} from './test-transactions.js'
describe('Given the arbitrum plugin', () => {
  describe('When handling the bridge', () => {
    const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'
    const recipient = '0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA'

    test('should return a valid action filter', async () => {
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID,
        tokenAddress: DAI,
        recipient: recipient,
        amount: GreaterThanOrEqual(100000n),
      })
      expect(filter).to.deep.equal({
        chainId: ETH_CHAIN_ID,
        to: MAINNET_TO_ARB_ONE_GATEWAY,
        input: {
          $abi: OUTBOUND_TRANSFER_L1_TO_L2,
          _token: DAI,
          _to: recipient,
          _amount: {
            $gte: '100000',
          },
        },
      })
    })

    test('should pass filter when bridging ETH to L2 (Arb One)', async () => {
      const recipient = '0x6d7ac63aaa7ba8925dcb3e44be6355261dcf688f'
      const transaction = L1_ETH_TO_ONE
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID,
        tokenAddress: zeroAddress, // ETH
        amount: GreaterThanOrEqual(parseEther('3')),
        recipient: recipient,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter when bridging ETH to L2 (Arb Nova)', async () => {
      const recipient = '0xba84392ae32a0ffcab1195c57172c05292e02b3e'
      const transaction = L1_ETH_TO_NOVA
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_NOVA_CHAIN_ID,
        tokenAddress: zeroAddress, // ETH
        amount: GreaterThanOrEqual(parseEther('0.25')),
        recipient: recipient,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter when bridging tokens to L2 (Arb One)', async () => {
      const recipient = '0xf9ce182b0fbe597773ab9bb5159b7479047de8fe'
      const transaction = L1_TOKEN_TO_ONE
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID,
        tokenAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA', // LINK
        amount: GreaterThanOrEqual(parseEther('2000')),
        recipient: recipient,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter when bridging tokens to L2 (Arb Nova)', async () => {
      const recipient = '0x1f536b22d877dc2a116c7bedc862a539551bc56d'
      const transaction = L1_TOKEN_TO_NOVA
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_NOVA_CHAIN_ID,
        tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
        amount: GreaterThanOrEqual(parseUnits('10000', 6)),
        recipient: recipient,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter when withdrawing ETH to L1', async () => {
      const recipient = '0x7169b95c460a75bc6677481a1fcae1ea598f3b65'
      const transaction = L2_ETH_TO_L1
      const filter = await bridge({
        sourceChainId: ARB_NOVA_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        contractAddress: '0x0000000000000000000000000000000000000064',
        tokenAddress: zeroAddress,
        amount: GreaterThanOrEqual(parseEther('.005')),
        recipient: recipient,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter when withdrawing tokens to L1', async () => {
      const recipient = '0x572b093d735b9e91cbd90972e846333d444f25cd'
      const transaction = L2_TOKEN_TO_L1
      const filter = await bridge({
        sourceChainId: ARB_ONE_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', // USDC.e
        amount: GreaterThanOrEqual(parseUnits('152260', 6)),
        recipient: recipient,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter when tokenAddress is "any" using ETH', async () => {
      const recipient = '0x7169b95c460a75bc6677481a1fcae1ea598f3b65'
      const transaction = L2_ETH_TO_L1
      const filter = await bridge({
        sourceChainId: ARB_NOVA_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        contractAddress: '0x0000000000000000000000000000000000000064',
        tokenAddress: undefined,
        recipient: recipient,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter when tokenAddress is "any" using tokens', async () => {
      const recipient = '0x572b093d735b9e91cbd90972e846333d444f25cd'
      const transaction = L2_TOKEN_TO_L1
      const filter = await bridge({
        sourceChainId: ARB_ONE_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: undefined,
        recipient: recipient,
      })
      expect(apply(transaction, filter)).to.be.true
    })

    test('should not pass filter with invalid amount', async () => {
      const recipient = '0xf9ce182b0fbe597773ab9bb5159b7479047de8fe'
      const transaction = L1_TOKEN_TO_ONE

      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID,
        tokenAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA', // LINK
        amount: GreaterThanOrEqual(parseEther('5000')), // 5000 LINK
        recipient: recipient,
      })

      expect(apply(transaction, filter)).to.be.false
    })

    test('should not pass filter with invalid token', async () => {
      const recipient = '0xf9ce182b0fbe597773ab9bb5159b7479047de8fe'
      const transaction = L1_TOKEN_TO_ONE

      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID,
        tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
        amount: GreaterThanOrEqual(parseEther('2000')),
        recipient: recipient,
      })

      expect(apply(transaction, filter)).to.be.false
    })
    test('should not pass filter with invalid recipient', async () => {
      const recipient = '0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef'
      const transaction = L1_TOKEN_TO_ONE

      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID,
        tokenAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA', // LINK
        amount: GreaterThanOrEqual(parseEther('2000')),
        recipient: recipient,
      })

      expect(apply(transaction, filter)).to.be.false
    })
  })
})
