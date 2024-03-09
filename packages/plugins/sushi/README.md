# Sushi swap Plugin

## Overview
Sushi is a popular dex that is deployed on several EVM networks. The sushi plugin filters swap transactions made on sushi through the [route processor contract](https://arbiscan.io/address/0x09bd2a33c47746ff03b86bce4e885d03c74a8e8c#code), or the [legacy V2 router](https://arbiscan.io/address/0x1b02da8cb0d097eb8d57a175b88c7d8b47997506#code).

## Features
- **Network Support:** Compatible with Ethereum, Optimism, Polygon, Base, and Arbitrum One.

## Limitations
- There may be some false positives related to the use of `amountOutMin`, since this value is affected by the amount of slippage set in the UI.
- Sushi sometimes migrates their route processor contracts, which is the entry point for most trades. There is no way I can find to track the most current address, as it is not found in their core sdk.
- Sushi dev mentioned there is also a V3 swapper contract and trident contract. The activity on [the Swapper contract](https://arbiscan.io/address/0x8A21F6768C1f8075791D08546Dadf6daA0bE820c) appears to only come from a few addresses. [The trident contract(https://arbiscan.io/address/0xd9988b4b5bbc53a794240496cfa9bf5b1f8e0523)] only sees ~1 swap per day on average on arbitrum, and it is very complex to add support for. At this point it is not worth the effort to add in support for.


## Sample Transactions
- [RouteProcessor](https://arbiscan.io/tx/0xe1053d41ba57f0c3926f1161dee8b50a72a7c55909464c2cede312be942be301)
- [V2 Router](https://arbiscan.io/tx/0x4c10886c741483e9d955839526e5bf690bb824e1a4f038bbddd26101712fd3a2)