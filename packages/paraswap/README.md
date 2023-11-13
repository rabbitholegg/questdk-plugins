Currently when using array operators ($or/$and), address within are case-sensitive. This will effect the stake plugin, as it uses an $or array for the contract addresses. 

The current implentation expects addresses in lowercase.

There are two pools for staking:

sePSP1:
https://optimistic.etherscan.io/token/0x8C934b7dBc782568d14ceaBbEAeDF37cB6348615
sePSP2:
https://optimistic.etherscan.io/token/0x26ee65874f5dbefa629eb103e7bbb2deaf4fb2c8