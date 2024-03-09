import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  delegate,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Tally.js'

export const Tally: IActionPlugin = {
  pluginId: 'tally',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
  delegate,
}
