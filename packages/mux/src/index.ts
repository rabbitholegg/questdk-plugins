import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  options,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Mux.js'

export const Mux: IActionPlugin = {
  pluginId: 'mux',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  options,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
