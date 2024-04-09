import { type FilterOperator } from '@rabbitholegg/questdk'

type Amount = FilterOperator | BigInt | number | string | undefined

export function getUnlockTime(amount: Amount): FilterOperator | undefined {
  if (amount === undefined) return undefined

  // in seconds
  const now = Math.floor(new Date().getTime() / 1000)

  if (typeof amount === 'object') {
    const [operator, value] = Object.entries(amount)[0]
    return { [operator]: BigInt(value) + BigInt(now) }
  }
  return { $gte: BigInt(amount) + BigInt(now) }
}