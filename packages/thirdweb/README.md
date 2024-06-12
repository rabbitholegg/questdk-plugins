## ThirdWeb

Thirdweb is a robust platform that streamlines the process of minting and managing NFTs. By providing easy-to-use tools and infrastructure, it empowers creators to mint, deploy, and manage their NFT collections efficiently. 

## Mint Plugin

### Implementation Details

Thirdweb is available on most major L2 networks such as base and optimism

We have support for two types of contracts, `DropERC1155` and `OpenEditionERC721`, both are quite similar, with the difference being the ERC1155 can utilize a tokenId parameter. Both use the `claim` functions on their respective contracts.

### Sample Mints

  - ERC721: https://wallet.coinbase.com/nft/mint/MDP
  - ERC1155: https://basescan.org/token/0x5625e0ae98c035407258d6752703fed917417add

### Example Transactions

  - ERC721: https://basescan.org/tx/0x16ed42066507832a5452dd1c012b1c6f694284987abcd2d8b3d2e0cdc7eb9678
  - ERC1155: https://basescan.org/tx/0x2f0bba62facc408f510a1ca52e9e41f09e067646854ceda1c4e379caca6c946d
