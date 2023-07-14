import type { SwapAction } from '../../src/actions/types.js'
import type { FilterOperator } from '../../src/filter/types.js'
import { compressJson } from '../../src/utils/compressJson.js'
import { UNIVERSAL_ROUTER_ADDRESS } from '@uniswap/universal-router-sdk'
import { abi } from '@uniswap/universal-router/artifacts/contracts/UniversalRouter.sol/UniversalRouter.json'
import { toHex } from 'viem'

const buildV3PathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v3 paths are formatted as 0x<token><fee><token>

  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $regex: `^${tokenIn}` })
  }

  if (tokenOut) {
    // Chop the 0x prefix before comparing
    conditions.push({ $regex: `${tokenOut.slice(2)}$` })
  }

  return {
    $and: conditions,
  }
}

const buildV2PathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v2 paths are formatted as [<token>, <token>]
  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $first: tokenIn })
  }

  if (tokenOut) {
    conditions.push({ $last: tokenOut })
  }

  return {
    $and: conditions,
  }
}

/* 
  Command param type definitions:
  https://github.com/Uniswap/universal-router-sdk/blob/6ec60ce9ff2853e236ba8f40a3aaa8819a97bd8b/src/utils/routerCommands.ts#L74
*/
export const V3_SWAP_EXACT_TYPES = [
  'address recipient',
  'uint256 amountIn',
  'uint256 amountOut',
  'bytes path',
  'bool payerIsUser',
]

export const V2_SWAP_EXACT_TYPES = [
  'address recipient',
  'uint256 amountIn',
  'uint256 amountOut',
  'address[] path',
  'bool payerIsUser',
]

const Swap = (swap: SwapAction) => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  return compressJson({
    chainId: toHex(chainId),
    to: contractAddress || UNIVERSAL_ROUTER_ADDRESS(chainId),
    input: {
      $interface: abi.filter((fragment) => fragment.name === 'execute'),
      inputs: {
        $some: {
          $or: [
            {
              $decoder: V3_SWAP_EXACT_TYPES,
              path: buildV3PathQuery(tokenIn, tokenOut),
              amountIn,
              amountOut,
              recipient,
            },
            {
              $decoder: V2_SWAP_EXACT_TYPES,
              path: buildV2PathQuery(tokenIn, tokenOut),
              amountIn,
              amountOut,
              recipient,
            },
          ],
        },
      },
    },
  })
}

export default {
  Swap,
}
