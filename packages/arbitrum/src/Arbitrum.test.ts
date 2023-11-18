import { bridge } from './Arbitrum.js'
import { GATEWAY_OUTBOUND_TRANSFER_FRAG } from './abi.js'
import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { ETH_CHAIN_ID, ARB_ONE_CHAIN_ID, ARB_NOVA_CHAIN_ID } from './chain-ids'
import { MAINNET_TO_ARB_ONE_GATEWAY } from './contract-addresses'
import { parseEther } from 'viem'
import { DEPOSIT_ERC20, WITHDRAW_ETH } from './test-transactions.js'
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
          $abi: GATEWAY_OUTBOUND_TRANSFER_FRAG,
          _token: DAI,
          _to: recipient,
          _amount: {
            $gte: '100000',
          },
        },
      })
    })

    test('should pass filter with valid transactions', async () => {
      const recipient = '0xf9ce182b0fbe597773ab9bb5159b7479047de8fe'

      const transaction = DEPOSIT_ERC20

      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID,
        tokenAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA', // LINK
        amount: GreaterThanOrEqual(parseEther('2000')),
        recipient: recipient,
      })

      expect(apply(transaction, filter)).to.be.true
    })

    test('should pass filter with valid withdraw transactions', async () => {
      const recipient = '0x7169b95c460a75bc6677481a1fcae1ea598f3b65'

      const transaction = WITHDRAW_ETH

      const filter = await bridge({
        sourceChainId: ARB_NOVA_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        contractAddress: '0x0000000000000000000000000000000000000064',
        tokenAddress: '0x0000000000000000000000000000000000000000',
        amount: GreaterThanOrEqual(parseEther('.005')),
        recipient: recipient,
      })

      expect(apply(transaction, filter)).to.be.true
    })

    test('should not pass filter with invalid amount', async () => {
      const recipient = '0xf9ce182b0fbe597773ab9bb5159b7479047de8fe'
      const transaction = DEPOSIT_ERC20

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
      const transaction = DEPOSIT_ERC20

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
      const transaction = DEPOSIT_ERC20

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
