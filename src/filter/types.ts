import type { Bridge, Swap } from '../actions/types.js'
import type { Hex } from 'viem'

export type ArrayOperator =
  | {
      $some?: FilterOperator[]
    }
  | {
      $first?: FilterOperator
    }
  | {
      $last?: FilterOperator
    }

export type LogicalOperator =
  | {
      $and?: FilterOperator[]
    }
  | {
      $or?: FilterOperator[]
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

export type FilterOperator = LogicalOperator | NumericOperator | ArrayOperator

type ReplaceWithFilterOperator<T> = {
  [P in keyof T]: FilterOperator
}

export type SwapFilter = ReplaceWithFilterOperator<Swap> | { chainId: Hex }
export type BridgeFilter = ReplaceWithFilterOperator<Bridge> | { chainId: Hex }
