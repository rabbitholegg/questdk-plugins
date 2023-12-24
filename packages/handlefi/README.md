Limitations

- amountOut may not be accurate due to some methods using `amountOutMin` which takes into account the amount of slippage set.
- amountOut will not be considered in the swap is routed through the HPSM2 contract. 
- trades routed through curve V2 factory may have some false positives. Since there is not a really good way to tell what pool it is without having the contract address passed in as an argument. A false positive can occur if the tokenOut is selected as USDT and USDC.e is traded, and vice-versa.

# HandleFi Plugin

## Overview
HandleFi is a decentralised multi currency stablecoin protocol based on Arbitrum. They offer several products including perpetual swaps, convert, staking, and fxTokens.

### Swap Plugin

The swap plugin tragets handlefis [convert feature](https://app.handle.fi/convert) which uses a mix of native contracts and external aggregators such as paraswap.

##### Limitations
- amountOut may not be accurate due to some methods using `amountOutMin` which takes into account the amount of slippage set.
- amountOut will not be considered if the swap is routed through the HPSM2 contract. 
- trades routed through curve V2 factory may have some false positives. Since there is not a really good way to tell what pool it is without having the contract address passed in as an argument. A false positive can occur if the tokenOut is selected as USDT and USDC.e is traded, and vice-versa.

##### Sample Transactions
- [Paraswap](https://dashboard.tenderly.co/tx/arbitrum/0xdc4f726560293b41a0ee72048e2d94970a45a046d88447444dab8bc54cb25a94)
- [V2Router](https://arbiscan.io/tx/0xb4e506b5373ce01c71518e9e0c3fefb87952ad3ab28362b69c083cbe63d56094)
- [hPSM2](https://arbiscan.io/tx/0x8b880dd0805ed4767a9a770149bbe9402d44ae334374f2afef8bb5fd257585a8)
- [routerHpsmHlpCurveV2](https://arbiscan.io/tx/0x819ec6afd60b26412e830feb80b5abe1dab1229fc6ef6a42224e59fb85385d51)
- [routerEthHlpBalancer](https://arbiscan.io/tx/0x58afb2cc0908f7049700bc10bbd144dc12df7baa2ac616abd0f4eefb22012b73)
- [curveFactory (fxUSD_FRAX)](https://arbiscan.io/tx/0x254e3dcea9a376f67340b9141c1c013aea5f1820de629847aa549c29cf4b599c)
- [curveFactory (fxUSD_3pool)](https://arbiscan.io/tx/0xa7f8d500da701b028d037740a5f74a73eaaff7d344526484812e96ef354cae26)