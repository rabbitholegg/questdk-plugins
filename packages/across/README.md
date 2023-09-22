
# Across
Across uses really simple architecture. They don't use payable functions, every token and ETH all go through the same contract, and use the same function call.
This is about as straight forward a plugin as exists.
## ETH/BASE TOKEN
No payables, everything uses the same functions.

### Deposit ETH
https://etherscan.io/tx/0xa90420546af9facb433464c7d6de24dee62b63ec5eff9e542ccc54a7c1be0e1c

### Withdraw ETH

https://arbiscan.io/tx/0xae9c37671cc94cd9e4487a23b62c93c606601f7a1d5b751d7f2d8a71dc4f65ef

## ERC20

All ERC20 use the same function call and exit through the same address.

### Deposit ERC20
https://etherscan.io/tx/0x1d27d0bd0b8bc1894f8e3b30fdb527f2a3d8eee2efaf6d43d23af05f4c7c976b
### Withdraw ERC20 
https://arbiscan.io/tx/0x0eed06fe27fcef1666d62ce9a0740eaf498ba94664588f3089b00602c930f23b

You can use the following example code to pull down test transactions in the correct format easily:
https://viem.sh/docs/actions/public/getTransaction.html#example