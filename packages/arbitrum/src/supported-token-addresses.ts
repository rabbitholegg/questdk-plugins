import { type Address, zeroAddress as ETH_ADDRESS } from 'viem'
import { ETH_CHAIN_ID, ARB_ONE_CHAIN_ID, ARB_NOVA_CHAIN_ID } from './chain-ids'

// For now we're mainly supported the highest traffic Arbitrum tokens
// excluded USDT due to it not being compatible with arbitrum nova

// -------------!!!!! IMPORTANT!!!!!----------------
// WHEN ADDING NEW TOKENS, MAKE SURE TO UPDATE l1ToL2Map in utils.ts
export const ArbitrumTokens: Record<number, Address[]> = {
  [ETH_CHAIN_ID]: [
    ETH_ADDRESS,
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1', // ARB
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  ],
  [ARB_ONE_CHAIN_ID]: [
    ETH_ADDRESS,
    '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // USDC
    '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
    '0x912CE59144191C1204E64559FE8253a0e49E6548', // ARB
    '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', // WBTC
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // WETH
  ],
  [ARB_NOVA_CHAIN_ID]: [
    ETH_ADDRESS,
    '0x750ba8b76187092B0D1E87E28daaf484d1b5273b', // USDC
    '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
    '0xf823C3cD3CeBE0a1fA952ba88Dc9EEf8e0Bf46AD', // ARB
    '0x1d05e4e72cD994cdF976181CfB0707345763564d', // WBTC
    '0x722E8BdD2ce80A4422E880164f2079488e115365', // WETH
  ],
}
