# Art Blocks V3 Plugin

## Art Blocks Overview
[Art Blocks](https://www.artblocks.io) is an NFT marketplace that allows users to mint generative artwork from a published "project". Projects are made up of artist provided logic that generates unique pieces of artwork given a set of customizable parameters. Each project allows for a fixed number of mints, and each mint operation is provided with a distinct set of parameters via contract-based random number generation.

## Art Blocks V3 Smart Contracts
The [Art Blocks Smart Contract ecosystem](https://github.com/ArtBlocks/artblocks-contracts/blob/main/packages/contracts/README.md) provides a [shared minter suite](https://github.com/ArtBlocks/artblocks-contracts/blob/main/packages/contracts/MINTER_SUITE.md) which can be utilized by the Art Blocks platform as well as any third-party controlled instances of the Art Blocks V3 contracts. These third-party controlled instances are known as "Engines".

## Plugin
This plugin aims to provide support for all shared minter suite contracts that are [compatible and active flagship V3 contracts](https://github.com/ArtBlocks/artblocks-contracts/blob/main/packages/contracts/MINTER_SUITE.md#active-flagship-minting-contracts). By targeting the latest V3 contracts we can ensure that all current implementations of Art Blocks are supported.

### Chain Support
Currently, only `mint` actions that take place on Ethereum mainnet and Arbitrum mainnet are supported by this plugin.

### Action Support
The only currently supported action is the `mint` action. Below is a chart demonstrating the mapping between Art Blocks `purchase` and `purchaseTo` transaction parameters and supported [MintActionParams](https://github.com/rabbitholegg/questdk/blob/main/src/actions/types.ts#L44).

| purchase Transaction | purchaseTo Transaction | MintActionParams |
| -------------------- | ---------------------- | ---------------- |
| to                   | to                     | contractAddress  |
| input.projectId      | input.projectId        | tokenId          |
| from                 | input.to               | recipient        |

### Sample Transactions
- [purchase(): MinterDAExpSettlementV3](https://etherscan.io/tx/0x99cb792e3f9f82768df82a8b89061ff32121f9d22a3f13fd527fbab604a5c500)
- [purchaseTo(): MinterDAExpSettlementV3](https://etherscan.io/tx/0x727a87f5366671787387accc85d47a0290d9b43bd2374fd7b321bf51335d38e2)

### Notes
- All minters in the [shared minter suite](https://github.com/ArtBlocks/artblocks-contracts/blob/main/packages/contracts/MINTER_SUITE.md) implement a `purchase` function which invokes the `purchaseTo` function to mint a new Art Blocks token. All `purchase` function signatures include the `projectId` input parameter which is required by this plugin to target specific generative art projects.
  - [purchase()](
      https://github.com/ArtBlocks/artblocks-contracts/blob/24cd7a91c12277a3c7b6dd32517f117f573cfb5b/packages/contracts/contracts/mock/DummySharedMinter.sol#L53
    ) -> [purchaseTo()](
        https://github.com/ArtBlocks/artblocks-contracts/blob/24cd7a91c12277a3c7b6dd32517f117f573cfb5b/packages/contracts/contracts/mock/DummySharedMinter.sol#L61
      ) -> [mint_joo](
          https://github.com/ArtBlocks/artblocks-contracts/blob/24cd7a91c12277a3c7b6dd32517f117f573cfb5b/packages/contracts/contracts/minter-suite/MinterFilter/MinterFilterV2.sol#L505
        ) -> [mint_Ecf()](
          https://github.com/ArtBlocks/artblocks-contracts/blob/24cd7a91c12277a3c7b6dd32517f117f573cfb5b/packages/contracts/contracts/GenArt721CoreV3.sol#L366)