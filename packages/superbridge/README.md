## SuperBridge

SuperBridge is a frontend for native superchain bridges. 

### Implementation Details

SuperBridge is just a frontend to access various superchain bridges. Superchain bridges are all based off the native OP bridge and use the `l1StandardBridge` and `l2StandardBridge` contracts from Optimism. In order to add new superchains to this plugin, simply map the `l1StandardBridge` and `l2StandardBridge` proxy contract addresses to the chainId in the constants.ts file. (`mainToL2BridgeContract`, `l2ToMainBridgeContract`)

### Sample Transactions

[bridgeERC20](https://etherscan.io/tx/0x6d0268ab79686bc0e626c86f51e1242e592a88bec7d94415cfbcac2d0835cb90)

[bridgeERC20To](https://etherscan.io/tx/0x8858f063162ea03a0346dd3436be15fcab53b92fc4b807f813498655a812818a)

[bridgeETH](https://etherscan.io/tx/0x41607489b6512f77547c5f8f80b6a51cd9be77690cb4210bd5294dfe74163c4d)

[bridgeETHTo](https://etherscan.io/tx/0x84f6e50fe4cd8e0dc90eeeaf06cc81147fa4d97015c593e79bb9b3cf85236ea2)

[DepositERC20](https://etherscan.io/tx/0x0679ef18d0f614cf0bdb8dc3d352f6066de0854f77dfa8d4457d0eea6746623e)

[DepositERCto](https://etherscan.io/tx/0xcd79937dae9c4ecea48e2837eb60f2f486fd48708a2aa7947d66c98c5b6346d2)

[DepositETH](https://etherscan.io/tx/0xfcf6da7eb2617473f5a81aaa2b6f57b3e93f7ae2bbb0ca48a351e96a1be27ca8)

[DepositETHTo](https://etherscan.io/tx/0x3b7135556ccc489c0d595fa49a0703f96ecedbaf8fb19663aff72fe90aef2f18)

[Withdraw (ETH)](https://basescan.org/tx/0x03f3baff669c93eb268fe5755c5a054072a480ff9dc2d43fcb7196f18a411149)

[Withdraw (ERC)](https://basescan.org/tx/0x31cfd1f087e7a3fe7a3ddb242d8a6b1773565c186bdd84f3fd7b02ae78c0f911)

[WithdrawTo (ERC)](https://basescan.org/tx/0x5909042c38e67c67df9598fe44f8306f11e7868d830e6e3c89c7ac57de572065)

[bridgeETHTo](https://basescan.org/tx/0x5bd08bd00b173cd368daee486209f1efc405a4a930950284142d174b1c5f3f48)

[bridgeERC20To](https://basescan.org/tx/0x0310ec5fede91f898df30f8436b1a860bf9d35016fb3f9fd46e725765e8fba8a)

[bridgeERC20](https://basescan.org/tx/0x7d21742fdc2ee4bc6dfbd1e3cc09265031c3a78744b87f3e2a9c23a4619f4057)
