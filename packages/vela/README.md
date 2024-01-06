# Vela Swap Plugin

This plugin is designed to filter valid trades using Vela Exchange. Vela Exchange is a decentralized trading platform with its foundations in the Arbitrum ecosystem. 

## Overview

~~Because Vela is not a traditional dex, we needed to make a few compromises to make it fit correctly into our swap action.
All trading pairs on Vela exchange are USDC based, so there is no way to swap between 2 supported tokens. Because of this, we only target the tokenIn parameter, and ignore the tokenOut.
Same thing for amountIn/Out. As long as the tokenIn matches one of the tokens in the pair (eg. ARB would match ARB/USDC), the transaction will pass. The amount is determined by the amount of collateral needed to make trade, with a minimum of $20 USDC required to make a trade.~~

Other Notes

- Trades that are either short or long will pass.
- There is a one-click trading mode that uses an abstracted wallet. It is not clear at the moment if we can support this

Not tested
- Limit Orders
- TP/SL Orders

[Vela Docs](https://docs.vela.exchange/vela-knowledge-base/developers/asset-pairs-and-velaid)

## Sample Transaction
- https://arbiscan.io/tx/0xf175c933840e63013fbf77c7bab63d44f692003f5e07596e2dab8fedda55f8d3


## Other Notes
- To find the token and amount, the data first needs to be repacked to be able to compare to the packed input params

- https://docs.vela.exchange/vela-knowledge-base/developers/asset-pairs-and-velaid
```    
function newPositionOrderPacked(uint256 a, uint256 b, uint256 c) external payable {
  uint256 tokenId = a / 2 ** 240; //16 bits for tokenId
  uint256 tmp = (a % 2 ** 240) / 2 ** 232;
  bool isLong = tmp / 2 ** 7 == 1; // 1 bit for isLong
  OrderType orderType = OrderType(tmp % 2 ** 7); // 7 bits for orderType
  address refer = address(uint160(a)); //last 160 bit for refer
  uint256[] memory params = new uint256[](4);
  params[0] = b / 2 ** 128; //price
  params[1] = b % 2 ** 128; //price
  params[2] = c / 2 ** 128; //collateral
  params[3] = c % 2 ** 128; //size
  newPositionOrder(tokenId, isLong, orderType, params, refer);
}```