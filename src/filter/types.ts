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

export type StringOperator = {
  $regex?: string
}

export type FilterOperator =
  | LogicalOperator
  | NumericOperator
  | ArrayOperator
  | StringOperator
