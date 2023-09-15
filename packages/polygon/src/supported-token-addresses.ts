import { type Address } from 'viem'
import { ETH_CHAIN_ID, POLYGON_CHAIN_ID } from './chain-ids.js'

export const ETH_ADDRESS_MAINNET = '0x0000000000000000000000000000000000000000'
export const MATIC_ADDRESS_MAINNET =
  '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'
export const MATIC_ADDRESS_POLYGON =
  '0x0000000000000000000000000000000000001010'
export const USDC_ADDRESS_MAINNET = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
export const USDC_ADDRESS_POLYGON = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
export const WETH_ADDRESS_POLYGON = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'
// For now we're mainly supported the highest traffic Polygon tokens as listed here
//https://github.com/maticnetwork/polygon-token-list
export const PolygonTokens: Record<number, readonly Address[]> = {
  [ETH_CHAIN_ID]: [
    ETH_ADDRESS_MAINNET, //ether
    MATIC_ADDRESS_MAINNET, //matic
    USDC_ADDRESS_MAINNET, //usdc
    '0xdac17f958d2ee523a2206206994597c13d831ec7', //usdt
    '0x6b175474e89094c44da98b954eedeac495271d0f', //dai
  ],
  [POLYGON_CHAIN_ID]: [
    WETH_ADDRESS_POLYGON, //WETH
    MATIC_ADDRESS_POLYGON, //matic
    USDC_ADDRESS_POLYGON, //usdc
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', //usdt
    '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', //dai
  ],
} as const
