import type { FilterOperator } from './types.js'

export const GreaterThan = (amount: bigint | number | string) => ({
  $gt: BigInt(amount),
})

export const LessThan = (amount: bigint | number | string) => ({
  $lt: BigInt(amount),
})

export const Equal = (amount: bigint | number | string) => ({
  $eq: BigInt(amount),
})

export const LessThanOrEqual = (amount: bigint | number | string) => ({
  $lte: BigInt(amount),
})

export const GreaterThanOrEqual = (amount: bigint | number | string) => ({
  $gte: BigInt(amount),
})

export const Or = ($or: FilterOperator[]) => ({ $or })
export const And = ($and: FilterOperator[]) => ({ $and })
export const Some = ($some: FilterOperator[]) => ({ $some })
export const First = ($first: FilterOperator) => ({ $first })
export const Last = ($last: FilterOperator) => ({ $last })

export const Any = Or
export const All = And
