
Deposit Ether Tx

https://etherscan.io/tx/0xab46e7cc0a4f53680f97dc2b1c0732c6e526f3ab06cc721c21dcc103936fb3cf

Deposit Ether Contract
https://etherscan.io/address/0xA0c68C638235ee32657e8f720a23ceC1bFc77C77


Deposit Token Tx
https://etherscan.io/tx/0x7278c074d2b59b7b03029330b844ed434b549bbf35709abc149836ebd45c31ea
https://etherscan.io/tx/0x7bdc5aa1a6ea9e868e6a4f594560b239f3e9c7ff9fe575d5acf2c0fb29b4506e

Deposit Token Contract
https://etherscan.io/txs?a=0xa0c68c638235ee32657e8f720a23cec1bfc77c77


Withdrawing tokens on Polygon is measurably more complex due to their "predicate" token system and the bytes data chunk provided to the contract on exit

here's a transaction for exiting/withdrawing from Polygon network using predicates:
https://etherscan.io/tx/0x9106905d05579d1604ed02002df901ca9632f7433181febe6e887c5269c21d2b

This is a transaction calling withdraw directly on the token contract on the Polygon network to initiate a token withdrawal


If withdrawing ETH you use the MaticWETH contract directly:
https://polygonscan.com/address/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619#code


Withdrawing MATIC(ERC20):
https://polygonscan.com/tx/0xe5dd4b9b32c7265c1701002cb50b72aeba4abe9ee904c9f3faca1bd3c121012b

All withdraws can be handled as "ChildERC20" since the WETH token inherits from this