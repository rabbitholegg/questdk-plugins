import type { FilterOperator } from '@rabbitholegg/questdk'

export function getUnlockTime(
  duration: FilterOperator | undefined,
): FilterOperator | undefined {
  if (duration === undefined) return undefined

  // in seconds
  const now = Math.floor(new Date().getTime() / 1000)

  if (typeof duration === 'object') {
    const [operator, value] = Object.entries(duration)[0]
    return { [operator]: BigInt(value) + BigInt(now) }
  }
  return { $gte: BigInt(duration) + BigInt(now) }
}
