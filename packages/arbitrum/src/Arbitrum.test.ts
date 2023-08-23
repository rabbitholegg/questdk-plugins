import { bridge } from './Arbitrum.js'
import {GATEWAY_OUTBOUND_TRANSFER_FRAG} from './abi.js'
import { GreaterThanOrEqual } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { ETH_CHAIN_ID, ARB_ONE_CHAIN_ID } from './chain-ids'
import { MAINNET_TO_ARB_ONE_GATEWAY } from './contract-addresses'

// Replace *project* with the name of the project
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
        chainId: '0x1',
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

    test('should pass filter with valid transactions',  () => {
      
    })
    
    test('should not pass filter with invalid transactions',  () => {
      
    })

  })
})
