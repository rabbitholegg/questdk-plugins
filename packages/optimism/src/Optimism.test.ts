import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Optimism.js'
import { l1StandardBridgeABI, l2StandardBridgeABI, addresses } from '@eth-optimism/contracts-ts'

// Replace *project* with the name of the project
describe('Given the optimism plugin', () => {
  describe('When handling the bridge', () => {
    test('should return a valid action filter', () => {})
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
            $abi: l2StandardBridgeABI,
            _l2Token: USDC,
            _amount: {
              $gte: '100000',
            },
          },
        })
      })
    })

    test('should pass filter with valid transactions',  () => {
      
    })
    
    test('should not pass filter with invalid transactions',  () => {
      
    })

})
