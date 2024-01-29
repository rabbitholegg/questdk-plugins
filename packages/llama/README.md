# Llama 

LLama is an on-chain governance platform.

https://llama.xyz/


The protocol uses `policies` to determine voting rights, which are non-transferrable NFTs.  The protocol is designed to be modular, allowing for the creation of new policies and voting mechanisms.  Voting mechanisms are implemented as `strategies`.

When a user has permission to vote, they call the appropriate function on the `llamaCore` contract.  

## Voting

This plugin supports two functions currently:

1.  Cast Approval
2.  Cast Disapproval


## Discovering deployments and transactions

1.  the deployed llama contracts are defined [on their website](https://docs.llama.xyz/resources/contracts).
2.  Visit a llama factory contract on your chain of choice, [like arbitrum](https://arbiscan.io/address/0xFf5d4E226D9A3496EECE31083a8F493edd79AbEB)
3.  Look for a `Deploy` transaction and check the logs for a `LlamaInstanceCreated` event
4.  The Data contains a `llamaCore` address, which is the address of the newly deployed Instance
5.  Visiting that `llamaCore` will show the vote actions. 
