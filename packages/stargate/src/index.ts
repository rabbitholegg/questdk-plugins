// This file is standard for more projects.
// The main degree of nuance is in the

import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Stargate.js'

// Replace *project* with the name of the project
export const Stargate: IActionPlugin = {
  pluginId: 'stargate',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge,
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
