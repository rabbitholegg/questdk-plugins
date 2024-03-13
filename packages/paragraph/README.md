# Paragraph Plugin

## Overview

Paragraph. xyz is a web3-native publishing platform that helps creators publish blogs and newsletters for virtual communities. The platform aims to help creators reach their audiences on web2 while using web3 tools to create, distribute, and monetize their content.

Documentation: https://docs.paragraph.xyz/

Gallery: https://paragraph.xyz/discover/feed/trending/paragraph

### Mint Plugin

The mint plugin targets the mint functions on the paragraph [ERC721](https://basescan.org/address/0x3e3255cbe27f34a981a8afa98192e77eb198901a#code) contract. There are 2 functions that mints may be routed through.

- `mint`
- `mintWithReferrer`

Both of these use the same parameters, with the exception of the additional referrer parameter which is not relevant to our plugin.


##### Limitations
- only 1 NFT can be minted per transaction, so the `amount` paramenter is ignored.
- tokenId is ignored since these are ERC721

##### Sample Transactions
- [mintWithReferrer](https://basescan.org/tx/0x7946162535d790e488d0168fd89c68d526cfde6c8cf26a01fbcc4e2c78c3040c)