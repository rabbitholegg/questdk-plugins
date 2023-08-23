Arbitrum's native token bridge is a general messaging bridge allowing for transfer of ETH, and any token.

Arbitrum uses different paths for ETH vs Tokens


Token Transfers from L1 get routed through the L1 Gateway Router
https://etherscan.io/address/0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef

This is an example of an Outbound Transfer from the L1 Gateway Router
https://etherscan.io/tx/0xcdbcb66c6a194ae2f0a58b00c1e6ec0daea08c901590ba056cc6806581bf5a94

Token transfers from L2 get routed through the L2 Gateway Router
https://arbiscan.io/address/0x5288c571Fd7aD117beA99bF60FE0846C4E84F933

This is an example of an outbound transaction from the L2:
https://arbiscan.io/tx/0xc98cb709c9f00e436911ce764fe7712fd0467f6e56ffc89b3a92a6fe35b5e069


ETH transfer from L1 get routed through the Delayed Inbox using the Deposit ETH function
https://etherscan.io/address/0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f



ETH transfers from the L2 use the ArbSys contract using the Withdraw ETH function
https://arbiscan.io/address/0x0000000000000000000000000000000000000064

This is an example of an ETH withdrawl through the ArbSys contract
https://arbiscan.io/tx/0x6b2ed2676131d1a4bddef33dcf4575ef88fe34adafa77959899cdfd7cc0705b2

For a given bridge action we generally have 4 types of transactions we want to ensure we're parsing:
1. ETH from L1 to L2
1. Tokens from L1 to L2
1. ETH from L2 to L1
1. Tokens from L2 to L1

In some cases there won't be a difference between L1/L2 leading to two types of transactions to parse, but in general this enumerates the upper bound of transactions a bridge action should be responsible for parsing.
