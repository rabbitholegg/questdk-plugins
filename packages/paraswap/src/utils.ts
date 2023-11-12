import type { FilterOperator } from '@rabbitholegg/questdk'

export enum Tokens {
  ETH = '0x0000000000000000000000000000000000000000',
  USDCE = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  USDT = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  VELA = '0x088cd8f5eF3652623c22D48b1605DCfE860Cd704',
  WETH = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
}

export const buildPathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v2 paths are formatted as [<token>, <token>]
  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $first: tokenIn })
  }

  if (tokenOut) {
    conditions.push({ $last: tokenOut })
  }

  return {
    $and: conditions,
  }
}
