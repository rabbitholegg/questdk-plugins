import { type FilterOperator } from '@rabbitholegg/questdk'

export enum Tokens {
  ARB = '0x912CE59144191C1204E64559FE8253a0e49E6548',
  DAI = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  ETH = '0x0000000000000000000000000000000000000000',
  GMX = '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
  MIM = '0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A',
  USDC = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  USDCE = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  USDT = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  WBTC = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  WETH = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
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