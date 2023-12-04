## TraderJoe

This plugin covers the [V2.1 LB Router contract](https://docs.traderjoexyz.com/contracts/LBRouter) on arbitrum. Other networks can be added easily by adding the chain id to the `CHAIN_ID_ARRAY` in `chain-ids.ts` and adding supported token addresses in `contract-addresses.ts`


### Current Limitations

AmountOut is not very reliable for some methods (Exact_X_For_X), as it uses amountOutMin, which can be much lower then expected. In extreme cases it can even be zero if slippage is set high enough. This will cause issues when using (==) operator or the (>=) operator.

AmountIn also can not be very accurate in some scenarios and will be higher then expected (X_ForExact_X), this will cause issues when using (==) operator or the (<=) operator.

### Sample Transactions

- [ExactNATIVEForTokens: ETH -> ARB](https://arbiscan.io/tx/0x051d5bb371cac1ec38e51befe07fc1eec220e2cecb68aa5624da99c3c436de9a)

- [ExactNATIVEForTokensSupportingFee - ETH -> USDC.e](https://arbiscan.io/tx/0xdfa2628244bc82a8da1d18e3bfb4f37723d05f915b7cbd47a23ff81671317689)

- [ExactTokensForNative - ARB -> ETH](https://arbiscan.io/tx/0x00604b711fbd370ff62ee9980fc8c8e80b3b8bda0f1054a7ea730b46eaf951a3)

- [ExactTokensForNativeSupportingFee - RDNT -> ETH](https://arbiscan.io/tx/0xfd65e6c273b8218ea08eefc248dc59fba28f35be094f45477122ba129fa531ad)

- [ExactTokensForTokens - USDC -> USDC.e](https://arbiscan.io/tx/0xeaeac7e5de5d657b12c4aca0923aa247d51bd737ebb02190e0a9ca57961be3d2)

- [ExactTokensForTokensSupportingFee - USDC -> USDC.e](https://arbiscan.io/tx/0x87e2bafc87aff37dcc23e79cc3d77c21505faa238e44f7022fcc48e9869658f9)

- [NATIVEForExactTokens - ETH -> JOE](https://arbiscan.io/tx/0x999844dffb475ad0de10bb8f38744928d0744792cc92d200cfeb3706cd296928)

- [TokensForExactNATIVE - USDT -> ETH](https://arbiscan.io/tx/0xb4d7dce88dc9a9cda6a7279e39ce21eb44e8affb91362068a56e48c859390494)

- [TokensForExactTokens - USDC.e -> ARB](https://arbiscan.io/tx/0x28945de53fe43470443841123b601ba2182717a14b9dba1c13361dc34dbdbe8c)