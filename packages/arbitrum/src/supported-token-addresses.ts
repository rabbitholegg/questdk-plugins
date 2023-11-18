import { type Address, zeroAddress as ETH_ADDRESS } from 'viem'
import {
  ETH_CHAIN_ID,
  ARB_ONE_CHAIN_ID,
  ARB_NOVA_CHAIN_ID,
} from './chain-ids.js'

// For now we're mainly supported the highest traffic Arbitrum tokens
// Support for USDC seems like it might be non-trivial
// https://docs.arbitrum.io/bridge-tokens/concepts/usdc-concept

// excluded USDT due to it not being compatible with arbitrum nova
export const ArbitrumTokens: Record<number, Address[]> = {
  [ETH_CHAIN_ID]: [
    ETH_ADDRESS,
    '0x750ba8b76187092B0D1E87E28daaf484d1b5273b', // USDC
    '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
    '0x1d05e4e72cD994cdF976181CfB0707345763564d', // WBTC
    '0x722E8BdD2ce80A4422E880164f2079488e115365', // WETH
  ],
  [ARB_ONE_CHAIN_ID]: [
    ETH_ADDRESS,
    '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // USDC
    '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
    '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', // WBTC
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // WETH
  ],
  [ARB_NOVA_CHAIN_ID]: [
    ETH_ADDRESS,
    '0x750ba8b76187092B0D1E87E28daaf484d1b5273b', // USDC
    '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
    '0x1d05e4e72cD994cdF976181CfB0707345763564d', // WBTC
    '0x722E8BdD2ce80A4422E880164f2079488e115365', // WETH
  ],
}
