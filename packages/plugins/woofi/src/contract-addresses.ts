import { type Address, zeroAddress as NATIVE_TOKEN } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

export const CHAIN_TO_ROUTER: { [chainId: number]: Address | undefined } = {
  [Chains.ETHEREUM]: '0x4c4AF8DBc524681930a27b2F1Af5bcC8062E6fB7',
  [Chains.OPTIMISM]: '0x4c4AF8DBc524681930a27b2F1Af5bcC8062E6fB7',
  [Chains.POLYGON_POS]: '0x4c4AF8DBc524681930a27b2F1Af5bcC8062E6fB7',
  [Chains.ZK_SYNC_ERA]: '0x09873bfECA34F1Acd0a7e55cDA591f05d8a75369',
  [Chains.BASE]: '0x4c4AF8DBc524681930a27b2F1Af5bcC8062E6fB7',
  [Chains.ARBITRUM_ONE]: '0x4c4AF8DBc524681930a27b2F1Af5bcC8062E6fB7',
  [Chains.AVALANCHE]: '0x4c4AF8DBc524681930a27b2F1Af5bcC8062E6fB7',
}

export const CHAIN_TO_TOKENS: { [_chainId: number]: Address[] } = {
  [Chains.ETHEREUM]: [
    NATIVE_TOKEN, // ETH
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
  ],
  [Chains.OPTIMISM]: [
    NATIVE_TOKEN, // ETH
    '0x4200000000000000000000000000000000000042', // OP
    '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // USDC.e
    '0x68f180fcCe6836688e9084f035309E29Bf0A2095', // WBTC
    '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', // USDT
  ],
  [Chains.POLYGON_POS]: [
    NATIVE_TOKEN, // MATIC
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH
    '0x1B815d120B3eF02039Ee11dC2d33DE7aA4a8C603', // WOO
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC.e
    '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', // WBTC
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // USDT
  ],
  [Chains.ZK_SYNC_ERA]: [
    NATIVE_TOKEN, // ETH
    '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4', // USDC
    '0x493257fD37EDB34451f62EDf8D2a0C418852bA4C', // USDT
  ],
  [Chains.BASE]: [
    NATIVE_TOKEN, // ETH
    '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', // USDbC
  ],
  [Chains.ARBITRUM_ONE]: [
    NATIVE_TOKEN, // ETH
    '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // USDC
    '0xcAFcD85D8ca7Ad1e1C6F82F651fA15E33AEfD07b', // WOO
    '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', // WBTC
    '0x912CE59144191C1204E64559FE8253a0e49E6548', // ARB
    '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // USDT
    '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // USDC.e
  ],
  [Chains.AVALANCHE]: [
    NATIVE_TOKEN, // AVAX
    '0x152b9d0FdC40C096757F570A51E494bd4b943E50', // BTC.b
    '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB', // WETH.e
    '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // USDC
    '0xaBC9547B534519fF73921b1FBA6E672b5f58D083', // WOO.e
    '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', // USDT
  ],
}