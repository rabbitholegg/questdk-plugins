import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  options,
  swap,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './OkuTrade'

export const OkuTrade: IActionPlugin = {
  pluginId: 'okutrade',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  options,
  swap,
  bridge: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
