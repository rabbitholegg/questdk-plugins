## Foundation

Foundation is a decentralized platform that leverages blockchain technology to empower artists and creators by enabling them to mint, auction, and trade unique digital art pieces as non-fungible tokens (NFTs).

## Mint Plugin

### Implementation Details

Foundation is available on BASE and Ethereum networks.

All mints are routed throught the NFTDropMarket contract. There is two main functions that we are interested in, `mintFromFixedPriceSaleV2` and `mintFromDutchAuctionV2`. Fixed Price sales will account for about ~95% of all foundation mints. 

In the `getFees` function, we try to get the fees using the method `getFixedPriceSaleV2` on the drop market contract first, then we try `getDutchAuctionV2`. If it fails, we return the fallback fee structure. A valid Dutch Auction will return a zero address when calling `getFixedPriceSaleV2`, so we can use this as a flag to try `getDutchAuctionV2`.

### Sample Mints

  - Fixed Price: https://foundation.app/mint/eth/0x7E5dA1FCC4C188aFC9a3CBc56Fa0b7B2a8FA495C
  - Dutch Auction: https://foundation.app/mint/base/0x6a41fcce9d075a9f6324b626af56cf632c509ec9

### Example Transactions

  - Fixed Price: https://basescan.org/tx/0x97c0c0a5e8551e6f0b8eea7006122e978c9624c6d68480c63745d60ecf9af3e2
  - Dutch Auction: https://basescan.org/tx/0xdb6f9003db518d2dd4006684cb78f61b8f91dd1f0cb08a23776152e2d2137d46