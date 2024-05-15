# TITLES Plugin

### About The Project

TITLES builds creative tools powered by artist-trained AI models. Titles helps artists and IP holders maintain ownership of their AI likeness by making it easy to train, distribute, and monetize their own custom models.

For the first time, artists can now take ownership and monetize their likeness through AI on TITLES.

- Documentation: https://titlesxyz.notion.site/TITLES-341ca0582707492ea4b048291edd4698

### Implementation Details

This is a simple `create` plugin which filters transaction based on the chain, contract and matching ABI function. The specific function we are watching for is `publishEdition` on the `TitlesPublisherV1` contract.

- [**TitlesPublisherV1**](https://basescan.org/address/0x04e4d53374a5e6259ce06cfc6850a839bd960d01#code)

#### Sample Transactions
- [**publishEdition**](https://basescan.org/tx/0x585edfb9b1899f37926c51274b8fbe0d62e1a00402a3cd084ae6a7af41226b9c)