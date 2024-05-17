# Hai Plugin

## Overview
Hai is a decentralized platform that operates similarly to DAI, utilizing a Collateralized Debt Position (CDP) system. Users can deposit various types of collateral to mint the stablecoin called HAI.

- Documentation: https://docs.letsgethai.com/detailed/intro/hai.html

## Implementation 
The HAI plugin utilizes the Stake Action Type and looks for deposits of colleteral made using the `openLockTokenCollateralAndGenerateDebt` function. There is a 150 HAI minimum that needs to be minted, but the amount of collateral deposited will exceed this.

There is 4 tokens currently compatible with HAI as collateral. WETH, STETH, SNX, and OP.

This plugin only covers the creation of new vaults. Minting HAI from an existing vault will not be considered, as there is no way to get the context of the collateral token from the tx details.

Since each vault using a different address, we are not able to match the `to` parameter with the contractAddress as we normally do. Instead the implementation contract address is found of the `_target` parameter in the tx data. 

## Sample Transactions
- [openLockTokenCollateralAndGenerateDebt](https://optimistic.etherscan.io/tx/0x2c07c670182229bc1201087c9883ed67c7d46dcbd0f65c2b4d701949705a4581)
