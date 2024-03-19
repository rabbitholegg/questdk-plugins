import { getAddress } from 'viem'
import type { FilterOperator } from '@rabbitholegg/questdk'

export const buildPathQuery = (tokenIn?: string, tokenOut?: string) => {
  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $first: { from: getAddress(tokenIn) } as FilterOperator })
  }

  if (tokenOut) {
    conditions.push({ $last: { to: getAddress(tokenOut) } as FilterOperator })
  }

  return {
    $and: conditions,
  }
}
