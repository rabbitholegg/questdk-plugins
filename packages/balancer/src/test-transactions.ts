import { ARBITRUM_CHAIN_ID } from '../../camelot/src/chain-ids'
import { parseEther, parseUnits } from 'viem'
import { Tokens, type TestParams } from '../../camelot/src/utils'
import {
  GreaterThanOrEqual,
  type SwapActionParams,
} from '@rabbitholegg/questdk'

export const V2_SWAP_ETH: TestParams<SwapActionParams> = {
  transaction: {
    chainId: 42161,
    from: '0x0',
    hash: '0x0',
    input: '0x0',
    to: '00',
    value: '0',
  },
  params: {
    chainId: ARBITRUM_CHAIN_ID,
    contractAddress: 0x0,
    tokenIn: Tokens.ETH,
    tokenOut: '0xBfbCFe8873fE28Dfa25f1099282b088D52bbAD9C', // EQB Token
    amountIn: GreaterThanOrEqual(parseEther('0.00055')),
    amountOut: GreaterThanOrEqual(parseUnits('9.25', 18)),
  },
}
