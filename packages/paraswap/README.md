Currently when using array operators ($or/$and), address within are case-sensitive. This will effect the stake plugin, as it uses an $or array for the contract addresses. 

The current implentation expects addresses in lowercase.

There are two pools for staking:

sePSP1:
https://optimistic.etherscan.io/token/0x8C934b7dBc782568d14ceaBbEAeDF37cB6348615
sePSP2:
https://optimistic.etherscan.io/token/0x26ee65874f5dbefa629eb103e7bbb2deaf4fb2c8


#### Sample transactions

directCurveV1Swap - https://arbiscan.io/tx/0xcd630db367bd95b18e28ca4b12fb02ae653416d3cf07b3e9c6e94d8dd639c488
directCurveV2Swap - https://arbiscan.io/tx/0xfe5ff2a88226b4ac5f2d0464328e7542fc79ac22bc31a674025eea0a005a1a0f

directUniV3Swap - https://arbiscan.io/tx/0x5b398f88da6d5035159ddeadefdea18967b86fd2a0816d73fdb8f3ddd76bd986
directUniV3Buy - https://arbiscan.io/tx/0x60b87aedcfb456538f4b32a6ffb3c222dfd70a49b27e570a65a0910ac29cfb56 (deprecated?)

directBalancerV2GivenInSwap - https://arbiscan.io/tx/0x7d303585d4777213a22da8485c4117117ddd32cce0206cab89bbdb93b6c0f705
directBalancerV2GivenOutSwap - https://arbiscan.io/tx/0x65f650ac1247bc82aaa0c1618e95e9be9dd6cab76eec7e947aaa1c4fc0ac91de

simpleSwap - https://arbiscan.io/tx/0x5ddc0b6be534c8b89bc798195307257a0b908fa756aa3ec8c7ed060de54f8669
simpleBuy - https://arbiscan.io/tx/0x001bde8422fb722b11ba49c83e0b9bf63f89526d0943bd3fd337df7f5237f93c

multiSwap - https://arbiscan.io/tx/0xe6dd92610251417333aefb498ea5f1de4388da41b697a91e9249ed239f418d88
megaSwap - https://arbiscan.io/tx/0x3976a24df9c72a4e58d86a1767f22ab36a07262d8a512a234e7854fe5f71857f


#### Implementation Contracts

simpleSwap - https://arbiscan.io/address/0xe2137168CdA486a2555E16c597905854C84F9127 (simpleSwap, simpleBuy)
MultiPath - https://arbiscan.io/address/0xfddd975fe4c1af20c24a3ad2b33e8609a62ddc73 (multiSwap, megaSwap)
directSwap - https://arbiscan.io/address/0xca865922c56af0dbd34bfbfce1bf7889922da795 (balancer, curve, uniswap)

