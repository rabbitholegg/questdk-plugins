import type { Address } from 'viem'

export const ETH_CHAIN_ID = 1
export const OPTIMISM_CHAIN_ID = 10
export const POLYGON_CHAIN_ID = 137
export const ZK_ERA_CHAIN_ID = 324
export const MANTLE_CHAIN_ID = 5000
export const BASE_CHAIN_ID = 8453
export const ARBITRUM_CHAIN_ID = 42161

export const CHAIN_ID_ARRAY = [
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
  ZK_ERA_CHAIN_ID,
  MANTLE_CHAIN_ID,
  BASE_CHAIN_ID,
  ARBITRUM_CHAIN_ID,
]

export const CHAIN_TO_TOKENS: {
  [chainId: number]: Address[]
} = {
  [ETH_CHAIN_ID]: [
    '0x0000000000000000000000000000000000000000', // ETH
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
    '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
  ],
  [OPTIMISM_CHAIN_ID]: [
    '0x0000000000000000000000000000000000000000', // ETH
    '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // USDC.e
    '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', // USDT
    '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
    '0x4200000000000000000000000000000000000042', // OP
  ],
  [POLYGON_CHAIN_ID]: [
    '0x0000000000000000000000000000000000000000', // MATIC
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC.e
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // USDT
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // DAI
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH
  ],
  [ZK_ERA_CHAIN_ID]: [
    '0x0000000000000000000000000000000000000000', // ETH
    '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4', // USDC
    '0x493257fD37EDB34451f62EDf8D2a0C418852bA4C', // USDT
  ],
  [MANTLE_CHAIN_ID]: [
    '0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111', // WETH
    '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9', // USDC
    '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE', // USDT
  ],
  [BASE_CHAIN_ID]: [
    '0x0000000000000000000000000000000000000000', // ETH
    '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', // USDbC
    '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', // DAI
  ],
  [ARBITRUM_CHAIN_ID]: [
    '0x0000000000000000000000000000000000000000', // ETH
    '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // USDC.e
    '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // USDC
    '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // USDT
    '0x912CE59144191C1204E64559FE8253a0e49E6548', // ARB
  ],
}
