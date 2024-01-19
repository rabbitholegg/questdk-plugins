import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  swap,
  options,
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
  options,
}
