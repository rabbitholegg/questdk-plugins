# QuestDK Plugins

This is the official registry of actions supported on Rabbithole.gg & Terminal.


## Overview
The premise for plugins stems from the fact that there is no standard for how protocols should describe actions, so implementations vary across protocols. This makes it difficult to reason about the type of action being performed just by looking at transaction data. Plugins serve two purposes: integrate protocol actions using a standard schema, and to provide an open source registry of curated protocol actions approved for use on Rabbithole and Terminal.

## Getting started
1. Clone the repo
1. `pnpm install`
1. navigate to a package or create a new one

## Creating a plugin
1. Create a new package in `packages` by duplicating the template folder, following the naming convention of `questdk-plugin-<project>`
1. Implement `IActionPlugin` and export the interface as a top-level package export
1. Add your plugin by `id` in the plugin registry `questdk-plugin-registry`.
 
 Plugin implementation is relatively simple, although it requires a strong understanding of the project you're integrating with. Oftentimes we rely on a projects API to get fresh and consistent information on the project we're integrating with. Each plugin has a user defined `pluginID` that needs to be added to the plugin registry and should be descriptive of the project you're integrating. We also require functions to return the list of all supported chains, and the list of supported tokens for each supported chain. The supported chains and tokens are often where a project specific API can come in handy. The most complex aspect of plugin implementation is the `bridge` `mint` and `swap` functions which are used to return a `TransactionFilter`. For our backend, we store this filter in the quests `actionSpec` which we later read when applying filters in our indexer. The `TransactionFilter` generally provides a way of finding or filtering out transactions that fulfil the requirements of a quests `action` property.


## Contributing
We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) in order to make changelogs and versioning a breeze.