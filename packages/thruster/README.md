# Thruster Finance Plugin

## Overview
Thruster Finance is a yield-first DEX on Blast.

Documentation: https://docs.thruster.finance/

### Swap Plugin

Thruster Finance is a fork of Uniswap, utilizing both V2 and V3 swap methods.

Swap using V2 routes will use the [ThrusterRouter](https://blastscan.io/address/0x98994a9a7a2570367554589189dc9772241650f6#code) contract. The relevant swap functions on this contract are:

- `swapETHForExactTokens`
- `swapExactETHForTokens`
- `swapExactTokensForETH`
- `swapExactTokensForTokens`
- `swapTokensForExactETH`
- `swapTokensForExactTokens`

*(The `SupportingFeeOnTransferTokens` methods can be skipped as they have the same inputs as the non-fee-on-transfer methods)*

Swaps using V3 routes will use a multicall on the [SwapRouter](https://blastscan.io/address/0x337827814155ecbf24d20231fca4444f530c0555#code) contract. The relevant swap functions are:

- `exactInput`
- `exactInputSingle`
- `exactOutput`
- `exactOutputSingle`

##### Limitations
- Like all Uniswap forks/clones, there are some precision issues on certain swap inputs/outputs. AmountOut is not very reliable for some methods (Exact_X_For_X), as it uses amountOutMin, which can be much lower than expected. In extreme cases, it can even be zero if slippage is set high enough. This will cause issues when using the (==) operator or the (>=) operator.

##### Sample Transactions
- [V3 swap](https://blastscan.io/tx/0x64a68c2018464867a1dc67671b4b716f4d626d4569e53a2a352be09f08641dfc)
- [V2 swap](https://blastscan.io/tx/0x577f440b2fb3041596250c68e5e0d5d4fbabf97e636d61860b7e133bdb7bc376)