// This file is standard for more projects.
// The main degree of nuance is in the 

import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  delegate,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Tally.js'

// Replace *project* with the name of the project
export const Tally: IActionPlugin = {
  pluginId: 'tally',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge:  async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
  delegate,
}
