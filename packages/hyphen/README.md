# Hyphen Plugin

This plugin is designed to filter valid bridge transaction on the biconomy hyphen bridge

## Overview

The Hyphen Bridge is relatively simple compared to other bridges. The same function is used regardless of wether you are bridging to or from L1. There is 3 functions we are watching, ```depositNative``` for native tokens like ETH (or MATIC for Polygon), ```depositErc20``` for supported ERC-20 tokens, and ```depositErc20AndSwap``` which will swap out some of the bridged tokens for some of the native gas token on the receiving chain.

There is also a ```depositNativeAndSwap``` function, but I cannot find any instances of it being used in the wild, so I have chosen to exclude it from the filter.

## Example Transactions

### depositNative
- [From L1 to L2](https://etherscan.io/tx/0x8658d84686792ff03e4749dcd08cd750ec00632965d423214381595f32673dea)
- [From L2 to L1](https://optimistic.etherscan.io/tx/0x39349b8bc309e3e861565b2a08efa6fb5bb1726713ba17ff166396c15147e625)


### depositErc20
- https://etherscan.io/tx/0xbb7a23d915fd2b7e2df1e5116a785210c48671b0db5b790659db7f922d2c18ca

### depositErc20AndSwap
- https://polygonscan.com/tx/0x826839c49ecb2e25e263ad2299ac444d8e0bc92d92f8934d326a4ecd7ea8bc39


## Bridge Contract Addresses
- Ethereum - https://etherscan.io/address/0x2a5c2568b10a0e826bfa892cf21ba7218310180b 
- Polygon - https://polygonscan.com/address/0x2a5c2568b10a0e826bfa892cf21ba7218310180b 
- Avalanche - https://snowtrace.io/address/0x2a5c2568b10a0e826bfa892cf21ba7218310180b 
- Optimism - https://optimistic.etherscan.io/address/0x856cb5c3cBBe9e2E21293A644aA1f9363CEE11E8 
- Arbitrum - https://arbiscan.io/address/0x856cb5c3cBBe9e2E21293A644aA1f9363CEE11E8 
- Binance - https://bscscan.com/address/0x94D3E62151B12A12A4976F60EdC18459538FaF08