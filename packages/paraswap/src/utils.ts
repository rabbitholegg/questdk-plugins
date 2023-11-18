import type { FilterOperator } from '@rabbitholegg/questdk'
import type { Address } from 'viem'
import type { Token } from '@paraswap/sdk'

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

export function filterTokenList(tokenList: Token[]): Address[] {
  const aTokens = [
    '0xf329e36c7bf6e5e86ce2150875a84ce77f477375',
    '0x82e64f49ed5ec1bc6e43dad4fc8af9bb3a2312ee',
    '0x6ab707aca953edaefbc4fd23ba73294241490620',
    '0x191c10aa4af7c30e871e70c95db0e4eb77237530',
    '0x6d80113e533a2c0fe82eabd35f1875dcea89ea97',
    '0x625e7708f30ca75bfd92586e17077590c60eb4cd',
    '0x078f358208685046a11c85e8ad32895ded33a249',
    '0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8',
  ]

  const convertFormat = (address: Address): Address =>
    address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      ? '0x0000000000000000000000000000000000000000'
      : address

  return tokenList.reduce((arr, token) => {
    if (!aTokens.includes(token.address.toLowerCase())) {
      arr.push(convertFormat(token.address as Address))
    }
    return arr
  }, [] as Address[])
}
