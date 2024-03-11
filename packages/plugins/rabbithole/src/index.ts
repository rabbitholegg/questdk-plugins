import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  quest,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Rabbithole.js'

export const Rabbithole: IActionPlugin = {
  pluginId: 'rabbithole',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
  quest,
}
