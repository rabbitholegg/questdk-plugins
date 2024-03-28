import { type Address, zeroAddress } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

export const CHAIN_TO_TOKENS: Record<number, Address[]> = {
  [Chains.ETHEREUM]: [
    '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    zeroAddress, // ETH
  ],
  [Chains.OPTIMISM]: [
    '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', // USDT
    '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // USDC
    zeroAddress, // ETH
  ],
  [Chains.BINANCE_SMART_CHAIN]: [
    '0x55d398326f99059f775485246999027B3197955', // USDT
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC
  ],
  [Chains.POLYGON_POS]: [
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // USDT
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
  ],
  [Chains.ARBITRUM_ONE]: [
    '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // USDT
    '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // USDC
    zeroAddress, // ETH
  ],
  [Chains.AVALANCHE]: [
    '0xc7198437980c041c805A1EDcbA50c1Ce5db95118', // USDT
    '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', // USDC
  ],
}
