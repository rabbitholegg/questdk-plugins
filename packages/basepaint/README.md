# BasePaint Plugin

This plugin is designed to filter valid mint transaction on basepaint.

## Overview

The transaction data for a mint on basepaint maps perfectly to the 3 provided MintActionParams. 

- ```address``` -> The contract address for the mint function
- ```tokenId``` -> ```day```
- ```quantity``` -> ```count```

> I have confirmed that the ```day``` value in the tx data does in fact match up with the token id for each mint that has taken place to date.

## Example Transactions
- Mint - https://basescan.org/tx/0x356192c66fe49e9889215c5a47077b9b302c7d3a431fd463932788d9ea545fab

## Contract Address
- Base - https://basescan.org/address/0xba5e05cb26b78eda3a2f8e3b3814726305dcac83