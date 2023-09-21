Currently we only support swaps on Arbitrum and do not support derivatives.


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
