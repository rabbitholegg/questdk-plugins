import { FilterOperator } from '../types'

export function formatAmount(
  amount: FilterOperator | undefined,
): FilterOperator {
  if (!amount || (typeof amount === 'string' && isNaN(Number(amount)))) {
    return { $gte: 1n }
  }
  if (
    typeof amount === 'string' ||
    typeof amount === 'number' ||
    typeof amount === 'bigint'
  ) {
    return { $gte: BigInt(amount) }
  }

  return amount
}

export function getMintAmount(amount: FilterOperator | undefined) {
  if (!amount) {
    return 1n
  }
  // If the amount is a primitive, pass that value through
  if (['number', 'bigint'].includes(typeof amount)) {
    return BigInt(amount as number | bigint)
  }
  if (typeof amount === 'string' && !isNaN(Number(amount))) {
    return BigInt(amount)
  }

  // For $gte, the minimum amount required to pass is the value of $gte
  if (typeof amount === 'object' && '$gte' in amount && amount.$gte) {
    return BigInt(amount.$gte)
  }
  // For $gt, the minimum amount required to pass is the value of $gt + 1
  if (typeof amount === 'object' && '$gt' in amount && amount.$gt) {
    return BigInt(amount.$gt) + 1n
  }
  // For $lt or $lte, the minimum amount required to pass is 1
  return 1n
}
