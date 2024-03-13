import { type FilterOperator } from '@rabbitholegg/questdk'

export const shouldIncludeAbiMint = (
  amount: FilterOperator | undefined,
): boolean => {
  if (amount == null) return true
  if (typeof amount === 'object') {
    if ('$gte' in amount && (amount.$gte as bigint) >= 2) return false
    if ('$gt' in amount && (amount.$gt as bigint) >= 1) return false
    if ('$eq' in amount && (amount.$eq as bigint) >= 2) return false
    if ('$lt' in amount && (amount.$lt as bigint) <= 1) return false
  } else {
    return Number(amount) === 1
  }
  return true
}
