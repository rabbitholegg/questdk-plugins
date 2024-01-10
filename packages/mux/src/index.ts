// This file is standard for more projects.
// The main degree of nuance is in the 

import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  options,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Mux.js'

// Replace *project* with the name of the project
export const Mux: IActionPlugin = {
  pluginId: 'mux',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  options,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
