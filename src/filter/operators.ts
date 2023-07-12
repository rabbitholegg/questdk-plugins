import type { Filter } from './filters.js'

export const GreaterThan = (amount: bigint | number | string) => ({
  $gt: BigInt(amount),
})

export const LessThan = (amount: bigint | number | string) => ({
  $lt: BigInt(amount),
})

export const LessThanOrEqual = (amount: bigint | number | string) => ({
  $lte: BigInt(amount),
})

export const GreaterThanOrEqual = (amount: bigint | number | string) => ({
  $gte: BigInt(amount),
})

export const Or = (filters: Filter[]) => ({
  $or: filters,
})

export const And = (filters: Filter[]) => ({
  $and: filters,
})

export const Some = (filters: Filter[]) => ({
  $some: filters,
})
export const First = (filter: Filter) => ({
  $first: filter,
})
export const Last = (filter: Filter) => ({
  $last: filter,
})
