import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from "@rabbitholegg/questdk";

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from "./Zora.js";

export const Zora: IActionPlugin = {
  pluginId: "zora",
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint,
};
