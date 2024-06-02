## Foundation Plugin for Boost

### New Plugin TODO list

1.  Find the ABI of the function your transaction is calling, and add export it as a const in the abi.ts file
    1.  this can be multiple ABIs, if the transaction is calling multiple functions
2.  in Foundation.ts, fill out each Action function by mapping the ActionParams to the ABI of the function



### Actions and Descriptions

There is two types of sale strategies used by Foundation. Fixed Price and Dutch Auction. In the `getFees` function, we try to get the fees using the method `getFixedPriceSaleV2` on the drop market contract first, then we try `getDutchAuctionV2`. If it fails, we return the fallback fee structure. A valid Dutch Auction will return a zero address when calling `getFixedPriceSaleV2`, so we can use this as a flag to try `getDutchAuctionV2`.

### Example Transactions

