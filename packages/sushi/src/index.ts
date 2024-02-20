import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from "@rabbitholegg/questdk";

import {
  swap,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from "./Sushi.js";

export const Sushi: IActionPlugin = {
  pluginId: "sushi",
  getSupportedTokenAddresses,
  getSupportedChainIds,
  swap,
  bridge: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
};
