# QuestDK Plugins

This is the official registry of actions supported on Rabbithole.gg & Terminal.


## Overview
The premise for plugins stems from the fact that there is no standard for how protocols should describe actions, so implementations vary across protocols. This makes it difficult to reason about the type of action being performed just by looking at transaction data. Plugins serve two purposes: integrate protocol actions using a standard schema, and to provide an open source registry of curated protocol actions approved for use on Rabbithole and Terminal.

## Getting started
1. Clone the repo
1. `pnpm install`
1. navigate to a package or create a new one

## Creating a plugin
1. Create a new package in `packages`, following the naming convention of `questdk-plugin-<project>`
1. Implement `IActionPlugin` and export the interface as a top-level package export
1. Add your plugin by `id` in the plugin registry `questdk-plugin-registry`.
 
