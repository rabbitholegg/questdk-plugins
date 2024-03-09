Optimism bridging is pretty straightforward. There's only 2 networks we need to be concerned with, Mainnet and Optimism. Both ETH and Token transactions go through the same contract on L2, and use the same function. [Sending ETH from L1 to L2](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L1/L1StandardBridge.sol#L110-L143) is slightly different.



[Optimism Token List](https://static.optimism.io/optimism.tokenlist.json)