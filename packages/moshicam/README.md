# Moshicam Plugin

## Overview
[Moshicam](https://moshi.cam) is a photo-sharing app where users can create pictures with a customizable borders from well-known artists and web3 brands. The proceeds of each mint are sent directly doing to the creator of the border and the creator of the pic.

## Implementation Details
User contracts are deployed as a proxy to a central beacon ERC1155 contract. Other users can collect existing NFTs from each of these contracts.
- [Beacon contract](https://basescan.org/address/0x168dbc5ea60d03eba4d8083f7a95a4bcb8137700)
- [Implementation contract](https://basescan.org/address/0x56d4808987696279bC78FF3F5349bB5280687164)

### Sample Transactions
- [Collect from user Moshi contract](https://basescan.org/tx/0x619762bdbded2725b58d62a164e52aa7a340e5ca64e37a6b8aeea4b63e9ff877)
