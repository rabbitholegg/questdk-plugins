import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from "@rabbitholegg/questdk";

import {
  swap,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from "./oneinch.js";

// Replace *project* with the name of the project
export const oneinch: IActionPlugin = {
  pluginId: "oneinch",
  getSupportedTokenAddresses,
  getSupportedChainIds,
  swap,
  bridge: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
};
