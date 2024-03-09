# Arbitrum Plugin
This plugin allows for the decoding of Arbitrum transactions by way of action spec.

## Important Considerations
- Ethereum must be either sourceChain, or destinationChain, otherwise the quest will not be passable. It is not possible to bridge between Arbitrum Nova and Arbitrum One.
- Only tokens which are compatible with all three chains were added. USDT was considered, but there is issues with bridging USDT to Arbitrum Nova
- If tokenAddress is set to any, then amount will also be set to any, regardless of what is input.

## General Overview
Arbitrum's native token bridge is a general messaging bridge allowing for transfer of ETH, and any token.

They support exchange to/from mainnet to their two main networks (One, and Nova).

Arbitrum uses different paths for ETH vs Tokens, and relies on precompiles when routing the base network currency (AEth) _from_ L2 _to_ L1.

For a given bridge action we generally have 4 types of transactions we want to ensure we're parsing:
1. ETH from L1 to L2
1. Tokens from L1 to L2
1. ETH from L2 to L1
1. Tokens from L2 to L1

In some cases there won't be a difference between L1/L2 leading to two types of transactions to parse, but in general this enumerates the upper bound of transactions a bridge action should be responsible for parsing. It's also possible for different tokens to route differently, this _would_ be the case with Arbitrum if they didn't pipe transactions through their router first.

## Specific Examples

[Token Transfers from L1 get routed through the L1 Gateway Router](https://etherscan.io/address/0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef)


[This is an example of an Outbound Transfer from the L1 Gateway Router](https://etherscan.io/tx/0xcdbcb66c6a194ae2f0a58b00c1e6ec0daea08c901590ba056cc6806581bf5a94
)

[This is the function call on the `L1GatewayRouter.sol` contract.](https://github.com/OffchainLabs/token-bridge-contracts/blob/main/contracts/tokenbridge/ethereum/gateway/L1GatewayRouter.sol#L229)

[Token transfers from L2 get routed through the L2 Gateway Router](https://arbiscan.io/address/0x5288c571Fd7aD117beA99bF60FE0846C4E84F933
)

[This is an example of an outbound transaction from the L2](https://arbiscan.io/tx/0xc98cb709c9f00e436911ce764fe7712fd0467f6e56ffc89b3a92a6fe35b5e069
)


[ETH transfer from L1 get routed through the Delayed Inbox using the Deposit ETH function](https://etherscan.io/address/0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f
)



[ETH transfers from the L2 use the ArbSys contract using the Withdraw ETH function](https://arbiscan.io/address/0x0000000000000000000000000000000000000064
)

[This is an example of an ETH withdrawl through the ArbSys contract](https://arbiscan.io/tx/0x6b2ed2676131d1a4bddef33dcf4575ef88fe34adafa77959899cdfd7cc0705b2
)
