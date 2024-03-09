# Connext Plugin

## Overview
Connext is a cross chain bridge protocol on Ethereum which services many popular L2 chains. The bridge transaction will use one of two method depending on wether ETH or tokens were bridged. For ETH, it will use `multiSend` and for tokens it will use `xCall`

## Limitations
- There should be no limitations with the current bridge plugin. Everything should work as expected.

## Sample Transactions
- [multiSend](https://etherscan.io/tx/0xb8e2c0baf137b64553c91f286bde62cc37275d0b9f9d3e6c0041c6be79de45af)
- [xCall](https://optimistic.etherscan.io/tx/0x22d3715ca5ae0bd0d87f9341fafc7a330fd6962e13bf318a6a541c93e4e6bc04)

