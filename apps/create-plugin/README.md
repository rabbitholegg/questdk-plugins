# BoostDK Plugin Creator

## Using it

from the root of the project run:

```bash
pnpm build
cd apps/create-plugin
pnpm run create
```

then you can enter your plugins name, the supported chains, and the actions.

The script will create a template for you in the packages directory structure.


## Templates

the following actions will be performed, assuming the tool is used to collect [project] name, [chain] ids, and [actions]:

1.  Create a new directory in the packages directory with the name `@rabbitholegg/questdk-plugin-<project>`
2.  Create index.ts, [project].ts, [project].test.ts, and test-transaction.ts files in the new directory as well as readme, package.json, etc with the [project] name
3.  index.ts imports and interface definition is written based on selected [action]
4.  [project].ts imports, a function declaration for each action, and `getSupportedChainIds` are populated


## Development

the following command will both compile and run the plugin creator

first `cd apps/create-plugin`

`pnpm run dev`


### Summary

The `src/index.ts` file is the entry point for the plugin creator. This file renders and parses the arguments from the CLI.

The `src/builder.ts` file is the main logic for creating the plugin. It uses mustache templates and file operations to copy the `/template` directory to the `../../packages` directory and populate it appropriately.

so:

 * if you want to change the output plugin, modify the source in the /template directory
 * if you want to change the CLI, modify the source of src/index.ts
 * if you want to change the logic of the plugin creator, modify the source of src/builder.ts
