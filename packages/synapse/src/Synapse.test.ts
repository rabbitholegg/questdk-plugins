import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Synapse.js'
import {
  DEPOSIT_ETH,

} from './test-transactions.js'
import {
  ARBITRUM_CHAIN_ID,
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
} from './chain-ids.js'
import { SYNAPSE_BRIDGE_FRAGMENTS } from './abi.js'
import { parseEther } from 'viem'


const ARBITRUM_USDCE_ADDRESS = '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
const ARBITRUM_USDT_ADDRESS = '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'
const ETHEREUM_USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
const OP_USDCE_ADDRESS = '0x7f5c764cbc14f9669b88837ca1490cca17c31607'

// Synapse bridger Addrress -- need to make sure this user has the valid txns
const TEST_USER = '0xF57D86F6bFcc76AA2C7f62616B2436C60Ad397e2'

describe('When given the Synapse plugin', () => {
  describe('When generating the filter', () => {

    test('Should return a valid bridge action filter for L2 token tx', async () => {
      const filter = await bridge({
        sourceChainId: ARBITRUM_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: ARBITRUM_USDCE_ADDRESS, 
        amount: GreaterThanOrEqual(100000n),
        recipient: TEST_USER
      })

      expect(filter).to.deep.equal({
        chainId: ARBITRUM_CHAIN_ID, 
        to: TEST_USER, 
        input: {
          $abi: SYNAPSE_BRIDGE_FRAGMENTS,
          sender: TEST_USER,
          amount: {
            $gte: '100000'
          },
          chainId: ETH_CHAIN_ID,
          token: ARBITRUM_USDCE_ADDRESS,
        },
      })
    })
    // Need to add L1 -> L2 and L2 -> L1 for CCTP transactions and then non-cctp transactions (Can just use ETH for non-cctp) ==> 4 cases
    // Need to add when certain variable are missing that the tests still pass. 

    test('should pass filter with valid transactions',  () => {
      
    })
    
    test('should not pass filter with invalid transactions',  () => {
      
    })

  })
})
