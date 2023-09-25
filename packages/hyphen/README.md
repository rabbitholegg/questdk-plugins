When First creating a template for a project we generally want to find at most 4 transactions. Some bridges don't have a sense of a source and target chain, but for bridges that do we need more information. Some bridges might use the same ABI and address for all 4 of these transaction types!

## ETH/BASE TOKEN
When trying to bridge ETH or the base network token (Matic for Polygon for instance) sometimes the pattern is different.
We want to find a transaction from the base chain and the target chain that shows transferring ETH from and to those chains.
In general we refer to moving value from a base chain (mainnet) to a higher order chain a `deposit` and returning back to a base chain a `withdrawal`.
In the case where it's a general purpose bridge this process is simply a `transfer`. In that case you only need to find 1 transaction, not 2.

### Deposit ETH
This handles the case where we have ETH that we want to bridge from Mainnet to L2. A lot of times this is handled differently. Often times this triggers a `payable` function and requires the `bridge` function to use the `value` param.

### Withdraw ETH
This handles the case where we have ETH that we want to bridge from an L2 to Mainnet. Depending on this chain this can also be a payable, but often times will just be a separate contract address.

## ERC20
ERC20 transactions are by far the most common for bridges.
In some cases this might be the only transaction type you need to find, although most of the time ETH is handled different. If the protocol _always_ uses wrapped ETH, this may be the only transaction type.
### Deposit ERC20
Generally this is the same as moving from L2 to L1, but especially for native bridging sometimes there are precompiles for the withdraw process.
### Withdraw ERC20 



You can use the following example code to pull down test transactions in the correct format easily:
https://viem.sh/docs/actions/public/getTransaction.html#example