import { type Hex } from 'viem'

export type Swap = {
  chainId: number
  contractAddress?: Hex
  tokenIn?: Hex
  tokenOut?: Hex
  amountIn?: bigint
  amountOut?: bigint
  recipient?: Hex
  deadline?: bigint
}

export type Bridge = {
  sourceChainId: number
  destinationChainId?: number
  contractAddress?: Hex
  tokenAddress?: Hex
  amount?: bigint
  recipient?: Hex
}

export type NumericOperator =
  | bigint
  | number
  | string
  | {
      $gt?: bigint
    }
  | {
      $gte?: bigint
    }
  | {
      $lt?: bigint
    }
  | {
      $lte?: bigint
    }
