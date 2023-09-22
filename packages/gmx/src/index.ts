// This file is standard for more projects.
// The main degree of nuance is in the

import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  swap,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './GMX.js'

// Replace *project* with the name of the project
export const GMX: IActionPlugin = {
  pluginId: 'gmx',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap,
  mint: async () => new PluginActionNotImplementedError(),
}
