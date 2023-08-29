import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Polygon.js'
import {POLYGON_CHAIN_ID, ETH_CHAIN_ID, CHAIN_ID_ARRAY} from './chain-ids.js'
import { MAINNET_BRIDGE } from './contract-addresses.js'

import {
  POLYGON_BRIDGE_ABI_FUNCS
} from './abi.js'
import {
  DEPOSIT_ETH,
  DEPOSIT_ERC20,
  WITHDRAW_ETH,
  WITHDRAW_ERC20,
} from './test-transactions.js'
import {
  ETHER_ADDRESS,
  MATIC_ADDRESS_POLYGON,
  USDC_ADDRESS_MAINNET,
  WETH_ADDRESS_POLYGON
} from './supported-token-addresses.js'
import { parseEther } from 'viem'

// Replace *project* with the name of the project
describe('Given the optimism plugin', () => {
  describe('When generating the filter', () => {
    test('should return a valid bridge action filter for L2 token tx', async () => {
      const filter = await bridge({
        sourceChainId: POLYGON_CHAIN_ID,
        destinationChainId: ETH_CHAIN_ID,
        tokenAddress: USDC_ADDRESS_MAINNET,
        amount: GreaterThanOrEqual(100000n),
      })

      expect(filter).to.deep.equal({
        chainId: '0xa',
        to: MAINNET_BRIDGE,
        input: {
          $abi: POLYGON_BRIDGE_ABI_FUNCS,
          _l2Token: USDC_ADDRESS_MAINNET,
          _amount: {
            $gte: '100000',
          },
        },
      })
    })
  })
})