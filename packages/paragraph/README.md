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
- There is a [createAndMint function](https://basescan.org/tx/0x438ae0d6ed5964ae70a72e34fd71b6c24b252efdd8a56d1c9e628971ae04329d) on the ERC721 Factory that is called when there is a "first mint". Unfortunately this cannot be supported since the contract address for the project is not actually created until the first mint happens. We have had this issue with other mint actions such as zora. You technically need to have the contract address before you can make the boost, so this should be a non-issue.

##### Sample Transactions
- [mintWithReferrer](https://basescan.org/tx/0x7946162535d790e488d0168fd89c68d526cfde6c8cf26a01fbcc4e2c78c3040c)