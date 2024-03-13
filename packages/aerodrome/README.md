## Aerodrome

Aerodrome Finance is a next-generation AMM designed to serve as BASE's central liquidity hub, combining a powerful liquidity incentive engine, vote-lock governance model, and friendly user experience. Aerodrome inherits the latest features from Velodrome V2.

### Implementation Details

Aerodrome is a fork of Velodrome on BASE, which uses Uniswap V2 style swaps. There are a total of 3 swap methods we will watch for, and their `SupportingFee` counterparts. These use the same parameters as the non-supporting fee functions, so we can expect them to act the same as the functions without supporting fees.

- ExactETHForTokens
- ExactTokensForEth
- ExactTokensForTokens

### Current Limitations

AmountOut is not very reliable for some methods (Exact_X_For_X), as it uses amountOutMin, which can be much lower then expected. In extreme cases it can even be zero if slippage is set high enough. This will cause issues when using (==) operator or the (>=) operator.

### Sample Transactions

- [ExactETHForTokens](https://basescan.org/tx/0x553c5ab29791da1e5b8beb9aaebd517849c06f23356b3188f809062a65472157)

- [ExactTokensForETH](https://basescan.org/tx/0x9af9f272fbf6ecde7e58f3f16f851b51c60cef84e24bde7b77e0d4640835463a)

- [ExactTokensForTokens](https://basescan.org/tx/0xd3a8f0d830d3f43db6ab70ee36c20b34dca587358cabc7d8c083f3d630b8b5f8)
