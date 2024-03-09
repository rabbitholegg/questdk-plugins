Currently we only support swaps on Arbitrum and do not support derivatives.

## Limitations with V2 swap filtering

We've identified some limitations in the current version of the GMX swap filter:

1. **Protocol Fee with Raw Ether Transactions:**
   - There is a small protocol fee of approximately 0.001 ETH included in the payable amount for transactions using raw Ether as the input token.
   - This additional fee may lead to discrepancies when comparing amounts, especially in cases where exact equality (`==`) or less-than-or-equal-to (`<=`) operators are used.

2. **Behavior with `amountIn` and `tokenIn` Parameters:**
   - When `amountIn` is specified and `tokenIn` is set to `any`, transactions involving any token will pass the filter, but ETH will not. This is due to the way the amount is compared when using ETH vs tokens. When `amountIn` is set to `any`, and `tokenIn` is set to `any`, both ETH and tokens will pass the filter.

3. **Token Filtering with `tokenOut` Parameter:**
   - If `tokenIn` is set to `any` and `tokenOut` is specified as USDC, transactions involving any token (excluding ETH) as input will pass the filter. This occurs because the MarketToken for USDC check depends on the `tokenIn` being explicitly provided.


## V2 Notes

MultiCall calls several functions - the main one we're concerned with is [createOrder](https://github.com/gmx-io/gmx-synthetics/blob/main/contracts/router/ExchangeRouter.sol#L170).

This function takes this struct as a param:
https://github.com/gmx-io/gmx-synthetics/blob/77a2ff39f1414a105e8589d622bdb09ac3dd97d8/contracts/order/BaseOrderUtils.sol#L36

```
    struct CreateOrderParams {
        CreateOrderParamsAddresses addresses;
        CreateOrderParamsNumbers numbers;
        Order.OrderType orderType;
        Order.DecreasePositionSwapType decreasePositionSwapType;
        bool isLong;
        bool shouldUnwrapNativeToken;
        bytes32 referralCode;
    }

```
We want to confirm [swapPath](https://github.com/gmx-io/gmx-synthetics/blob/77a2ff39f1414a105e8589d622bdb09ac3dd97d8/contracts/order/BaseOrderUtils.sol#L57C19-L57C27) inside of the `CreateOrderParamsAddresses` matches our expected tokens and `received` in that same struct matches `recipient`.

We want to make sure that `minOutputAmount` and either `triggerPrice` or `acceptablePrice` match amountOut and amountIn respectively

We want to confirm [orderType](https://github.com/gmx-io/gmx-synthetics/blob/77a2ff39f1414a105e8589d622bdb09ac3dd97d8/contracts/order/Order.sol) is a `MarketSwap`
```
    enum OrderType {
        // @dev MarketSwap: swap token A to token B at the current market price
        // the order will be cancelled if the minOutputAmount cannot be fulfilled
        MarketSwap,
        // @dev LimitSwap: swap token A to token B if the minOutputAmount can be fulfilled
        LimitSwap,
        // @dev MarketIncrease: increase position at the current market price
        // the order will be cancelled if the position cannot be increased at the acceptablePrice
        MarketIncrease,
        // @dev LimitIncrease: increase position if the triggerPrice is reached and the acceptablePrice can be fulfilled
        LimitIncrease,
        // @dev MarketDecrease: decrease position at the current market price
        // the order will be cancelled if the position cannot be decreased at the acceptablePrice
        MarketDecrease,
        // @dev LimitDecrease: decrease position if the triggerPrice is reached and the acceptablePrice can be fulfilled
        LimitDecrease,
        // @dev StopLossDecrease: decrease position if the triggerPrice is reached and the acceptablePrice can be fulfilled
        StopLossDecrease,
        // @dev Liquidation: allows liquidation of positions if the criteria for liquidation are met
        Liquidation
    }
```


Options Transaction Info
