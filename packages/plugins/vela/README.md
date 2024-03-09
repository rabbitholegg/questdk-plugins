# Vela Options (Derivitives) Plugin

This plugin is designed to filter valid trades using Vela Exchange. Vela Exchange is a decentralized trading platform with its foundations in the Arbitrum ecosystem. 

## Overview

This plugin uses the OptionsActionParams

Other Notes

- Trades that are either short or long will pass.
- There is a one-click trading mode that uses an abstracted wallet. We do not have support for this at present.

[Vela Docs](https://docs.vela.exchange/vela-knowledge-base/developers/asset-pairs-and-velaid)

## Sample Transaction
- https://arbiscan.io/tx/0xf175c933840e63013fbf77c7bab63d44f692003f5e07596e2dab8fedda55f8d3


## Other Notes
- Asset Pairs and TokenIds: https://docs.vela.exchange/vela-knowledge-base/developers/asset-pairs-and-velaid
- The token and amount parameters are packed into uint256 parameters. The $bitmask operator is used to decode these values according to the `newPositionPacked` function below.

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