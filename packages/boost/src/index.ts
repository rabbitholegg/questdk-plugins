import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  complete,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
} from './Boost'

export const Boost: IActionPlugin = {
  pluginId: 'boost',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  complete,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint,
}
