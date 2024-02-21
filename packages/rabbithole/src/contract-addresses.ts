import type { Address } from 'viem'
import { ETH_CHAIN_ID, ARB_ONE_CHAIN_ID, OPTIMISM_CHAIN_ID } from './chain-ids'

export const RABBITHOLE_QUEST_FACTORY =
  '0x52629961F71C1C2564C5aa22372CB1b9fa9EBA3E'

export const DEFAULT_SWAP_TOKEN_LIST: {
  [chainId: number]: readonly Address[]
} = {
  [ETH_CHAIN_ID]: [
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    '0x72e2f4830b9e45d52f80ac08cb2bec0fef72ed9c',
  ],
  [ARB_ONE_CHAIN_ID]: [
    '0x17fc002b466eec40dae837fc4be5c67993ddbd6f',
    '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a',
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
  ],
  [OPTIMISM_CHAIN_ID]: [
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
    '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
    '0x514910771af9ca656af840dff83e8264ecf986ca', // LINK
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // WBTC
    '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
    '0x4200000000000000000000000000000000000006', // WETH
  ],
} as const
