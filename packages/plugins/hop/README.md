# HOP PROTOCOL

## Overview
Hop is unique in that it's one of the only non-native bridges that uses the hub&spoke model. Because of this it basically has 3 types of transactions:
1. L2 to L1
1. L1 to L2
1. L2 to L2


### L1 to L2

In this case we use the `L1_ERC20_Bridge__factory`
and send using `sendToL2`

https://github.com/hop-protocol/hop/blob/fd451d32e7a7740fd3a1edd076fe0ec625dcf67e/packages/sdk/src/HopBridge.ts#L2079-L2081

The address for L1 to L2 transactions is the wrapper contract
In order to get that address we need to use
`getL1BridgeWrapperAddress

### L2 to L1
In this case we either send to the `AMM`` using `swapAndSend`
or we send to the `l2Bridge` using `send`

https://github.com/hop-protocol/hop/blob/fd451d32e7a7740fd3a1edd076fe0ec625dcf67e/packages/sdk/src/HopBridge.ts#L2254-L2257

ETH can go through the Bonding contract before being withdrawn

### L2 to L2
For our purposes, L2 to L2 works exactly the same as L2 to L1, there are differences
after the transaction is issued to the bridge but not at the the source.


## Example Transactions


### L1 to L2 ETH
Address: 0xb8901acB165ed027E32754E0FFe830802919727f 
https://etherscan.io/advanced-filter?fadd=0xb8901acb165ed027e32754e0ffe830802919727f&tadd=0xb8901acb165ed027e32754e0ffe830802919727f&txntype=0&mtd=0xdeace8f5%7eSend+To+L2

https://etherscan.io/address/0xb8901acB165ed027E32754E0FFe830802919727f

### L1 to L2 ERC20 (USDC)
Address: 0x3666f603Cc164936C1b87e207F36BEBa4AC5f18a 
https://etherscan.io/advanced-filter?fadd=0x3666f603cc164936c1b87e207f36beba4ac5f18a&tadd=0x3666f603cc164936c1b87e207f36beba4ac5f18a&txntype=0&mtd=0xdeace8f5%7eSend+To+L2


https://etherscan.io/address/0x914f986a44acb623a277d6bd17368171fcbe4273

### L2 to L1 ETH
On L2 tokens and Ether target the AMM wrapper, which then calls the bridge.

https://polygonscan.com/address/0xc315239cfb05f1e130e7e28e603cea4c014c57f0

### L2 to L1 ERC20

HOP has it's own strange flow
https://polygonscan.com/tx/0x07b1c5480d3f8bbdad7fe20c7f05f41f3415c3d9d72413743beb651ca822ead9

All other tokens work similar to L2 ETH
https://polygonscan.com/tx/0x14cab36f5b2187c9070d130dafeaccf585d7a4d134ee40169677c7e573ae2012


### L2 to L2 ETH
Same flow as L2 to L1
### L2 to L2 ERC20
Same flow as L2 to L1
