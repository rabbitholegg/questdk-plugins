# QuestDK Plugins

This is the official registry of actions supported on Rabbithole.gg & Terminal.

## Getting started
1. Clone the repo
1. `pnpm install`
1. navigate to a package or create a new one

## Testing
To run all tests:

``pnpm test``

To run individual package test:

`pnpm test --filter=@rabbitholegg/questdk-plugin-connext`

Replace the filter param with the package you're trying to target.

### Package Linking
Often times when testing it's necessary to link into the [questDK repo](https://github.com/rabbitholegg/questdk).
We handle this through [package linking](https://pnpm.io/cli/link).

We recommend using direct linking, not global linking. If the local questDK changes don't seem to be recognized try deleting the file `node_modules\.pnpm\@rabbitholegg+questdk` [may have some version specific information - delete all of them].

Also remember the package must be built for changes to take effect in this repo. It should not be necessary to re-link after builds.

At times it may be necessary to [restart the typescript server](https://tinytip.co/tips/vscode-restart-ts/) when working with a linked package in VSCode.

In order to link the `questdk` run this from root of this package:
```
pnpm link path/to/questdk

```

## Plugins: an Overview

### What Are Quest Plugins?

Quest Plugins are how we translate transaction data into actions. It’s how our platform can take information from smart contracts deployed for any EVM native protocol and quickly parse it into a standardized format. Using this standardized action information we determine if a given user has transactions that meet the specific criteria for a given quest. 

For example, writing a plugin for Uniswap that translates a `swap` action allows users to create, and complete Quests on Uniswap. The plugin is used by our Indexing service to parse transaction data into specific information about that  allowing quests to target certain amounts, certain recipients, or even certain tokens.



At this time we only support plugins for  `swap`, `mint`, and `bridge` but we’re constantly adding new actions (`stake` forthcoming). If there’s a specific action you’d like supported please reach out. Some protocol integrations are more complex than others. 

### Why Quest Plugins

Plugins are necessary because there is no standard for how protocols should describe actions, so implementations vary across protocols. This makes it difficult to understand the type of action being performed just from transaction data. Plugins serve two purposes: integrate protocol actions using a standard schema, and provide an open source registry of curated protocol actions approved for use on Rabbithole and Terminal.

Without a plugin, it’s not possible to create quests for a specific action, since we don’t have an ability to parse the transaction data and understand the actions that are occurring in those transactions. These plugins allow us to store action information in a standardized way. Once the action has been standardized we can use any of these standard elements as criteria for quests on the platform. As we progress, this also unlocks the ability to perform advanced analytics on a given class of actions.

In the example given above, Uniswap uses an extremely specialized pattern for their Swap contract relying on a bytes array for all input data.

Without a plugin to translate this information into a standardized format that includes `chainId` `amountIn` or `recipient` it wouldn’t be possible for us to establish specific success criteria for quests deployed through our terminal. In this particularly obtuse example, all of the inputs are tucked into a bytes array, so without our plugin it’s impossible to know these common attributes that are shared between all swaps.

Once a protocol has a plugin merged into our plugin repo, that protocol will automatically be a valid option for quest creation on our platform through the quest creation terminal.


## Creating a plugin
### Plugin Creation Overview

Plugin implementation is relatively simple, although it requires a strong understanding of the project you're integrating with. Oftentimes we rely on a projects API to get fresh and consistent information on the project we're integrating with. Each plugin has a user defined `pluginID` that needs to be [added to the plugin registry](https://github.com/rabbitholegg/questdk-plugins/blob/main/packages/registry/src/index.ts#L15) and should be descriptive of the project you're integrating. We also require functions to return the [list of all supported chains](https://github.com/rabbitholegg/questdk-plugins/blob/main/packages/connext/src/Connext.ts#L125) [ `getSupportedChainIds` ], and [the list of supported tokens](https://github.com/rabbitholegg/questdk-plugins/blob/main/packages/connext/src/Connext.ts#L111)  [ `getSupportedTokenAddresses` ] for each supported chain. The supported chains and tokens are often where a project specific API can come in handy. The most complex aspect of plugin implementation is the `bridge` `mint` and `swap` functions which are used to return a `TransactionFilter`. For our backend, we store this filter in the quests `actionSpec` which we later read when applying filters in our indexer. The  generally provides a way of finding or filtering out transactions that fulfill the requirements of a quest’s `action` property.

### Steps to Plugin Creation

When developing a plugin the steps are as follows:

1. Create a new package in `packages` by duplicating the template folder, following the naming convention of `questdk-plugin-<project>`
1. Fill out the appropriate test transaction information in the `test-transaction.ts` file.  If you find an example of a transaction, [this tool](https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions?file=index.ts) can help generate the test-transaction data.  These transactions are meant to cover all of the edge cases for a given action. Oftentimes the contract, and function signature will be different for these different transaction types. In extreme situations there may be additional edge cases (handling of Matic on Polygon for example) but ensure that every situation where a different contract, or a different function signature is used is fully captured in the  file. These are the transactions you should be testing against, and you can allow these different edge cases to influence how the plugin is developed.

```
// BRIDGE TEST TRANSACTIONS
const BRIDGE_ETH_L1_TO_L2 = {}
const BRIDGE_ETH_L2_TO_L1 = {}
const BRIDGE_TOKEN_L1_TO_L2 = {}
const BRIDGE_TOKEN_L2_TO_L1 = {}
// SWAP TEST TRANSACTIONS
const SWAP_TOKEN_TO_TOKEN = {}
const SWAP_TOKEN_TO_ETH = {}
const SWAP_ETH_TO_TOKEN = {}
// MINT TEST TRANSACTIONS
const MINT = {}
```

3. [Implement `IActionPlugin`](https://github.com/rabbitholegg/questdk-plugins/blob/main/packages/connext/src/index.ts#L12) and export the interface as a top-level package export. In the case that not all actions are implemented, [just return `PluginActionNotImplementedError:`](https://github.com/rabbitholegg/questdk-plugins/blob/1251738ec9eecbf3288c92ec84fd919c6b70b008/packages/connext/src/index.ts#L17C16-L17C16)
    1. Implement previously mentioned helper functions  [ `getSupportedChainIds` , `getSupportedTokenAddresses` ]
    2. Implement any action functions you expect the plugin to support [ `swap`, `mint`, `bridge` ]
1.  Add your plugin by `id` in the plugin registry `questdk-plugin-registry`.
    1. `id` should be listed using kebab-case and any versioning should be appended (uniswap-v2, mirror-world, etc)
    

### How to Implement Action Functions

When implementing the action function, the parameters coming in are the criteria set through the terminal:

```jsx
const { 
	sourceChainId, 
	destinationChainId, 
	tokenAddress,  // For Native Tokens (ETH, Matic, etc) sometimes this is 0x0 or blank
	amount, 
	recipient
} = bridge
```

Given these we have to map these supplied expected values against the actual ABI of the transaction we’ll be parsing:

```jsx
return compressJson({
    chainId: sourceChainId, // The chainId of the source chain
    to: CHAIN_TO_CONTRACT[sourceChainId], // The contract address of the bridge
    input: {
      $abi: ACROSS_BRIDGE_ABI, // The ABI of the bridge contract
      recipient: recipient, // The recipient of the funds
      destinationChainId: destinationChainId, // The chainId of the destination chain
      amount: amount, // The amount of tokens to send
      originToken: tokenAddress, // The token address of the token to send
    }, // The input object is where we'll put the ABI and the parameters
  })
```

`chainId` and `to` both map directly to those params on the transaction object. Any param on the transaction object can be used in your filter (`from` is often useful). For the input object you need to supply an ABI that contains the function signature of the relevant function. This can be a modified ABI that holds the function signature of multiple contracts, the filter will correctly pull out the one with the right signature, just watch out for poor handling of overloaded functions. The keys of the JSON object (i.e `originToken` ) needs to key into the expected value based on the parameters passed in from the action (`tokenAddress`).

### Adding To Registry

In the registry `index.ts` import your new plugin and add it to the `plugins` object as follows:
```
  [Project.pluginId]: Project,

```
Replace 'Project' with the name of your project.

Also remember to add the new repo within the monorepo to the `package.json` of the registry.

### Private Repo

If you're ready to publish, remove the `private` tag from your `package.json` file.

## Contributing
If you'd like to build a plugin and get support for your protocol on RabbiteHole all you need to do is submit a PR with the finished plugin. Here are some useful tips to assist, and when in doubt please [join our discord](https://discord.com/invite/rabbitholegg) or reach out by email [<arthur@rabbithole.gg>] for assistance building a plugin.
### Changesets & Publishing
In order to publish you need to make sure that the pull request you're submitting has a changeset. If you don't want to publish this isn't needed. In order to generate a changeset run `pnpm changeset`, select a change type [major,minor,patch], and draft a small summary of the changeset. Select version based on [semantic versioning](https://semver.org/).

After this all you need to do is push and merge the pull request and the Github Action will handle the process of versioning, and publishing.
### Commit Standards
We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) in order to make changelogs and versioning a breeze.

