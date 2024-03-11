# Treasure Plugin

## Overview
Treasure is the decentralized game publisher on Arbitrum built for community-driven games. Every project listed on the Treasure platform utilizes MAGIC in their respective metaverses, with each community inventing its own lore and storytelling for this resource. MAGIC, the native token of Treasure, is the sole currency for marketplace transactions. In this way, MAGIC acts as the reserve currency for the entire web of metaverses connected under the Treasure umbrella.

Our plugin aims to target some of the actions used in the treasure ecosystem, such as swaps, mints and staking of various game assets.

## Token Swap Action

Magicswap allows you to swap instantly some of the tokens you will find while playing some of the games offered by treasure. There is 4-5 tokens available ot be swapped.
These is two types of swap methods utilized.

### Limitations
- - There may be some false positives related to the use of `amountOutMin`, since this value is affected by the amount of slippage set in the UI.

### Sample Transactions
- [exactTokensForTokens](https://arbiscan.io/tx/0x8bf8405112a727937c67236c4972ca40e0c0f69d6eeadd60ce0e36649689096f)
- [tokensForExactTokens](https://arbiscan.io/tx/0xf72f2e47c9bc589d6bbc8824906fcece0ab244f266f758e2aa11bbea0326c080)
