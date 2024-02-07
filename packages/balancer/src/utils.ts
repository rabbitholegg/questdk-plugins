import type { FilterOperator } from '@rabbitholegg/questdk'
import type { Address } from 'viem'
import { getAddress } from 'viem'

export const buildPathQuery = (tokenIn?: Address, tokenOut?: Address) => {
  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $first: getAddress(tokenIn) })
  }

  if (tokenOut) {
    conditions.push({ $last: getAddress(tokenOut) })
  }

  return {
    $and: conditions,
  }
}

export const buildAmountQuery = (
  amountIn?: FilterOperator | undefined,
  amountOut?: FilterOperator | undefined,
) => {
  const conditions: FilterOperator[] = []

  if (amountIn) {
    if (typeof amountIn === 'object') {
      conditions.push({ $first: amountIn })
    } else {
      conditions.push({ $first: { $gte: BigInt(amountIn) } })
    }
  }

  if (amountOut) {
    let condition: FilterOperator | undefined
    if (typeof amountOut === 'object') {
      const [operator, value] = Object.entries(amountOut)[0]
      switch (operator) {
        case '$gte':
          condition = { $lte: BigInt(-value) }
          break
        case '$lte':
          condition = { $gte: BigInt(-value) }
          break
        case '$gt':
          condition = { $lt: BigInt(-value) }
          break
        case '$lt':
          condition = { $gt: BigInt(-value) }
          break
      }
    } else {
      condition = { $lte: BigInt(-amountOut) }
    }

    if (condition) {
      conditions.push({ $last: condition })
    }
  }

  return {
    $and: conditions,
  }
}
