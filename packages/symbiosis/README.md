# Symbiosis Bridge Plugin

This plugin is designed to filter valid bridge transactions using the Symbiosis cross-chain bridge.

## Overview

The Symbiosis bridge plugin prioritizes the most popular assets on each chain, which include ETH, stablecoins, and certain chain-specific tokens like OP and ARB. By leaving the tokenAddress undefined, the filter should allow any asset to pass, as long as all the other criteria is met. This allows for additional flexibility for quest creators. The plugin utilizes the symbiosis SDK to get the latest contract addresses for their metaRouter contracts. An overview of how the bridge operates can be [found here](https://docs.symbiosis.finance/main-concepts/cross-chain-swaps-with-symbiosis)

## Filtering Criteria

The plugin filters transactions based on certain predefined criteria to identify valid bridge transactions. The criteria can include the following aspects:

- Source chain and Destination chain
- Involved assets (e.g., ETH, USDC, wETH, OP, ARB)
- Amount
- Contract Address
- Recipient

## Sample Transaction
- https://etherscan.io/tx/0xc97deae76c21cb57498d2873babd212fa589eae9e4d2e979f4a10a3428f376ee

