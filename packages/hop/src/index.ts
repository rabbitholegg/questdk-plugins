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
} from './Hop.js'

// Replace *project* with the name of the project
export const Hop: IActionPlugin = {
  pluginId: 'hop',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge,
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
