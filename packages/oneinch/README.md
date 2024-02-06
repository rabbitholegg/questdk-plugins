## oneinch Plugin for Boost

### New Plugin TODO list
1.  Find an example of the transactions on a block explorer you want to reward with boost
2.  go to [this transaction fetcher](https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions?file=index.ts), and fetch the transaction json for your test transactions
3.  For each transaction, export a new const in test-transactions.ts.
4.  Find the ABI of the function your transaction is calling, and add export it as a const in the abi.ts file
    1.  this can be multiple ABIs, if the transaction is calling multiple functions
5.  in {projectName}.ts, fill out each Action function by mapping the ActionParams to the ABI of the function
6.  in {projectName}.test.ts, write tests to validate your plugin matches the transactions you want to reward



### Actions and Descriptions



### Example Transactions