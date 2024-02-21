import type { FilterOperator } from '@rabbitholegg/questdk'

export enum OrderType {
  MarketSwap = 0,
  LimitSwap = 1,
  MarketIncrease = 2,
  LimitIncrease = 3,
  MarketDecrease = 4,
  LimitDecrease = 5,
  StopLossDecrease = 6,
  Liquidation = 7,
}

export enum Tokens {
  DAI = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  LINK = '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
  UNI = '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0',
  USDC = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  USDCe = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  USDT = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  WBTC = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
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
