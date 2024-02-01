# Boost Plugin

## Overview
Boost Protocol is a token distribution network that revolutionizes marketing and user engagement in the web3 space. It rewards users for specific onchain actions, aligning incentives between projects, investors, and participants.

## Mint Action

The mint action for Boost targets the minting of Boost passes. Boost passes are soul-bound (non-transferable) and are limited to one mint per address

### Implementation Details

- Boost Pass NFT's are ERC-721 tokens. Because the tokenId on ERC-721 tokens increments after every mint, it will not be relevent for this mint plugin.
- `amount` will always be 1, so if someone mints, the amount will be implied to be 1.
- Arbitrum One is the only chain boost pass minting is supported

### Contracts
- [BoostPass](https://sepolia.etherscan.io/token/0x9a618d6302f27cdbb97206ce269a31c1f7da3913) *testnet*
- [Implementation](https://sepolia.etherscan.io/address/0x831c90d85c029208b18f74664ca6136573a47e9e#code)

### Sample Transactions
- [mint](https://sepolia.etherscan.io/tx/0x3358d3f4b241be3e1c714d478a722885611f644c538d3b607fb45ba4e4f7aa1c)
