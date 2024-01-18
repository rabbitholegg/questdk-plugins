# WooFi Plugin

## Overview
WOOFi is a cross-chain DEX where anyone can swap, stake, and earn crypto and trade perpetual futures across every major blockchain.

### Swap Action

#### Features
- **Network Support:** Compatible with most major L2 networks.

#### Limitations
- There should be no limitations with the current swap plugin. Everything should work as expected.
- Because of how the amountOut is calculated (minAmountOut), it may be lower then expected if the user has a high slippage setting.

#### Sample Transactions

There are 2 types of swaps we see on the WooRouter contracts
- [Swap](https://optimistic.etherscan.io/tx/0xc6cb35161a46072e1167be1677f9d9ef2a7773f0de6499f79e8a95b366b0ee46)
- [External Swap](https://optimistic.etherscan.io/tx/0xda72f698538b34bf2838225f1d95ac6067f15c207a311a6f7dde967d4469576c)

### Stake Action

- Coming Soon