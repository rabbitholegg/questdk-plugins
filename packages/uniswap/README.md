# Uniswap Plugin

## Overview
Uniswap is a popular dex that is deployed on several EVM networks. The uniswap plugin filters swap transactions made on uniswap through the [universal router](https://github.com/Uniswap/universal-router) contract.

## Features
- **Network Support:** Compatible with all Uniswap-supported networks.
- **Uniswap V2 and V3:** Full compatibility with Uniswap V2 and V3.
- **Updated Integration:** Uses Uniswap SDKs for up-to-date features.

## Limitations
- There should be no limitations with the current swap plugin. Everything should work as expected.

## Sample Transactions
- [V2 Swap](https://etherscan.io/tx/0x8bcf17ad4841ccaff29f1437dd63239df7c07408a31fc826cd300356b78ef718)
- [V3 Swap](https://optimistic.etherscan.io/tx/0x7e2871f2521b31b1b5b8acf0a739efb42cb760b6ca69ef0cdb657cf45e826a89)


## Supported Tokens 

- The default token list is stored on IPFS: [Token List URL](https://indigo-dear-vicuna-972.mypinata.cloud/ipfs/QmbPxSU5RLbJJTCCvos6bHsZXNBg8NJHUuZQiaMEP1z3c1)

Below is a list of tokens that are supported on each network (subject to change)

### Token List

| Ethereum                  | Optimism                  | Arbitrum One              | Polygon                   | Celo                      | Binance Smart Chain       | Avalanche                 | Base                      |
|---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|
| Aave                      | Aave                      | Aave                      | 1inch                     | Wrapped Bitcoin           | Dai Stablecoin            | Aave                      | Balancer                  |
| Alchemix                  | Dai Stablecoin            | ApeCoin                   | Aave                      | Celo                      | Frax                      | DAI.e Token               | Coinbase Wrapped Staked ETH |
| ApeCoin                   | Frax                      | Arbitrum                  | Balancer                  | Wrapped Ether             | ChainLink Token           | Frax                      | Compound                  |
| Balancer                  | Velo Token                | Axelar                    | Compound                  |                           | Magic Internet Money      | GMX                       | Curve DAO Token           |
| Compound                  | Across Protocol Token     | Balancer                  | Dai Stablecoin            |                           | Stargate Finance          | ChainLink Token           | Dai Stablecoin            |
| Curve DAO Token           | Lido DAO                  | Compound                  | Frax                      |                           | Sushi                     | Magic Internet Money      | Synthetix Network Token   |
| Convex Finance            | ChainLink Token           | Dai Stablecoin            | The Graph                 |                           | Synapse                   | Stargate Finance          | Sushi                     |
| Dai Stablecoin            | Optimism                  | Frax                      | Lido DAO                  |                           | Uniswap                   | Sushi                     | USDbC                     |
| dYdX                      | Perpetual Protocol        | GMX                       | ChainLink Token           |                           | USDCoin                   | UNI.e Token               | USDC                      |
| Ethereum Name Service     | Synth sUSD                | Lido DAO                  | Polygon                   |                           | Tether USD                | USDC Token                | Wrapped Ether             |
| Frax                      | Uniswap                   | ChainLink Token           | Magic Internet Money      |                           | Wrapped BNB               | Tether USD                |
| Gnosis Token              | USDCoin                   | MAGIC Token               | Quickswap                 |                           | Wrapped Ether             | Wrapped AVAX              |
| The Graph                 | USDC.e                    | VelaToken                 | Render Token              |                           |                           | Wrapped BTC               |
| Gitcoin                   | Tether USD                | Camelot Token             | Shiba Inu                 |                           |                           | Wrapped Ether             |
| Lido DAO                  | Wrapped BTC               | Render Token              | Synthetix Network Token   |                           |                           |                           |
| ChainLink Token           | Wrapped Ether             | Shiba Inu                 | Synth sUSD                |                           |                           |                           |
| Polygon                   |                           | Synthetix Network Token   | Sushi                     |                           |                           |                           |
| Magic Internet Money      |                           | Stargate Finance          | Uniswap                   |                           |                           |                           |
| Maker                     |                           | Synth sUSD                | USDC                      |                           |                           |                           |
| Pepe                      |                           | Sushi                     | USDC (PoS)                |                           |                           |                           |
| Perpetual Protocol        |                           | Uniswap                   | Tether USD                |                           |                           |                           |
| Ribbon Finance            |                           | USDCoin                   | Wrapped BTC               |                           |                           |                           |
| Render Token              |                           | Bridged USDC              | Wrapped Ether             |                           |                           |                           |
| Shiba Inu                 |                           | Tether USD                | Wrapped Matic             |                           |                           |                           |
| Synthetix Network Token   |                           | Wrapped BTC               |                           |                           |                           |                           |
| Stargate Finance          |                           | Wrapped Ether             |                           |                           |                           |                           |
| Synth sUSD                |                           | Yearn                     |                           |                           |                           |                           |
| Sushi                     |                           |                           |                           |                           |                           |                           |
| Uniswap                   |                           |                           |                           |                           |                           |                           |
| USDCoin                   |                           |                           |                           |                           |                           |                           |
| Tether USD                |                           |                           |                           |                           |                           |                           |
| Wrapped BTC               |                           |                           |                           |                           |                           |                           |
| Wrapped Ether             |                           |                           |                           |                           |                           |                           |
| Yearn                     |                           |                           |                           |                           |                           |                           |
