import type { FilterOperator } from '@rabbitholegg/questdk'
import { getAddress } from 'viem'

export enum Tokens {
  ARB = '0x912CE59144191C1204E64559FE8253a0e49E6548',
  DAI = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  ETH = '0x0000000000000000000000000000000000000000',
  GMX = '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
  GRAIL = '0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8',
  MIM = '0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A',
  USDC = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  USDCE = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  USDT = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  WBTC = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  WETH = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  SIZE = '0x939727d85D99d0aC339bF1B76DfE30Ca27C19067',
}

export const buildV2PathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v2 paths are formatted as [<token>, <token>]
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

export const buildV3PathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v3 paths are formatted as 0x<token><fee><token>

  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $regex: `^${tokenIn.toLowerCase()}` })
  }

  if (tokenOut) {
    // Chop the 0x prefix before comparing
    conditions.push({ $regex: `${tokenOut.slice(2).toLowerCase()}$` })
  }

  return {
    $and: conditions,
  }
}
