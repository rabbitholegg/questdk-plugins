import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  options,
  swap,
} from './OkuTrade.js'

export const OkuTrade: IActionPlugin = {
  pluginId: 'okutrade',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  options,
  swap,
  bridge: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
