
## ETH/BASE TOKEN
Other than the token address retrieval this is a pretty trivial to implement plugin.
Unfortunatly in order to get the token address we need to do some direct chain reads but nothing too heavy.


### Deposit ETH
Deposit to Arbitrum Layer Zero
https://etherscan.io/tx/0xe3a54ddf9a09ee9df6abe87af38cc418c516fb198fc635972615418f5254812a

### Withdraw ETH
Withdraw ETH to Optimism
https://arbiscan.io/tx/0xc6fa0deba78d6228d3cb343a908390162955dcb3d6d5a8e952ef24c54f7c453f

## ERC20

### Deposit ERC20
https://etherscan.io/tx/0x28901f729bd89400b5c046eb73abf0656ab82cb02463e47562d7ce24737d263f
### Withdraw ERC20 
USDT
https://arbiscan.io/tx/0xb983d41651ccad84a70600564376975a3a3385dae53de35259486f20dd2d8d4d


You can use the following example code to pull down test transactions in the correct format easily:
https://viem.sh/docs/actions/public/getTransaction.html#example